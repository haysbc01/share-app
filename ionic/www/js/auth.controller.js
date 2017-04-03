angular.module('starter')
  .controller('authController', authCtrl);

authCtrl.$inject = ['$http', 'authFactory','$state'];

function authCtrl ($http, authFactory, $state){
  var auth = this;

  auth.match = false;

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
        .then(function(res){
          localStorage.setItem('user', JSON.stringify(res.data));
          console.log(res);
        });

        }
        auth.user = JSON.parse(localStorage.getItem('user'))
        $state.go('tab.dash');
  }

  auth.login = function(){
    authFactory
      .login(auth.email,auth.password)
      .then((responseData)=>{
        console.log(responseData)
        if(responseData.data._id){
          localStorage.setItem('user', JSON.stringify(responseData.data))
          $state.go('tab.dash');
        }else{
          console.log('something')
        }
      });
    }

  // auth.login.success = function(res){
  //   console.log('auth.login.success', res.data);
  //   // location.href = '/dashboard'
  // }
  //
  // auth.login.error = function(err){
  //   console.log('login.error', err.data)
  //   auth.loginError = err.data
  // }
}
