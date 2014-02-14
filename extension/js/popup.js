function show(){
    var m = $.parseJSON(localStorage.message);
	for(var i=0;i<m.length;i++){
        $(".data").append('<div class="email">'+m[i].email+'</div><div class="unseen">'+m[i].unseen+'</div>');
	}
}

$(document).ready(function(){
	show();
});
