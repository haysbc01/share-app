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
        console.log(responseData)
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
