var addition = document.getElementById("add"), 
	subtraction = document.getElementById("subtract"),
	one = document.getElementById("one"),
	two = document.getElementById("two");

addition.addEventListener("click",add,false);

function add(){
	var	result = parseInt(one.value) + parseInt(two.value);
	document.getElementById("result").value = result;
	document.getElementById("para").innerHTML = "You performed addition.";
}

subtraction.addEventListener("click",subtract,false);

function subtract(){
	var	result = parseInt(one.value) - parseInt(two.value);
	document.getElementById("result").value = result;
	document.getElementById("para").innerHTML = "You performed subtraction.";
}

one.addEventListener("blur",display,false);
two.addEventListener("blur",display,false);

function display(){
	document.getElementById("para").innerHTML ="Input field blurred";
}
