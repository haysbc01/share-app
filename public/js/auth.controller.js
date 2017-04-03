angular.module('share')
  .controller('authController', authCtrl);

authCtrl.$inject = ['$http', 'authFactory'];

function authCtrl ($http, authFactory){
  var auth = this;

  auth.match = false;
  auth.tryAgain = '';

  auth.register = function(){
    if(auth.registerPassword != auth.confirmPassword){
      console.log('nope no match')
      auth.noPassMatch = true;
      auth.tryAgain = 'Passwords did not match!'
      auth.registerPassword ='';
      auth.confirmPassword = '';
    } else {
      console.log('yup they match')

      authFactory
        .register(auth.registerEmail,auth.registerPassword)
        .then(auth.register.success, auth.register.error);
          // console.log(responseData)
          // if(responseData.data.code ===11000){
          auth.register.error =function(err){
          console.log('email is already registered', err)
          auth.tryAgain = 'This email adress is already registered',
          auth.emailField = true;
        }
        // }else{
        auth.register.success = function(res){
          console.log('Registration successful')
          location.href='/dashboard'
        }
        // })
    }
  }

  auth.login = function(){
    authFactory
      .login(auth.email,auth.password)
      .then(auth.login.success, auth.login.error);
    }

  auth.login.success = function(res){
    console.log('auth.login.success', res.data);
    location.href = '/dashboard'
  }

  auth.login.error = function(err){
    console.log('login.error', err.data)
    auth.loginError = err.data
  }
}
