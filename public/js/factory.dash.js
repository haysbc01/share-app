angular.module('share')
  .factory('dashFactory', dashFactory)

dashFactory.$inject = ['$http'];


function dashFactory($http){

  function getMe (){
    return $http({
      method: 'GET',
      url : '/me'
    })
  }
  function getUploads(data){
    return $http({
      method: 'GET',
      url: '/api/uploads/'+data
    })
  }

  return{
    getMe: getMe,
    getUploads: getUploads
  }
}
