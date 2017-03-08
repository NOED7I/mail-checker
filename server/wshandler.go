package main

import (
	"encoding/json"
	"time"

	"github.com/txthinking/mail-checker/server/imap"
	"golang.org/x/net/websocket"
)

type Connection struct {
	Ws    *websocket.Conn
	Imaps []*imap.Imap
	Key   string
}

type Pool struct {
	Connections map[string]*Connection
	In          chan *Connection
	Out         chan string
}

var pool *Pool = &Pool{
	Connections: make(map[string]*Connection),
	In:          make(chan *Connection),
	Out:         make(chan string),
}

func StartPool() {
	var c *Connection
	var out string
	for {
		select {
		case c = <-pool.In:
			pool.Connections[c.Key] = c
			go c.Query()
		case out = <-pool.Out:
			delete(pool.Connections, out)
		}
	}
}

func (c *Connection) Query() {
	for {
		var ok bool
		if _, ok = pool.Connections[c.Key]; !ok {
			break
		}
		var i *imap.Imap
		for _, i = range c.Imaps {
			go func(i *imap.Imap) {
				var unseen int
				var err error
				var r string
				var response Response = Response{
					Email: i.Email,
				}
				unseen, err = i.Unseen()
				if err != nil {
					response.Ok = false
					response.Message = err.Error()
					r, err = response.Json()
					// server's response can't be parsed to json
					if err != nil {
						response.Message = "Server response can't be parsed to JSON, you can check you settings."
						r, _ = response.Json()
						err = websocket.Message.Send(c.Ws, r)
						if err != nil {
							pool.Out <- c.Key
							return
						}
						return
					}
					// send server's response about error
					err = websocket.Message.Send(c.Ws, r)
					if err != nil {
						pool.Out <- c.Key
						return
					}
					return
				}
				// send success message
				response.Ok = true
				response.Unseen = unseen
				r, _ = response.Json()
				err = websocket.Message.Send(c.Ws, r)
				if err != nil {
					pool.Out <- c.Key
					return
				}
			}(i)
		}
		time.Sleep(2 * time.Minute)
	}
}

func (c *Connection) Receive() {
	var err error
	var message []byte
	for {
		err = websocket.Message.Receive(c.Ws, &message)
		if err != nil {
			break
		}

		var response Response = Response{}
		var r string

		// heartbeat
		if string(message) == "HB" {
			response.Ok = true
			r, _ = response.Json()
			err = websocket.Message.Send(c.Ws, r)
			if err != nil {
				pool.Out <- c.Key
				break
			}
			continue
		}

		// data
		c.Imaps = make([]*imap.Imap, 0)
		err = json.Unmarshal(message, &c.Imaps)
		if err != nil {
			response.Ok = false
			response.Message = "You input some error data because it can't be parsed to json data"
			r, _ = response.Json()
			err = websocket.Message.Send(c.Ws, r)
			if err != nil {
				pool.Out <- c.Key
				break
			}
			continue
		}
		response.Ok = true
		r, _ = response.Json()
		err = websocket.Message.Send(c.Ws, r)
		if err != nil {
			pool.Out <- c.Key
			break
		}
	}
}

func Ws(ws *websocket.Conn) {
	var uri string = ws.Request().RequestURI
	if len(uri) <= 4 {
		ws.Close()
		return
	}
	var key string = uri[4:]
	var ok bool
	if _, ok = pool.Connections[key]; !ok {
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
