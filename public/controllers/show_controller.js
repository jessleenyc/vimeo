angular.module('VimeoApp').controller('ShowController', ShowController);


ShowController.$inject = ['$http'];

function ShowController ($http) {
  var user = this;
  user.playlist = function() {
    $http
      .get('/playlist')
      .then(function(response) {
        console.log(response); 
      })
  }

}