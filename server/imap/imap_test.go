package imap

import(
    "testing"
)

const P = ""

func TestUnseen(t *testing.T){
    var imap *Imap = new(Imap)
    imap.ImapServer = "imap.ym.163.com"
    imap.ImapPort = "993"
    imap.Email = "tmp@ym.txthinking.com"
    imap.Password = P

    unseen, err := imap.Unseen()
    if err != nil{
        t.Fatal(unseen, err)
    }
}

func BenchmarkUnseen(b *testing.B){
    b.ResetTimer()
    var c chan int = make(chan int)
    b.StartTimer()
    for i:=0;i<b.N;i++{
        go func(){
            var imap *Imap = new(Imap)
            imap.ImapServer = "imap.ym.163.com"
            imap.ImapPort = "993"
            imap.Email = "tmp@ym.txthinking.com"
            imap.Password = P

            unseen, err := imap.Unseen()
            if err != nil{
                b.Fatal(unseen, err)
            }
            <- c
        }()
    }
    for i:=0;i<b.N;i++{
        c <- i
    }
    b.StopTimer()
}

