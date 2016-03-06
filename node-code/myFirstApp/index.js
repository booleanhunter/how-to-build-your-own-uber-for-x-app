var myserver = require("./myserver");
var router = require("./simplerouter");
var myrequesthandlers = require("./myrequesthandlers");

var handle = {}
handle["/"] = myrequesthandlers.start;
handle["/start"] = myrequesthandlers.start;
handle["/upload"] = myrequesthandlers.upload;

myserver.start(router.route, handle);

/*we need to pass the request handlers from our server into our router. We go the whole way and pass them to the server from our main file, and passing it on to the router from there. An associative array would be a perfect fit.A varying number of items, each mapped to a string, the string being the requested URL. In javascript objects are collections of name/value pairs. The values can be strings, numbers or in this case, even functions. We want to pass the list of requesthandlers as an object, and then we want to inject this object into the route() function. It’s really simple to map different URLs to the same request handler: by adding a key/value pair of ”/” and requestHandlers.start, we can express in a nice and clean way that not only requests to /start, but also requests to / shall be handled by the start handler.

Refer page 30 in nodebeginner if this doesn't make sense.
*/
