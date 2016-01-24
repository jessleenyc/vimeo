angular.module('VimeoApp').controller('CategoryController', CategoryController);

CategoryController.$inject = ['$http'];

function CategoryController($http) {

  var videos = this;
  videos.all = [];
  videos.newList; 
  videos.minutes = 05;
  

  videos.fetch = function(cb, num) {
    $('#loader').toggle();
    var category = $("#cat input[type='radio']:checked").val();
    $http 
    .post('/category?cat='+category)
    .then(function(response) {
      videos.all = response.data
        cb(num);
      }) 
  }

  var playlist = function(num) {
    $('#loader').toggle();
    var selection = videos.all;
    var withinTimeFrame = [];

    //creates withinTimeFrame array of all videos within the amount of time provided 
    selection.forEach(function(vid) {
      if (vid.duration < num && vid.embed.html && vid.privacy.view == "anybody") {
        withinTimeFrame.push(vid);
      }    
    });

    var random = withinTimeFrame[Math.floor(Math.random() * withinTimeFrame.length)];
    //first video for selection
    videos.newList = [random];
    
    var count = 0;

    for(var i = 1; i < withinTimeFrame.length; i++) {

      if(count + withinTimeFrame[i].duration < num - random.duration && withinTimeFrame[i].name !== random.name) {
        videos.newList.push(withinTimeFrame[i]);
        count += withinTimeFrame[i].duration;
      }
    }
    console.log("new list" + videos.newList);
  };

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

  $('#submit').on('click', function() {
    // $('.container.selector').toggle();
    var time = videos.minutes * 60;
    console.log(time);
    videos.fetch(playlist, time);
    // $('#playlist').toggle();

  });
  
}

