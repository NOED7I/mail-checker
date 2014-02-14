var key;
var websocket;
var number = 0;
chrome.browserAction.setIcon({path: "img/unconnected.png"});

function init(){
    localStorage.message = JSON.stringify([]);
    if(!localStorage.data){
        localStorage.data = '[]';
    }
    var data = JSON.parse(localStorage.data);
    var us = [];
    var i;
    for(i=0; i<data.length; i++){
        us.push({email: data[i].email, unseen: 0});
    }
    localStorage.unseen = JSON.stringify(us);
    console.log("init", localStorage.message);
    console.log("init", localStorage.data);
    console.log("init", localStorage.unseen);
}

function send(){
    if(!localStorage.data || localStorage.data === '[]'){
        return;
    }
    if(websocket){
        console.log("send", localStorage.data);
        websocket.send(localStorage.data);
    }
}

$(document).ready(function(){
    init();
    $.ajax({
        async: false,
        url: 'http://linode.txthinking.com:12345/',
        success: function(data) {
            key = data;
        }
    });
    websocket = new WebSocket("ws://linode.txthinking.com:12345/ws/" + key);
    websocket.onopen = function(e){
        chrome.browserAction.setIcon({path: "img/connected.png"});
        chrome.browserAction.setBadgeBackgroundColor({color:[102, 102, 102, 255]});
        chrome.browserAction.setBadgeText({text:""});
        send();
    }
    websocket.onclose = function(e) {
    }
    websocket.onmessage = function(e){
        handleMessage(JSON.parse(e.data));
    }
    websocket.onerror = function(e) {
    }
});

function handleMessage(m){
    console.log("receive", m);
    if(!m.Ok){
        var ms = JSON.parse(localStorage.message);
        ms.push({email: m.Email, message: m.Message});
        localStorage.message = JSON.stringify(ms);
        console.log("message", localStorage.message);
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
    if(number === 0){
        chrome.browserAction.setBadgeText({text: ""});
    }else{
        chrome.browserAction.setBadgeText({text: String(number)});
    }
}

