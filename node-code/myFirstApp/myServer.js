var http = require("http");  //1
var url = require("url");  //2

function start(route, handle){
  
  function onRequest(request, response){
    var postData = "";
    var pathname = url.parse(request.url).pathname;  //3

    console.log("Request for "+pathname+" received.");  //4
    request.setEncoding("utf8");
    
    request.addListener("data", function(postDataChunk){  //5
      postData = postData + postDataChunk;
      console.log("Received POST data chunk "+postDataChunk);
    });

    request.addListener("end", function(){
      console.log("Received data= "+postData);
      route(handle, pathname, response, postData);  //6
    }); 
  }
  
  var port = 8080;
  http.createServer(onRequest).listen(port,"0.0.0.0");  //7
  console.log("Server running at "+port); // Put a message on the terminal
}

exports.start = start;

/*
1. Load the http module to create an http server.

2. The url module provides methods which allow us to extract the different parts of a URL (like e.g. the requested path and query string)We need to be able to feed the requested URL and possible additional GET and POST parameters into our router, and based on these the router then needs to be able to decide which code to execute (this “code to execute” is the third part of our application:a collection of request handlers that do the actual work when a request is received).So, we need to look into the HTTP requests and extract the requested URL as well as the GET/POST parameters from them.

3. Pathname is The path section of the URL, that comes after the host and before the query, including the initial slash if present. Go here for more infohttp://nodejs.org/api/url.html

4. might print to standard output twice. Most browsers will also request http://localhost:8080/favicon.ico whenever you open http://localhost:8080

5. POST requests can potentially be very large - nothing stops the user from entering text that is multiple megabytes in size. Handling the whole bulk of data in
one go would result in a blocking operation. To make the whole process non-blocking, Node.js serves our code the POST data in small chunks, callbacks that are called upon certain events. These events are data (an new chunk of POST data arrives) and end (all chunks have been received). The idea is to put the data and end event callbacks in the server, collecting all POST data chunks in the data callback, and calling the router upon receiving the end event, while passing the collected data chunks on to the router, which in turn passes it on to the request handlers.

6. Pass the pathname, handle and response objects as parameter to the route function in the router file. Our objective here is to make our request handlers display something to the browser. Instead of expecting a return value from the route() function, we pass ot a third parameter, our response object. We removed any response method calls in this function because route() will now take care of that. Refer comments in index.js

7. Listen on port 8080, IP defaults to 127.0.0.1 We call the listen function on our new server object which takes in a numeric value which tells our server what port we want it to listen on.Every time our server receives and new connection on port 8080 it's going to run our function we gave it. 
*/
