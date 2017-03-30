angular.module('share')
  .controller('shareController', shareCtrl);

shareCtrl.$inject = ['Upload', 'shareFactory'];

function shareCtrl(Upload, shareFactory){
  var share = this;
  share.checkCode = false;

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

        shareFactory
          .createFile(share.newfiles,{
            email:share.email,
            downloadCode:share.downloadCode
          })
          .then(function(fromServer){
            console.log(fromServer);
          })
          share.newfiles = '';
          share.email = '';
          share.downloadCode ='';
          share.checkCode = false;
        }
      })
  };

  share.download = function(){
    console.log(share.userCode)

    shareFactory
      .getDownload(share.userCode)
      .then(function(responseData){

        share.dataFiles = responseData.data
        // console.log(responseData.data.files.length)
        if(responseData.data.files){
          share.dataFiles = responseData.data
          share.noDice = ''
        }else{
        share.noDice = 'That is not a valid downloadCode'
        }
        console.log(responseData.data.length)
      })
      share.userCode = ''
  }



};








// share.newFile = {
//   email: '',
//   files: [{
//     name:''
//   }],
//   password:'',
//   path: '',
//   createdAt: Date.now(),
//   downloadCode:'',
//   editCode: '',
//
// }
