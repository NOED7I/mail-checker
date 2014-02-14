package server

import(
    "encoding/json"
)

type Response struct{
    Ok bool
    Message interface{}
    Email string
    Unseen int
}

func (r Response)Json()(j string, err error){
    var b []byte
     b, err = json.Marshal(r)
     j = string(b)
     return
}

