angular.module('share')
  .factory('shareFactory', shareFactory)

shareFactory.$inject = ['$http'];

function shareFactory($http){

  function createFile (shareData){
    return $http({
      method: 'POST',
      url: '/api/files',
      data: shareData
    })
  }
}
