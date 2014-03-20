//
// Author Cloud@txthinking.com
//
var REQUEST_KEY = "SUFNVEhJTktJTkcK";
var key = false;
var websocket = false;
var number = 0;
chrome.browserAction.setIcon({path: "img/unconnected.png"});

function log(message){
    var ms = JSON.parse(localStorage.message);
    message.time = (new Date()).toLocaleString();
    ms.push(message);
    localStorage.message = JSON.stringify(ms);
}

function init(){
    // clean message
    localStorage.message = JSON.stringify([]);
    if(!localStorage.data){
        localStorage.data = '[]';
    }
    // init unseen
    var data = JSON.parse(localStorage.data);
    var us = [];
    var i;
    for(i=0; i<data.length; i++){
        us.push({email: data[i].email, unseen: 0});
    }
    localStorage.unseen = JSON.stringify(us);
}

function send(){
    if(!localStorage.data || localStorage.data === '[]'){
        return;
    }
    websocket.send(localStorage.data);
}

function heartbeat(){
    if(!websocket || websocket.readyState === websocket.CLOSING || websocket.readyState === websocket.CLOSED){
        makeWebsocket();
        return;
    }
    if(websocket.readState === websocket.CONNECTING){
        return;
    }
    websocket.send("HB");
}

function makeKey(){
    $.ajax({
        async: false,
        cache: false,
        url: 'http://linode.txthinking.com:9000/',
        type: "POST",
        data: REQUEST_KEY,
        complete: function(x, s) {
            if(s === "success"){
                key = x.responseText;
            }else{
                key = false;
            }
        }
    });
}

function makeWebsocket(){
    makeKey();
    if(!key){
        return;
    }
    websocket = new WebSocket("ws://linode.txthinking.com:9000/ws/" + key);
    websocket.onopen = function(e){
        chrome.browserAction.setIcon({path: "img/connected.png"});
        chrome.browserAction.setBadgeBackgroundColor({color:[102, 102, 102, 255]});
        chrome.browserAction.setBadgeText({text:String(number)});
        send();
    }
    websocket.onclose = function(e) {
        log({email: "", message: "Connection error, maybe server has down, or check your network."});
        chrome.browserAction.setIcon({path: "img/unconnected.png"});
    }
    websocket.onmessage = function(e){
        if(e.type === "message"){
            handleMessage(JSON.parse(e.data));
        }
    }
    websocket.onerror = function(e) {
        log({email: "", message: "Connection error, maybe server has down, or check your network."});
        chrome.browserAction.setIcon({path: "img/unconnected.png"});
    }
}

$(document).ready(function(){
    init();
    makeWebsocket();
    setInterval(heartbeat, 1000*60*1);
});

function handleMessage(m){
    if(!m.Ok){
        log({email: m.Email, message: m.Message});
        return;
    }
    if(m.Email === ""){
        return;
    }
    var us = JSON.parse(localStorage.unseen);
    var i;
    var c = 0;
    for(i=0; i<us.length; i++){
        if(us[i].email === m.Email){
            us[i].unseen = m.Unseen;
        }
        c += us[i].unseen;
    }
    localStorage.unseen = JSON.stringify(us);

    if(c === number){
        return;
    }
    number = c;
    chrome.browserAction.setBadgeText({text: String(number)});
}

