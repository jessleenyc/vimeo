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
var lib = new Vimeo("d8261f33a12c9c8f8527c9039d6c80dd6b48d66e", "O1iW2pYeFFuaAkY6Fx3hPLFEE+P9njgCCXt56ON6hcS/131e0+nDcdA1dh2LkRS3nAhP61hm7LbdYvRFXuipolW2bmPwg6QYepZYndYsZu9Yalmos5XhlrWt7mtkypn0", "5bf9b36d0c1cc469d2297e682f94acce");

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