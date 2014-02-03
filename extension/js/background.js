function init(){
    chrome.browserAction.setIcon({path: "unconnected.png"});
    localStorage.message = JSON.stringify([]);
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

var key = "";
$(document).ready(function(){
    $.ajax({
        async: false,
        url: 'linode.txthinking.com:12345/',
        success: function(data) {
            key = data;
        }
    });

    websocket = new WebSocket("ws://linode.txthinking.com:12345/ws/" + key;
    websocket.onopen = function(e){
        chrome.browserAction.setIcon({path: "connected.png"});
        chrome.browserAction.setBadgeBackgroundColor({color:[102, 102, 102, 255]});
        chrome.browserAction.setBadgeText({text:""});
    }
    websocket.onclose = function(e) {
    }
    websocket.onmessage = function(e){
        handleMessage(JSON.parse(e.data));
    }
    websocket.onerror = function(e) {
    }
    send();
});

function handleMessage(m){
    if(!m.Ok){
        var ms = JSON.parse(localStorage.message);
        ms.push(m.Email + ":" + m.Message);
        localStorage.message = JSON.stringify(ms);
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
    chrome.browserAction.setBadgeText({text: ""});
    if(c > 0){
        chrome.browserAction.setBadgeText({text: c});
    }
}

