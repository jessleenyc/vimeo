angular.module('VimeoApp').controller('CategoryController', CategoryController);

CategoryController.$inject = ['$http'];

function CategoryController($http) {

  var videos = this;
  videos.all = [];
  videos.playList; 

  //set default minutes to five 
  videos.minutes = 05;

  //set default category to random 
  videos.cat = 'random';

  videos.fetch = function(cb) {
    //shows loading animation
    $('#loader-visibility').toggle();

    // scrolls to loading animation
    // $('html,body').animate({
    //     scrollTop: $("#finish").offset().top()},
    //     'slow');

    //create params to send to server
    //category params
    var category;

    if(videos.cat === 'random') {
      category = '/channels/staffpicks/videos';
    } else {
      category = '/categories/' + videos.cat + '/videos';
    }  

    //convert time to seconds 
    videos.time = videos.minutes * 60

    //selecting a random page (between 1-15) that will return 50 videos
    var page = Math.floor(Math.random() * 15) + 1
    console.log(page);
    
    //sending a post request w/ params for the api call 

    $http 
    .post('/category?cat='+ category +'&page=' + page) 
    .then(function(response) {
      videos.all = response.data
        cb(videos.time);
      }) 
  };

  videos.playlist = function(num) {
    // remove loading animation 
    $('#loader-visibility').toggle();

    var selection = videos.all;
    var withinTimeFrame = [];

    //creates an array of all videos that do not exceed the time requirement, have embed links, and are public
    selection.forEach(function(vid) {
      if (vid.duration < num && vid.embed.html && vid.privacy.view == "anybody") {
        withinTimeFrame.push(vid);
      }    
    });

    var random = withinTimeFrame[Math.floor(Math.random() * withinTimeFrame.length)];

    //picks one random video to the playlist
    videos.playList = [random];

    //adds as many videos to the playList as possible before we hit the max time
    var count = 0;

    for(var i = 1; i < withinTimeFrame.length; i++) {

      if(count + withinTimeFrame[i].duration < num - random.duration && withinTimeFrame[i].name !== random.name) {
        videos.playList.push(withinTimeFrame[i]);
        count += withinTimeFrame[i].duration;
      }
    }

    $http
      .post('/playlist', {playlist: videos.playList})

  };

  //creates specific amounts of time
  videos.add = function() {

    if(videos.minutes <= 15) {
      videos.minutes += 5;
    } else if(videos.minutes === 20) {
      videos.minutes += 10;
    } else if(videos.minutes === 30 || videos.minutes === 45) {
      videos.minutes += 15;
    } else if(videos.minutes === 60) {
      videos.minutes += 30;
    } else {
      $('.max-time').toggle();
    }
  };

  videos.minus = function() {
    if(videos.minutes === 5) {
      $('.min-time').toggle();
    } else if (videos.minutes === 90) {
      videos.minutes -= 30;
    } else if (videos.minutes === 60 || videos.minutes === 45) {
      videos.minutes -= 15;
    } else if (videos.minutes === 30) {
      videos.minutes -= 10;
    } else {
      videos.minutes -= 5;
    }
  };
}

