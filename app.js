var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var videos = require('./vimeo.js');

//configuration
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', ejs);


//routes
app.get('/', function(req, res) {

})

videos.search();


