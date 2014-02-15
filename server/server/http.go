//
// Author Cloud@txthinking.com
//
package server

import(
    "net/http"
    "code.google.com/p/go.net/websocket"
    "log"
    //_ "net/http/pprof"
)

func Run() {
    var err error
    go StartPool()
    http.HandleFunc("/", Root)
    http.Handle("/ws/", websocket.Handler(Ws))
    err = http.ListenAndServe("0.0.0.0:9000", nil)
    if err != nil {
        log.Fatal("ListenAndServe:", err)
    }
}

