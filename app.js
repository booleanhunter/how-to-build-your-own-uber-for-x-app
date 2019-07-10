const http = require('http');
const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes'); //File that contains our endpoints
const socketEvents = require('./socket-events');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

app.set('views', 'views'); // Set the folder-name from where you serve the html page.
app.use(express.static('./public')); // setting the folder name (public) where all the static files like css, js, images etc are made available

app.set('view engine', 'html');
app.engine('html', consolidate.handlebars); // Use handlebars to parse templates when we do res.render

// connect to Database
const db = 'mongodb://localhost:27017/uberForX';
mongoose.connect(db).then(value => {
    // Successful connection
    console.log(value.models);
}).catch(error => {
    // Error in connection
    console.log(error);
});

app.use('/', routes);

const server = http.Server(app);
const portNumber = 8000; // for locahost:8000

server.listen(portNumber, () => { // Runs the server on port 8000
    console.log(`Server listening at port ${portNumber}`);
    socketEvents.initialize(server);
});