angular.module('VimeoApp').controller('CategoryController', CategoryController);

CategoryController.$inject = ['$http'];

function CategoryController($http) {

  var videos = this;
  videos.all = [];
  videos.newList; 
  

  videos.fetch = function(cb, num) {
    // display lader
    $('#loader').toggle();
    var category = $("#cat input[type='radio']:checked").val();


    $http 
    .post('/category?cat='+category)

    .then(function(response) {
      videos.all = response.data
        //remove loader
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
  }
  $('#submit').on('click', function() {
    var time = $('#time').val()
    videos.fetch(playlist, time);
    $('#playlist').toggle();

  });
  
}

