angular.module('starter')
  .factory('dashFactory', dashFactory)

dashFactory.$inject = ['$http'];


function dashFactory($http){

  function getMe (){
    return $http({
      method: 'GET',
      url : 'http://10.25.15.25:4000/me'
    })
  };
  function getUploads(data){
    return $http({
      method: 'GET',
      url: 'http://10.25.15.25:4000/api/uploads/'+data
    })
  };

  return{
    getMe: getMe,
    getUploads: getUploads
  }
}
