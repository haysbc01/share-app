angular.module('share')
  .controller('shareController', shareCtrl);

// shareCtrl.$inject = ['Upload'];

function shareCtrl(Upload){
  var share = this;

  // for (var i = 0; i<share.newfiles.length; i++){};

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

  share.submit = function (){
    // console.log(share.newfiles.name)

    Upload.upload({
      url: '/api/fileUpload',
      data:{
        files: share.newfiles,
        data:{
          email: share.email,
          downloadCode: share.downloadCode,
      },
      }
    })
    share.newfiles = '';
    share.email = '';
    share.downloadCode ='';
  }



  // share.uploadFiles = function(){
  //   shareFactory
  //     .createFile(share.newFile)
  //     .then(function(fromServer){
  //       console.log(fromServer);
  //     })
  // };



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
