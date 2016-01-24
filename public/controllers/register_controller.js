angular.module('VimeoApp').controller('RegisterController', RegisterController);


RegisterController.$inject = ['$http'];

function RegisterController($http) {
  var register = this;
  
  register.account = function() {
    
    var user = {
      name: register.name,
      email: register.email,
      password: register.password
    }
    console.log( user); 
    $http
      .post('/register', user)
      .then(function(response) {
        console.log(response);
        //toggle thank you for register
        //show login or automatic login?
      })
  }



};