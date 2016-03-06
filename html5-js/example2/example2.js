	function changeLeft(){
		document.getElementById("center").className="left";
	} 

	function changeRight(){
		document.getElementById("center").className="right";
	}

	var left=document.getElementById("left"),
		right=document.getElementById("right");
	//event listeners
	left.addEventListener("click",changeLeft,false);
	right.addEventListener("click",changeRight,false);
