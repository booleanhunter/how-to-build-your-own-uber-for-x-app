var querystring = require("querystring");  //1
var fs = require("fs");  //2
var formidable = require("formidable");  

function start(response){
  console.log("Request handler 'start' called");
  var body = '<html>'+       //display a simple form for the user to input a command
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html"'+
  'charset=utf-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" method="post" enctype="multipart/form-data">'+  //This takes the user to /upload url upon submission of the form. 
  '<div style="font-weight:bold; font-size:0.3in; color:rgba(25,25,100,0.8);"><p>Welcome to my second App! :)</p>'+
  '<p style="color:rgba(130,0,0,0.8);">Upload a jpg file</p></div>'+
  '<input type="file" name="upload" multiple="multiple" style="color:blue;" />'+
  '<input type="submit" value="Upload" />'+
  '</form>'+
  '</body>'+
  '</html>';
  response.writeHead(200,{"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function upload(response, request){
  console.log("Request handler 'upload' called");
  var form = new formidable.IncomingForm();
  form.uploadDir = "/home/ashwin/NodeCode/myPics"; //change this path
  console.log("About to parse");
  form.parse(request,function(error,fields,files){
    console.log("Parsing done.");
    fs.rename(files.upload.path, "/home/ashwin/NodeCode/myPics/test.jpg", function(error){ //change this path
      if(error){
        console.log("Error in uploading file.");
        fs.unlink("/home/ashwin/NodeCode/myPics/test.jpg");  //change this path
        fs.rename(files.upload.path, "/home/ashwin/NodeCode/myPics/test.jpg"); //change this path
      } 
    });
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write("Image uploaded<br/>");
    response.write("<img src=\"/show\" />");
    response.end();
  });
}

function show(response){
  console.log("Request handler 'show' called");
  fs.readFile("/home/ashwin/NodeCode/myPics/test.jpg", "binary", function(error,file){ //change this path
    if(error){
      console.log("Error in reading file");
      response.writeHead(500,{"Content-Type":"text/plain"});
      response.write(error+"\n");
      response.end();
    }else{
      response.writeHead(200,{"Content-Type":"image/jpg"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;

/*refer page 55 of nodebeginner ebook for explanation
1. This module assists us in fetching the individual fields of the POST data. POST data is in the form NAME=VALUE, and we want just the value to use it in exec()

2. The fs module assists with file operations. we want to serve an image file on our local hard-drive to a requesting browser. For that, we need to read the contents of the file into the node.js server.

3. The node formidable module takes care of the details of parsing incoming file data. The metaphor formidable uses is that of a form being submitted via HTTP POST, making it parseable in Node.js. All we need to do is create a new IncomingForm, which is an abstraction of this submitted form, and which can then be used to parse the request object of our HTTP server for the fields and files that were submitted through this form.
*/
