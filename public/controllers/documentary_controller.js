angular.module('VimeoApp').controller('DocumentaryController', DocumentaryController);

DocumentaryController.$inject = ['$http'];


function DocumentaryController($http) {
  var docs = this;
  docs.all = [];

  docs.fetch = function(cb, num) {
    $http 
      .get('/documentaries') 
      .then(function(response) {
        docs.all = response.data
        cb(num);
      })
  
  }

  var oneLong = function(num) {
    var documentaries = docs.all;

    var one = documentaries[Math.floor(Math.random() * docs.all.length)];

    var ascDoc = [];

    documentaries.forEach(function(doc) {
      if (doc.duration < num) {
        ascDoc.push(doc);
      }
      
    })
  console.log(ascDoc.length);
    // docs.all.forEach(function(doc) {
    //   if (doc.duration > 900 && doc.duration < 1800) {
    //   }
    // })
  }

  docs.fetch(oneLong, 600);
}

