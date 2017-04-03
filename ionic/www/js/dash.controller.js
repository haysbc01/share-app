angular.module('starter')
  .controller('dashController', dashCtrl);

dashCtrl.$inject = ['$http', 'dashFactory', '$scope'];

function dashCtrl ($http, dashFactory, $scope){
  var dash = this;
  dash.greeting = 'Hello again';
  $scope.$on('$ionicView.enter', () => {
    console.log(localStorage.getItem('user'));
       dash.data = JSON.parse(localStorage.getItem('user'));
       if(dash.data){

         dash.loadUploads(dash.data._id)
       }

    });

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
  // dash.load()
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
