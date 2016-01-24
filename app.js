var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var videos = require('./vimeo.js');

//configuration
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.set('view engine', 'ejs');


//Vimeo API 
require('dotenv').load();

var Vimeo = require('vimeo').Vimeo; 
var lib = new Vimeo(process.env.VIMEO_IDENTIFIER, process.env.VIMEO_SECRET, process.env.VIMEO_TOKEN);

//routes
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/category', function(req, res) {
  console.log(req.query.cat);
  var call = function(){
    lib.request({
    path: req.query.cat,
    query: {
        page: Math.floor(Math.random() * 5) + 1,
        per_page: 50,
        sort: 'plays',
    }
  },function(error, body, status_code, headers) {
      if (error) {
        console.log('error' + error);
      } else {
        res.json(body.data);
        console.log(body.data);
      }
  })
}

call();

})

app.listen(process.env.PORT || 3000);




