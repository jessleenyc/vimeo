angular.module('VimeoApp').controller('RegisterController', RegisterController);


RegisterController.$inject = ['$http'];

function RegisterController($http) {
  var register = this;
  
  register.account = function(cb) {
    
    var user = {
      name: register.name,
      email: register.email,
      password: register.password
    }

    $http
      .post('/register', user)
      .then(function(response) {
        console.log('then!!')
        //toggle thank you for registering
        //show login or automatic login?
        cb(user)
      });
  }

  register.login = function(data, cb) {
    console.log('callback function', data);
    $http
      .post('/login', data)
      .then(function(response) {
        
      })
  }

};