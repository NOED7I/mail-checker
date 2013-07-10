/**
 * check new mail mailCount
 * @author   cloud@txthinking.com
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
/**
 * init display old value
 */
function init() {
	
	localStorage.username = localStorage.username || "undefined";
	localStorage.password = localStorage.password || "undefined";
	localStorage.imapServer = localStorage.imapServer || "undefined";
	localStorage.serverPort = localStorage.serverPort || "undefined";
	localStorage.unseenMailCount = localStorage.unseenMailCount || "undefined";
	
	if(localStorage.username && localStorage.username != "undefined"){
		var usernameArray = localStorage.username.split("|");
		var passwordArray = localStorage.password.split("|");
		var imapServerArray = localStorage.imapServer.split("|");
		var serverPortArray = localStorage.serverPort.split("|");
		var i;
		for(i=0;i<usernameArray.length;i++){
			$(".contentInput").eq(i*4).val(usernameArray[i]);
			$(".contentInput").eq(i*4+1).val(passwordArray[i]);
			$(".contentInput").eq(i*4+2).val(imapServerArray[i]);
			$(".contentInput").eq(i*4+3).val(serverPortArray[i]);
		}
	}
}

/**
 * save the contents
 */

function save(){
	var index = $(".contentButton").index(this);
		
	var username = $(".contentInput").eq(index*4).val();
	var password = $(".contentInput").eq(index*4+1).val();
	var imapServer = $(".contentInput").eq(index*4+2).val();
	var serverPort = $(".contentInput").eq(index*4+3).val();
	
	if(username == ""){
		$(this).text("Email empty!");
		return;
	}
	if(password == ""){
		$(this).text("Password empty!");
		return;
	}
	if(imapServer == ""){
		$(this).text("IMAP Server empty!");
		return;
	}
	if(serverPort == ""){
		$(this).text("Server Port empty!");
		return;
	}
	
	$(this).text("Wait...");
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
    			var usernameArray = localStorage.username.split("|");
    			var passwordArray = localStorage.password.split("|");
    			var imapServerArray = localStorage.imapServer.split("|");
    			var serverPortArray = localStorage.serverPort.split("|");
    			var unseenMailCountArray = localStorage.unseenMailCount.split("|");
    			
    			usernameArray[index] = username;
    			passwordArray[index] = password;
    			imapServerArray[index] = imapServer;
    			serverPortArray[index] = serverPort;
    			unseenMailCountArray[index] = data['data'];
    			
    			//join can not produce "undefined", so i control add button
    			localStorage.username = usernameArray.join("|");
				localStorage.password = passwordArray.join("|");
				localStorage.imapServer = imapServerArray.join("|");
				localStorage.serverPort = serverPortArray.join("|");
				localStorage.unseenMailCount = unseenMailCountArray.join("|");
	    		
	    		$(".contentButton").eq(index).text("Success");
	    		$(".contentAddButton").eq(index).removeAttr("disabled");
	    		//restart background js
	    		chrome.extension.getBackgroundPage().init();
	    	}else{
	    		$(".contentButton").eq(index).text("Failed");
	    	}
	    }
	});
}
/**
 * add content
 */
function addContent(){
	if($(".content").length > 4){
		$(this).text("Support 5 Account!");
		return;
	}
	
	$(".content:last").after($(".content:last").clone(true));
	$(".content:last input").val("");
	$(".content:last .contentButton").text("Save");
	$(".content:last .contentAddButton").text("Add One");
	$(".content:last .contentRemoveButton").text("Remove One");
	$(".contentAddButton").attr("disabled", "disabled");
}

/**
 * remove content
 */
function removeContent(){
	var index = $(".contentRemoveButton").index(this);
	
	if(index == 0){
		$(this).text("The First One!");
		return;
	}
	
	var usernameArray = localStorage.username.split("|");
	var passwordArray = localStorage.password.split("|");
	var imapServerArray = localStorage.imapServer.split("|");
	var serverPortArray = localStorage.serverPort.split("|");
	var unseenMailCountArray = localStorage.unseenMailCount.split("|");
	if(typeof(usernameArray[index]) != "undefined"){
		usernameArray.splice(index,1);
		passwordArray.splice(index,1);
		imapServerArray.splice(index,1);
		serverPortArray.splice(index,1);
		unseenMailCountArray.splice(index,1);
		
		localStorage.username = usernameArray.join("|");
		localStorage.password = passwordArray.join("|");
		localStorage.imapServer = imapServerArray.join("|");
		localStorage.serverPort = serverPortArray.join("|");
		localStorage.unseenMailCount = unseenMailCountArray.join("|");
		
		//restart background js
	    chrome.extension.getBackgroundPage().init();
	}
	$(".content").eq(index).remove();
	showAddButton();
}

/**
 * show a content
 */
function show(){
	if(localStorage.username && localStorage.username!="undefined"){
		var username = localStorage.username.split("|");
		var i;
		for(i=0;i<username.length;i++){
			if(i!=0){
				$(".content:last").after($(".content:last").clone(true));
			}
		}
	}
}
/**
 * 
 * undisble add content
 */
function showAddButton(){
	var usernameArray = localStorage.username.split("|");
	var i;
	for(i=0;i<usernameArray.length;i++){
		if(usernameArray[i] != "undefined"){
			$(".contentAddButton").eq(i).removeAttr("disabled");
		}
	}
}
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
 * donate
 */
function donateShow(){
	$(".donatePaypal").show(900);	
	$(".donateAlipay").show(900);	
}
function donatePaypal(){
	$(".donatePaypalForm form").submit();
}
function donateAlipay(){
	var alipayUrl = "https://me.alipay.com/txthinking";
	chrome.tabs.create({url: alipayUrl});
}
function feedback(){
	var feedbackUrl = "https://chrome.google.com/webstore/support/jgkgfedegchkekkhcgbmjidgbnfkcfni";
	chrome.tabs.create({url: feedbackUrl});
}
/**
 * execute init
 */
//document.addEventListener('DOMContentLoaded', init);
$(document).ready(function(){
	$(".contentAddButton").click(addContent);
	$(".contentRemoveButton").click(removeContent);
	show();
	init();
//	document.getElementById("save").addEventListener('click', save);
	$(".contentButton").click(save);
	$(".contentAddButton").attr("disabled", "disabled");
	showAddButton();
	$(".donateButton a").mouseover(donateShow);
	$(".donatePaypal a").click(donatePaypal);
	$(".donateAlipay a").click(donateAlipay);
	$(".feedback a").click(feedback);
});
