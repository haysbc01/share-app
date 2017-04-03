angular.module('share')
  .controller('dashController', dashCtrl);

dashCtrl.$inject = ['$http', 'dashFactory'];

function dashCtrl ($http, dashFactory){
  var dash = this;
  dash.greeting = 'Hello again'

  dash.load = function(){
    dashFactory
      .getMe()
      .then(function(responseData){
        dash.data = responseData.data
        dash.loadUploads(dash.data._id)
      })
  }

  dash.loadUploads = function(data){
    dashFactory
      .getUploads(data)
      .then(function(responseData){
        dash.files = responseData.data;
      })
  }


  dash.edit = function(id){
    dashFactory
      .getEdits(id)
      .then(function(responseData){
        dash.editFiles = responseData.data;
        dash.load()
        // dash.editModal = true;
      })
  }

  dash.delete = function(id, data){
    dashFactory
      .deleteFile(id, data)
      .then(dash.load)
  }

  dash.deleteBlock = function(id, files){
    dashFactory
      .deleteBlock(id,files)
      .then(dash.load)
  }

  dash.editName = function(id,files,name){
    dashFactory
      .editName(id,files,name)
      .then(dash.load)
  }

  dash.addToBlock = function(block,files){
    console.log(files)
    dashFactory
      .addFiles(block,files)
      .then(dash.load)
  }





  dash.load()
}



  // shareFactory
  //   .getDownload(share.userCode)
  //   .then(function(responseData){
  //
  //     share.dataFiles = responseData.data
  //     // console.log(responseData.data.files.length)
  //     if(responseData.data.files){
  //       share.dataFiles = responseData.data
  //       // share.noDice = ''
  //       share.noCode = false;
  //       share.userCodePlaceHolder = 'Enter a Download Code'
  //     }else{
  //     // share.noDice = 'That is not a valid downloadCode'
  //     share.noCode = true;
  //     share.userCodePlaceHolder = 'That is not valid download code'
  //     }
  //     console.log(responseData.data.length)
  //   })
  //   share.userCode = ''
