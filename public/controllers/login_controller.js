angular.module('VimeoApp').controller('LoginController', LoginController);


LoginController.$inject = ['$http'];

function LoginController($http) {
  var login = this;

  login.session = function() {

    var user = {
      email: login.email,
      password: login.password
    }

    $http
      .post('/login', user)
      .then(function(response) {
        console.log('logged in?');
      })

  }

  login.end = function() {
    $http
      .get('/logout')
      .then(function(response) {
        console.log('logged out?')
      })
  }
}