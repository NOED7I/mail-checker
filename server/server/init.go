package server

import(
    "runtime"
)

func init(){
    //runtime.GOMAXPROCS(runtime.NumCPU())
    runtime.GOMAXPROCS(1)
}


