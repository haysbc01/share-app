// var Dash    = require('../models/dashSchema.js'),
var Share = require('../models/shareSchema.js'),
    fs    = require('fs');
    colors  = require('colors');

module.exports = {
  get : (req,res) =>{
      Share.find({createdBy: req.params.data}, (err,foundFiles)=>{
        if(err){
          console.log(err);
        } else {
          res.send(foundFiles)
        }
      })
    console.log(req.body)
  },

  getEdits : (req,res) =>{

    Share.findOne({_id: (req.params.id)}, (err,foundFile)=>{
      if(err){
        console.log(err);
      }else {
        res.send(foundFile)
      }
    })
  console.log(req.body)
},

deleteFiles : (req,res)=>{
  console.log(req.params.id)
  Share.findOne({_id: (req.params.id)}, (err,deleteFile)=>{
    // fs.unlinkSync(req.body.path)

    for(var i = 0; i<deleteFile.files.length; i++){
      if(deleteFile.files[i].path === req.body.path){
        now(i)
        // console.log('I equals',ind)
      }
    }
    function now(i){
    fs.unlinkSync(req.body.path)
    deleteFile.files.splice(i, 1);
    deleteFile.markModified('files');
    deleteFile.save()
  }
  res.send(deleteFile)
})
},

deleteBlock : (req,res)=>{
  Share.findOne({_id: (req.params.id)}, (err,files)=>{
    console.log(err, files);
    for (var i=0;i<files.files.length;i++){
      fs.unlinkSync(files.files[i].path);
    }
    Share.remove({_id: (req.params.id)}, (err,fuck)=>{
      res.send('fuck')
    });
  })
},

edit : (req,res)=>{
  Share.findOne({_id: (req.params.id)}, (err,files)=>{
    for(var i=0;i<files.files.length;i++){
      if(files.files[i].name ===req.body.files.name){
        files.files[i].name = req.body.name
      }
    }
    files.markModified('files');
    files.save();
    res.send('54');

  })
},

add : (req,res)=>{
  // console.log(req.files);
  Share.findOne({_id: (req.params.id)}, (err,files)=>{
    console.log('req.files.files'.yellow,req.files)

    if(req.files.files.length){
      for(var key in req.files.files){
        console.log(req.files.files[key])
        var file = req.files.files[key];
        var path = `./public/img/Block-${Date.now()}-${file.name}`;
        var fileType = file.name.toLowerCase().slice((file.name.lastIndexOf('.'))+1,file.name.length);
        var fileTypePath = `./docIMG/${fileType}.png`
        var data = fs.readFileSync(file.path)
        fs.writeFileSync(`${path}`, data);

        files.files.push({
          name : file.name,
          fileType : fileType,
          fileTypePath : fileTypePath,
          path : path,
        })
      }
  }
  else{ // one file
    var file = req.files.files
    var path = `./public/img/Block-${Date.now()}-${file.name}`;
    var fileType = file.name.toLowerCase().slice((file.name.lastIndexOf('.'))+1,file.name.length);
    var fileTypePath = `./docIMG/${fileType}.png`;
    var data = fs.readFileSync(file.path);
    fs.writeFileSync(`${path}`, data);

    files.files.push({
      name : file.name,
      fileType : fileType,
      fileTypePath : fileTypePath,
      path : path,
    })
  }

files.markModified('files');
files.save();
res.send('yeah');

})
}
}
