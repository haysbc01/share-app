var Share = require('../models/shareSchema.js'),
    bcrypt  = require('bcryptjs');
    fs    = require('fs');

module.exports = {
  create : (req, res, next) =>{
    // console.log('POST - api/files - create'.blue, req.files, req.body.data.password);
    // console.log(req.body.data);

    if(!req.body.data.password){
      delete req.body.data.password
    }

    var fileObjs = [];
    for(var key in req.files.files){
      var file = req.files.files[key];
      // var fileName = file.name;
      var path = `./public/img/Block-${Date.now()}-${file.name}`;
      // console.log(file);
      var fileType = file.name.slice((file.name.lastIndexOf('.'))+1,file.name.length);
      var fileTypePath = `./docIMG/${fileType}.png`
      var data = fs.readFileSync(file.path)
      fs.writeFileSync(`${path}`, data);

      fileObjs.push({
        name : file.name,
        fileType : fileType,
        fileTypePath : fileTypePath,
        path : path,

        // thumb :,
        //type : file.type???
      })
    }



    // var fileObjs = [].map.call(req.files.files, function(file){
        // console.log('======================')
        // console.log(file)
    //     var path = `./public/img/Block-${Date.now()}-${file.name}`
    //
    //     var data = fs.readFileSync(file.path)
    //     fs.writeFileSync(`${path}`, data)
    //
    //     return {
    //       name : file.name,
    //       path : path,
    //       // thumb :,
    //       //type : file.type???
    //     }
    //   });
    req.body.data.createdAt = Date.now(),
    // req.body.data.editCode = Math.floor(Math.random()*1000000);
    // req.body.data.createdBy =
    req.body.data.files = fileObjs;

    (new Share(req.body.data)).save((err,doc)=>{
      if(err){
        return res.send(err);
      }res.send(doc);
      // next();
    })
  },

  get : (req,res) =>{
      Share.findOne({downloadCode: req.params.code}, function(err,foundFile){
        if(err){
          console.log(err);
        } else {
          res.send(foundFile)
        }
      })
  },

  downloadWithPass : (req,res) =>{
    Share.findOne({downloadCode: req.body.code}, function(err,foundFile){
      if(err){
        console.log(err);
      } else {
        bcrypt.compare(req.body.password, foundFile.password, function(bcryptErr, matched){
          if(bcryptErr){
            res.status(500).send('mongodb error');
          } else if(!matched){
            res.status(403).send('Incorrect Password');
          } else {
            res.send(foundFile)
          }
        })

      }
    })
  },




  check : (req,res) =>{
    Share.findOne({checkCode: req.params.code}, function(err,foundFile){
      if(err){
        console.log(err);
      } else {
        res.send(foundFile)
      }
    })
  }
}
