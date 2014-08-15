function route(handle, pathname, response, request){
  console.log("about to route a request for "+pathname);

  if(typeof handle[pathname] === 'function'){ //if the request handler for the requested url exists
    handle[pathname](response, request);  //call the appropriate request handler function
  }
  else{
    console.log("No request handler found for "+pathname);
  }
}

exports.route = route; //export the function for use as a module in another file

//NOTE: refer from page 30 of nodebeginner for a detailed explanation
