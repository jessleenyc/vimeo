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

//set up db
var db;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/vimeoDB';
MongoClient.connect(mongoUrl, function(err, database) {
  if (err) { throw err; }
  db = database;
  process.on('exit', db.close);
});

//Vimeo API 
require('dotenv').load();

var Vimeo = require('vimeo').Vimeo; 
var lib = new Vimeo(process.env.VIMEO_IDENTIFIER, process.env.VIMEO_SECRET, process.env.VIMEO_TOKEN);

//routes
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/documentaries', function(req, res) {
  
  function dropDocs(cb) {
    db.collection('docs').drop();
    cb();
  }

  dropDocs(function(){
    lib.request({
    path: '/categories/documentary/videos',
    query: {
        page: 1,
        per_page: 20,
        sort: 'plays',
    }
  },function(error, body, status_code, headers) {
      if (error) {
        console.log(error);
      } else {
          var videos = body.data;
          var documentaryList = [];
          videos.forEach(function(video) {
            var newVideo = {
              name: video.name,
              link: video.uri,
              embed: video.embed.html,
              duration: video.duration,
              privacyEmbed: video.privacy.embed,
              privacyView: video.privacy.view,
              plays: video.stats.plays,
              modified: video.modified_time,
              created: video.created_time
            };
            documentaryList.push(newVideo);
          });
          db.collection('docs').insert(documentaryList, function (err, result) {
            if (err) {
              console.log(err)
            } 
          });
      }
  });
  })

  res.redirect('/');


});

app.get('/documentaries', function(req, res) {
  db.collection('docs').find({}).toArray(function(err, result) {
    res.json(result);
  })
})

app.listen(process.env.PORT || 3000);




