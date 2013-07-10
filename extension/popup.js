function init(){
	var usernameArray = localStorage.username.split("|");
	var unseenMailCountArray = localStorage.unseenMailCount.split("|");
	var i;
	for(i=0;i<usernameArray.length;i++){
		if(usernameArray[i] != "undefined"){
			$(".content").append('<div class="email">'+usernameArray[i]+'</div><div class="unseen">'+unseenMailCountArray[i]+'</div>');
		}
	}
}

$(document).ready(function(){
	init();
});
