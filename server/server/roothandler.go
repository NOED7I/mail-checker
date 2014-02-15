package server

import (
    "net/http"
    "io/ioutil"
)

func Root(w http.ResponseWriter, r *http.Request) {
    const REQUEST_KEY = "SUFNVEhJTktJTkcK"
    var rk []byte
    defer r.Body.Close()
    rk, _ = ioutil.ReadAll(r.Body)
    if(string(rk) != REQUEST_KEY){
        http.Error(w, "Error", 403)
        return
    }
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

