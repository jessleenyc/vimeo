var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');

//configuration
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', ejs);
require('dotenv').load();

//vimeo API 
var Vimeo = require('vimeo').Vimeo; 
var lib = new Vimeo("");

  lib.request(/*options*/{
        // This is the path for the videos contained within the staff picks channels
        path : '/channels/staffpicks/videos',
        // This adds the parameters to request page two, and 10 items per page
        query : {
            page : 2,
            per_page : 10
        }
    }, /*callback*/function (error, body, status_code, headers) {
        if (error) {
            console.log(error);
        } else {
            console.log(body);
        }

        // console.log('status code');
        console.log(status_code);
        // console.log('headers');
        console.log(headers);
    })


//routes
app.get('/', function(req, res) {

})

app.listen(process.env.PORT || 5000);