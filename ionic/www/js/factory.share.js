angular.module('starter')
  .factory('shareFactory', shareFactory)

shareFactory.$inject = ['$http', 'Upload'];

function shareFactory($http, Upload){

function checkCode(checkCode){
  return $http({
    method: 'GET',
    url : 'http://10.25.15.25:4000/files/'+checkCode
  })
}

function createFile (files, data){
  return Upload.upload({
    // method: 'POST',
    url: 'http://10.25.15.25:4000/api/files',
    data: {
      files: files,
      data: data
    }
  })
}

function getDownload (downloadCode){
  return $http({
    method: 'GET',
    url : 'http://10.25.15.25:4000/api/files/'+downloadCode
  })
}

return{
  createFile : createFile,
  getDownload : getDownload,
  checkCode : checkCode
}
}
