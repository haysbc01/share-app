angular.module('share')
  .factory('dashFactory', dashFactory)

dashFactory.$inject = ['$http', 'Upload'];


function dashFactory($http, Upload){

  function getMe (){
    return $http({
      method: 'GET',
      url : '/me'
    })
  };
  function getUploads(data){
    return $http({
      method: 'GET',
      url: '/api/uploads/'+data
    })
  };
  function getEdits(id){
    return $http({
      method: 'GET',
      url: '/api/edits/'+id
    })
  };
  function deleteFile(id, data){
    return $http({
      method: 'POST',
      url: '/api/delete/'+id,
      data: data
    })
  };
  function deleteBlock(id,files){
    return $http({
      method: 'POST',
      url: '/api/deleteBlock/'+id,
      data: files
    })
  };
  function editName(id,files,name){
    return $http({
      method: 'PUT',
      url: '/api/editName/'+id,
      data: {
        files:files,
        name:name
      }
    })
  };
  function addFiles(id,files){
    return Upload.upload({
    // method: 'PUT',
    url: '/api/addFiles/'+id,
    data: {
      files : files,
    }
    })
  }



  return{
    getMe: getMe,
    getUploads: getUploads,
    getEdits: getEdits,
    deleteFile: deleteFile,
    deleteBlock: deleteBlock,
    editName: editName,
    addFiles: addFiles
  }
}
