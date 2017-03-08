package main

import (
	"log"
	"net/http"
	_ "net/http/pprof"
	"os"

	"golang.org/x/net/websocket"
)

func main() {
	listen := ":9000"
	if len(os.Args) == 2 {
		listen = os.Args[1]
	}
	var err error
	go StartPool()
	http.HandleFunc("/", Root)
	http.Handle("/ws/", websocket.Handler(Ws))
	err = http.ListenAndServe(listen, nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
