angular.module('starter')
  .factory('authFactory', authFactory)

authFactory.$inject = ['$http'];


function authFactory($http){

  function register(email,password){
    return $http({
      method: 'POST',
      url: 'http://10.25.15.25:4000/register',
      data:{
        email:email,
        password:password
      }
    })
  }

  function login(email,password){
    return $http({
      method: 'POST',
      url: 'http://10.25.15.25:4000/login',
      data:{
        email:email,
        password:password
      }
    })
  }

  return{
    register: register,
    login: login
  }
}
