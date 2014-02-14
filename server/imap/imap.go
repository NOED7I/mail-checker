package imap

import (
    "strconv"
    "net"
    "fmt"
    "bufio"
    "io"
    "strings"
    "regexp"
    "crypto/tls"
    "errors"
)

type Imap struct{
    ImapServer string
    ImapPort string
    Email string
    Password string
}

func (imap *Imap)Unseen()(unseen int, err error){
    var i int
    var t string = "TX"
    var tag string

    var nc net.Conn //interface type
    var in string
    var out string
    var ok bool

    if imap.ImapPort == "993"{
        nc, err = tls.Dial("tcp", imap.ImapServer+":"+imap.ImapPort, nil)
    }else{
        nc, err = net.Dial("tcp", imap.ImapServer+":"+imap.ImapPort)
    }
    if err != nil {
        return
    }else{
        defer nc.Close()
    }
    i++
    tag = t + strconv.Itoa(i)
    in = tag + " CAPABILITY\r\n"
    if out, ok, err = getCode(nc, in, tag); !ok || err !=nil{
        if !ok && err == nil{
            err = errors.New(out)
        }
        return
    }
    i++
    tag = t + strconv.Itoa(i)
    in = tag + " LOGIN " + imap.Email + " " +imap.Password+"\r\n"
    if out, ok, err = getCode(nc, in, tag); !ok || err !=nil {
        if !ok && err == nil{
            err = errors.New(out)
        }
        return
    }
    i++
    tag = t + strconv.Itoa(i)
    in = tag + " STATUS inbox (UNSEEN)\r\n"
    if out, ok, err = getCode(nc, in, tag); !ok || err !=nil {
        if !ok && err == nil{
            err = errors.New(out)
        }
        return
    }
    var r string = `\(UNSEEN (\d+)\)`
    var re *regexp.Regexp
    if re, err = regexp.Compile(r); err != nil{
        if !ok && err == nil{
            err = errors.New(out)
        }
        return
    }
    var ss [][]string = re.FindAllStringSubmatch(out, 1)
    if unseen, err = strconv.Atoi(ss[0][1]); err != nil{
        if !ok && err == nil{
            err = errors.New(out)
        }
        return
    }
    i++
    tag = t + strconv.Itoa(i)
    in = tag + " LOGOUT\r\n"
    if out, ok, err = getCode(nc, in, tag); !ok || err !=nil {
        if !ok && err == nil{
            err = errors.New(out)
        }
        return
    }
    return
}

func getCode(nc net.Conn, in string, tag string) (out string, ok bool, err error){
    var line string
    fmt.Fprintf(nc, in)
    var br *bufio.Reader = bufio.NewReader(nc)
    for {
        line, err = br.ReadString('\n')
        if err == io.EOF {
            break
        }
        if err != io.EOF && err != nil{
            break
        }
        out += line
        if strings.Contains(line, tag + " OK"){
            ok = true
            break
        }
        if strings.Contains(line, tag + " NO"){
            ok = false
            break
        }
        if strings.Contains(line, tag + " BAD"){
            ok = false
            break
        }
    }
    return
}

