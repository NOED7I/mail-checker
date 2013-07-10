/**
 * check new mail mailCount
 * @author    cloud@txthinking.com
 * @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html     GNU GPL v2
 */

////////////////////////////////////////////////////////////////////////
var KEY = "47a7b49b6e621e5bf5f2439ef537c3ad";
var SERVERS = new Array(
	"http://bjphp.aliapp.com/chrome/mail-checker/checkMail2.php",
	"http://bjphp.aliapp.com/chrome/mail-checker/checkMail2.php",
	"http://bjphp.aliapp.com/chrome/mail-checker/checkMail2.php",
	"http://bjphp.aliapp.com/chrome/mail-checker/checkMail2.php",
	"http://bjphp.aliapp.com/chrome/mail-checker/checkMail2.php"
);
////////////////////////////////////////////////////////////////////////

chrome.browserAction.setIcon({path: "not_logged_in.png"});

/**
 * init
 */
function init(){
	
	if(localStorage.username && localStorage.username != "undefined"){
		chrome.browserAction.setIcon({path: "logged_in.png"});
		chrome.browserAction.setBadgeBackgroundColor({color:[0, 127, 0, 255]});
		chrome.browserAction.setBadgeText({text:""});
	}else{
		chrome.browserAction.setIcon({path: "not_logged_in.png"});
		chrome.browserAction.setBadgeBackgroundColor({color:[102, 102, 102, 255]});
		chrome.browserAction.setBadgeText({text:""});
	}
}

/**
 * Timer
 */
function timer(){
	if(localStorage.username && localStorage.username != "undefined"){
		var usernameArray = localStorage.username.split("|");
		var i;
		for(i=0;i<usernameArray.length;i++){
			check(i);
		}
	}
	setTimeout(timer, 5000);
}

/**
 * ajax
 */
function check(index)
{
	var usernameArray = localStorage.username.split("|");
	var passwordArray = localStorage.password.split("|");
	var imapServerArray = localStorage.imapServer.split("|");
	var serverPortArray = localStorage.serverPort.split("|");
	
	var username = usernameArray[index];
	var password = passwordArray[index];
	var imapServer = imapServerArray[index];
	var serverPort = serverPortArray[index];
	
	$.ajax({
		type: "POST",
		url: SERVERS[index],
		async: true,
		cache: false,
		dataType : 'json',
		data : {
	        "username" : goXor(KEY, username),
	        "password" : goXor(KEY, password),
	        "server" : goXor(KEY, imapServer),
	        "port" : goXor(KEY, serverPort),
	        "cache" : Math.random()
	    },
	    success : function(data){
	    	if(data['code'] == 0){
	    		var unseenMailCountSum = 0;
	    		
	    		//update localStorage.unseenMailCount
	    		var unseenMailCountArray = localStorage.unseenMailCount.split("|");
	    		unseenMailCountArray[index] = data['data'];
	    		localStorage.unseenMailCount = unseenMailCountArray.join("|");
	    		
	    		var i;
	    		for(i=0;i<unseenMailCountArray.length;i++){
	    			//trans to int and plus
	    			unseenMailCountSum += parseInt(unseenMailCountArray[i]);
	    		}
	    		
	    		//show on browserAction
	    		if(unseenMailCountSum == 0){
	    			chrome.browserAction.setBadgeText({text:""});
	    		}else{
	    			//transfer interger to string
	    			unseenMailCountSum = unseenMailCountSum+"";
	    			chrome.browserAction.setBadgeText({text:unseenMailCountSum});
	    		}
	    	}
	    }
	});
}

/**
 * Called when the user clicks on the browser action.
 
var url;
chrome.browserAction.onClicked.addListener(function(tab) {
	url = localStorage.mailCheckerUrl || "https://www.google.com";
	chrome.tabs.create({url: url});
});
*/
/**
 * xor
 */
function goXor(k, s) {
	var i;
	var j;
	for (i=0; i<s.length; i++) {
		for (j=0; j<k.length; j++) {
			var temp = String.fromCharCode(s.charCodeAt(i)^k.charCodeAt(j));
			s = s.substring(0, i) + temp + s.substring(i+1);
		}
	}
	return s;
}
/**
 * execute init
 */
//document.addEventListener('DOMContentLoaded', init);
$(document).ready(function () {
	  init();
	  timer();
});



