var key = "";

function send(){
    websocket.send(localStorage.data);
}

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
    }
    websocket.onclose = function(e) {
    }
    websocket.onmessage = function(e){
        var m = $.parseJSON(e.data);
        console.log(m);
    }
    websocket.onerror = function(e) {
    }
    send();
});
