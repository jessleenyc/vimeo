var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var videos = require('./vimeo.js');
var session = require('express-session')
var bcrypt = require('bcrypt');
var MongoStore = require('connect-mongo')(session)

//configuration
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.set('view engine', 'ejs');




//db
var db;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/vimeo';
MongoClient.connect(mongoUrl, function(err, database) {
  if (err) { throw err; }
  db = database;
  process.on('exit', db.close);
});


//login session
app.use(function(req, res, next) {
  console.log(req.method, req.url, '\n body:', req.body, '\n session:', req.session);
  console.log("Wow a change")
  next();
})

app.use(session({
  secret: 'waffles',
  store: new MongoStore({ url: mongoUrl })
}))


var authenticateUser = function(email, password, callback) {
  db.collection('users').findOne({email: email}, function(err, data) {
    if (err) {throw err;}
    bcrypt.compare(password, data.password, function(err, passwordsMatch) {
      if (passwordsMatch) { 
        console.log('match') 
        callback(data)     
      } else {
        console.log('no match');
        callback(false);
      }
    })
  });
};

//Vimeo API 
require('dotenv').load();

var Vimeo = require('vimeo').Vimeo; 
var lib = new Vimeo(process.env.VIMEO_IDENTIFIER, process.env.VIMEO_SECRET, process.env.VIMEO_TOKEN);

//routes
app.get('/', function(req, res) {
  console.log('log session email ' + req.session.email);

  db.collection('users').find({}).toArray(function(err, users) {
    var email = req.session.email || false;
    console.log('email', email);
    res.render('index', {users: users, email: email});
  });

});

app.post('/category', function(req, res) {
  console.log('cate' + req.query.cat);
  console.log('page' + req.query.page);
  var call = function(){
    lib.request({
    path: req.query.cat,
    query: {
        page: req.query.page,
        per_page: 50,
        sort: 'plays',
    }
  },function(error, body, status_code, headers) {
      if (error) {
        console.log('error' + error);
      }
        res.json(body.data);
    })
  }
  call();
})

app.post('/register', function(req, res) {
  //encrypt user password

  var hash = bcrypt.hashSync(req.body.password, 8);

  var user = {
    name: req.body.name,
    email: req.body.email,
    password: hash
  }

  //add user to db
  db.collection('users').insert(user, function(err, result) {
    if(err){
      console.log(err);
    } else {
      console.log('succesfullly registered user')
    }
  })
})

app.post('/login', function(req, res) {
    // req.session.name = req.body.username;

  authenticateUser(req.body.email, req.body.password, function(user) {
    console.log('loggin user' + user._id);
    if (user) {
      req.session.email = user.email;
      req.session.userId = user._id;
    }
  });
});

app.get('/logout', function(req, res) {
  console.log('logged out server?')
  req.session.email = null;
  req.session.userId = null;
  res.redirect('index');
})

app.post('/playlist', function(req, res) {
  //saves playlist to user 
  if (req.session) {
    db.collection('users').update({email: req.session.email}, {$push: {playlist: req.body.playlist}})
  }
})

//grabs user playlist
app.get('/playlist', function(req, res) {
  if (req.session) {
    db.collection('users').findOne({email: req.session.email}, function(err, userPlaylist) {
      res.json(userPlaylist);
    })
  }
})

app.get('/users/:id', function(req, res) {
  var id = req.params.id 
  res.render('show'); 
})

app.listen(process.env.PORT || 3000);




