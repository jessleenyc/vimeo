angular.module('VimeoApp').controller('RegisterController', RegisterController);

RegisterController.$inject = ['$http'];

function RegisterController($http) {
  var register = this;

  var $login = $('#login');

  console.log('WORKING ', $login.attr('href'));


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
        cb(user)
      });
  }

  register.login = function(data, cb) {
    console.log('callback function', data);
    //automatically logs user in
    $http
      .post('/login', data)
      .then(function(response) {
        register.isLoggedIn = true;
        $login.attr('href', '/logout');
        $login.text('Log Out');

        //after a user registers, they are immediately signed in. However, i want the index ejs to reflect the change--registration form should be removed and login should be replaced with logout. it will only render if i refresh the page. 
        console.log(register.isLoggedIn);
      })
  }

};