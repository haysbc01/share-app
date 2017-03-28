angular.module('share')
  .factory('shareFactory', shareFactory)

shareFactory.$inject = ['$http', 'Upload'];


function shareFactory($http, Upload){

  function checkCode(checkCode){
    return $http({
      method: 'GET',
      url : '/api/files/'+checkCode
    })
  }

  function createFile (files, data){
    return Upload.upload({
      // method: 'POST',
      url: '/api/files',
      data: {
        files: files,
        data: data
    }
  })

}

function getDownload (downloadCode){
  return $http({
    method: 'GET',
    url : '/api/files/'+downloadCode
  })
}

return{
  createFile : createFile,
  getDownload : getDownload,
  checkCode : checkCode
}
}
