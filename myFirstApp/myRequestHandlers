var querystring = require("querystring");//1
var exec = require("child_process").exec; //2

function start(response, postData){
  console.log("Request handler 'start' called");
  var body= '<html>'+       //display a simple form for the user to input a command
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html"'+
  'charset=utf-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" method="post">'+  //This takes the user to the /upload url upon submission of the form
  '<div style="font-weight:bold; font-size:0.3in; color:rgba(25,25,100,0.8);"><p>Welcome to my first App! :)</p>'+
  '<p style="color:rgba(130,0,0,0.8);">Type a linux command in the box</p></div>'+
  '<textarea name="text" style="color:blue;"></textarea>'+
  '<input type="submit" value="Execute! :)" />'+
  '</form>'+
  '</body>'+
  '</html>';
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function upload(response, postData){
  console.log("Request handler 'upload' called");
  var command = querystring.parse(postData).text;
  console.log("You sent the text: "+command);
  
  exec(command, function(error, stdout, stderr){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You requested the command "+command+"\n");
    response.write(stdout);
    if(error){
      response.write(stderr);
    }
    response.end();
  });
}

exports.start = start;
exports.upload = upload;

/*refer page 29 of nodebeginner ebook for explanation
1.this module assists us in fetching the individual fields of the POST data. POST data is in the form NAME=VALUE, and we want just the value to use it in exec()

2.child_process is a module which allows us to use exe(), a very simple and useful non-blocking operation. It executes a shell command from within nodejs.
*/
