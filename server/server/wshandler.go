package server

import(
    "code.google.com/p/go.net/websocket"
    "../imap"
    "encoding/json"
    "time"
)

type Connection struct{
    Ws *websocket.Conn
    Imaps []*imap.Imap
    Key string
}

type Pool struct{
    Connections map[string]*Connection
    In chan *Connection
    Out chan string
}

var pool *Pool = &Pool{
    Connections: make(map[string]*Connection),
    In: make(chan *Connection),
    Out: make(chan string),
}

func StartPool(){
    var c *Connection
    var out string
    for{
        select{
        case c = <- pool.In:
            pool.Connections[c.Key] = c
            go c.Query()
        case out = <- pool.Out:
            delete(pool.Connections, out)
        }
    }
}

func (c *Connection)Query(){
    for{
        time.Sleep(3 * time.Second)
        var ok bool
        if _, ok = pool.Connections[c.Key]; !ok{
            break
        }
        var i *imap.Imap
        for _, i = range c.Imaps{
            go func(i *imap.Imap){
                var unseen int
                var err error
                var r string
                var response Response = Response{
                    Email: i.Email,
                }
                unseen, err = i.Unseen()
                if err != nil{
                    response.Ok = false
                    response.Message = err.Error()
                    r, err = response.Json()
                    if err != nil{
                        err = websocket.Message.Send(c.Ws, "Error")
                        if err != nil{
                            pool.Out <- c.Key
                            return
                        }
                    }
                    err = websocket.Message.Send(c.Ws, r)
                    if err != nil{
                        pool.Out <- c.Key
                        return
                    }
                    return
                }
                response.Ok = true
                response.Unseen = unseen
                r, err = response.Json()
                if err != nil{
                    err = websocket.Message.Send(c.Ws, "Error")
                    if err != nil{
                        pool.Out <- c.Key
                        return
                    }
                }
                err = websocket.Message.Send(c.Ws, r)
                if err != nil{
                    pool.Out <- c.Key
                    return
                }
            }(i)
        }
    }
}

func (c *Connection)Receive(){
    var err error
    var message []byte
    for{
        err = websocket.Message.Receive(c.Ws, &message)
        if err != nil{
            break
        }
        var r string
        c.Imaps = make([]*imap.Imap, 0)
        err = json.Unmarshal(message, &c.Imaps)
        if err != nil{
            var response Response = Response{
                Ok: false,
                Message: "Received error json data",
            }
            r, err = response.Json()
            if err != nil{
                err = websocket.Message.Send(c.Ws, "Error")
                if err != nil{
                    pool.Out <- c.Key
                    break
                }
            }
            err = websocket.Message.Send(c.Ws, r)
            if err != nil{
                pool.Out <- c.Key
                break
            }
            continue
        }

        var response Response = Response{
            Ok: true,
        }
        r, err = response.Json()
        if err != nil{
            err = websocket.Message.Send(c.Ws, "Error")
            if err != nil{
                pool.Out <- c.Key
                break
            }
        }
        err = websocket.Message.Send(c.Ws, r)
        if err != nil{
            pool.Out <- c.Key
            break
        }
    }
}


func Ws(ws *websocket.Conn){
    var uri string = ws.Request().RequestURI
    if len(uri) <= 4{
        ws.Close()
        return
    }
    var key string = uri[4:]
    var ok bool
    if _, ok = pool.Connections[key]; !ok{
        ws.Close()
        return
    }
    var c *Connection = new(Connection)
    c.Ws = ws
    c.Key = key
    pool.In <- c

    c.Receive()

    ws.Close()
}

