console.log("js is loaded!")

function saveTodo(){
	var todoInputElement = document.getElementById("todoInput");
	var date = new Date();

	var postData = {
		content: todoInputElement.value,
		date: date.toString()
	};

	$.ajax({
	    type: 'POST',
	    url: '/todos/save',
	    datatype: 'json',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(postData),
	    success: function(data){
	    	console.log(data)
	    },
	    error: function(httpRequest,status,error) {
	        console.log(error);
	    }
	});
}

function getTodos(){
	$.ajax({
	    type: 'GET',
	    url: '/todos/get_all',
	    datatype: 'json',
	    success: function(data){
	    	console.log(data)
	    	document.getElementById("mytodos").innerHTML = JSON.stringify(data)
	    },
	    error: function(httpRequest,status,error) {
	        console.log(error);
	    }
	});
}