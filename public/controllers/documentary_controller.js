angular.module('VimeoApp').controller('DocumentaryController', DocumentaryController);

DocumentaryController.$inject = ['$http'];


function DocumentaryController($http) {
  var docs = this;
  docs.all = [];

  docs.fetch = function() {
    $http 
      .get('/documentaries') 
      .then(funct ion(response) {
        docs.all = response.data
        console.log(docs.all[0].embed.html());
      })


  }
  docs.fetch();
}

