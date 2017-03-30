angular.module('share')
  .controller('shareController', shareCtrl);

shareCtrl.$inject = ['Upload', 'shareFactory', 'dashFactory'];

function shareCtrl(Upload, shareFactory, dashFactory){
  var share = this;
  share.data = ''
  share.checkCode = false;
  share.userCodePlaceHolder = 'Enter a Download Code'

  share.submit = function (){
    shareFactory
      .checkCode(share.downloadCode)
      .then(function(responseData){
        console.log(share.downloadCode)
        if(responseData.data.downloadCode){
          console.log('Code is already being used')
          share.downloadCode = 'This code already exists';
          share.checkCode = true;
        }else{

        dashFactory
          .getMe()
          .then(function(responseData){
            share.data = responseData.data._id;
            share.submitP2(share.data);
          })

      }

  });
};
  share.submitP2 = function(shareWho){
    console.log('share.who', shareWho)
    shareFactory

      .createFile(share.newfiles,{
        email:share.email,
        downloadCode:share.downloadCode,
        createdBy:shareWho
      })
      .then(function(fromServer){
        console.log(fromServer);
      })
      share.newfiles = '';
      share.email = '';
      share.downloadCode ='';
      share.checkCode = false;
    }


  share.download = function(){
    console.log(share.userCode)

    shareFactory
      .getDownload(share.userCode)
      .then(function(responseData){

        share.dataFiles = responseData.data
        // console.log(responseData.data.files.length)
        if(responseData.data.files){
          share.dataFiles = responseData.data
          // share.noDice = ''
          share.noCode = false;
          share.userCodePlaceHolder = 'Enter a Download Code'
        }else{
        // share.noDice = 'That is not a valid downloadCode'
        share.noCode = true;
        share.userCodePlaceHolder = 'That is not valid download code'
        }
        console.log(responseData.data.length)
      })
      share.userCode = ''
  }
};
