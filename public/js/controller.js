angular.module('share')
  .controller('shareController', shareCtrl);

shareCtrl.$inject = ['Upload', 'shareFactory', 'dashFactory'];

function shareCtrl(Upload, shareFactory, dashFactory){
  var share = this;
  share.data = '';
  share.checkCode = false;
  share.userCodePlaceHolder = 'Enter a Download Code';
  share.size = 0;
  share.big = false;
  share.email ='';
  share.insertDownloadCode = 'Download Code';
  share.passwordPlaceholder = 'Password';
  share.download = false;
  share.password = ''

  share.submit = function (){
    var array = share.newfiles.map(function(file){return file.size})
    var size = 0;
    for (var i = 0; i<array.length;i++){
    size += array[i]
    }
    if (size > share.size){
      share.big = true

    } else{
    }
    shareFactory
      .checkCode(share.downloadCode)
      .then(function(responseData){
        if(responseData.data.downloadCode){
          share.insertDownloadCode = 'This code already exists';
          share.downloadCode = ''
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
    shareFactory
      .createFile(share.newfiles,{
        email:share.email,
        downloadCode:share.downloadCode,
        password: share.password,
        createdBy: shareWho,
      })
      .then(function(responseData){
        dashFactory.getMe()
      })
      share.newfiles = '';
      share.email = '';
      share.downloadCode ='';
      share.checkCode = false;
      share.upload = false;
      share.showPassword = false;
      share.checkPass = false;
      share.password = '';
    }


  share.downloadFiles = function(){
    share.dataFiles = '';

    shareFactory
      .getDownload(share.userCode)
      .then(function(responseData){
        // share.dataFiles = responseData.data
        // console.log(responseData.data)
        if(responseData.data.password){
          // share.userCode = responseData.downloadCode
          // console.log('there is a password')
          share.downloadPassword = true;
        } else{


        if(responseData.data.files){

          share.dataFiles = responseData.data;
          // share.noDice = ''
          share.noCode = false;
          share.userCodePlaceHolder = 'Enter a Download Code'
        }else{
        // share.noDice = 'That is not a valid downloadCode'
        share.noCode = true;
        share.userCodePlaceHolder = 'That is not valid download code'
        }
      }
    })
  }

  share.downloadWithPass = function(){
    shareFactory
      .downloadWithPass(share.userCode,share.downloadPass)
      .then(share.downloadWithPass.success, share.downloadWithPass.error)
    }

  share.downloadWithPass.success = function(res){
    share.dataFiles = res.data;
    share.noCode = false;
    share.userCodePlaceHolder = 'Enter a Download Code'
    share.downloadPassword = false;
    share.downloadPass = '';

  }

  share.downloadWithPass.error = function(res){
    share.noDice = res.data
    share.passwordPlaceholder = res.data
  }

  share.load = function(){
    dashFactory
      .getMe()
      .then(function(responseData){
        share.data = responseData.data

        if(share.data){
          share.size = 524288000;
          share.email = share.data.email;
        } else {
          share.size = 104857600;
        }
      })
  }

  share.exit = function(){
    share.downloadPass='';
    share.download = false;
    share.userCode = '';
    share.downloadPassword = false;
    share.dataFiles = '';
    share.newfiles = '';
    share.email = '';
    share.downloadCode = '';
    share.password = '';
    share.upload = false;
    share.showPassword = false;
    share.checkPass = false;
  }
  share.load()
};
