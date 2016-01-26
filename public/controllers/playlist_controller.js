angular.module('VimeoApp').controller('PlaylistController', PlaylistController);

PlaylistController.$inject = ['$http'];

function PlaylistController($http) {
  var playlist = this;
  playlist.all = [];
  playlist.consolidate = [];
  
  playlist.history = function() {
    $http
    .get('/playlist')
    .then(function(response) {

      playlist.all = response.data.playlist;

      if(playlist.all) {
        for(var i = 0; i < playlist.all.length; i++) {
          for (var j=0; j < playlist.all[i].length;  j++) {
            playlist.consolidate.push(playlist.all[i][j])
          }
        }
      }
    })
  }
  playlist.history();
}


