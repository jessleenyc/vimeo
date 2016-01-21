angular.module('VimeoApp').controller('DocumentaryController', DocumentaryController);

DocumentaryController.$inject = ['$http'];


function DocumentaryController($http) {
  var docs = this;
  docs.all = [];

  docs.fetch = function() {
    $http 
      .get('/documentaries') 
      .then(function(response) {
        docs.all = response.data
      })
  }
  docs.fetch();
}

