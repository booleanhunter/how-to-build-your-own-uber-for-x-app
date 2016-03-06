var myForm=document.getElementById("myForm");
myForm.addEventListener("change",change(myForm.value),false);
function change(value){
	alert("You selected "+value)
}