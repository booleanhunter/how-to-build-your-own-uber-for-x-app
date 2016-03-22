var formOne=document.getElementById("form-one");

formOne.addEventListener("keydown",display,false);

function display(e){
	var formOne=document.getElementById("form-one");
	var key=e.keyCode;
	if(key<91 && key>64){
		e.preventDefault();
		formOne.reset();
		return false;
	}
}