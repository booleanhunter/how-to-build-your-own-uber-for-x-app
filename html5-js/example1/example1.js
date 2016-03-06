	var inp=document.getElementById("inp");
	inp.addEventListener("keydown",display,false);
	var a = 20;
function display(e){
	var inp=document.getElementById("inp");
	var key=e.keyCode;
	if(key<91 && key>64){
		e.preventDefault();
		inp.reset();
		return false;
	}
}