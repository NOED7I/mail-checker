package server

import (
    "net/http"
)

func Root(w http.ResponseWriter, r *http.Request) {
    var k string
    for{
        k = Key()
        var ok bool
        if _, ok = pool.Connections[k]; !ok{
            pool.Connections[k] = nil
            break
        }
    }
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(k))
}

