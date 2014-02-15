//
// Author Cloud@txthinking.com
//
package server

import(
    "testing"
)

func TestJson(t *testing.T){
    a := "哈哈哈"
    r := Response{
        Message: a,
    }

    j, err := r.Json()
    if err != nil{
        t.Fatal(err)
    }
    t.Log(j)
}

