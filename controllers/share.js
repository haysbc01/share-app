var Share = require('../models/shareSchema.js'),
    fs    = require('fs');

module.exports = {
  create : (req, res) =>{
    console.log('POST - api/files - create'.blue, req.body);

    var fileObjs = req.files.files.map(function(file){
        var path = `./public/img/Block-${Date.now()}-${file.name}`

        var data = fs.readFileSync(file.path)
        fs.writeFileSync(`${path}`, data)

        return {
          name : file.name,
          path : path,
          // thumb :,
          //type : file.type???
        }
      });
    req.body.data.createdAt = Date.now(),
    req.body.data.editCode = Math.floor(Math.random()*1000000);

    req.body.data.files = fileObjs;

    (new Share(req.body.data)).save((err,doc)=>{
      if(err){
        return res.send(err);
      }res.send(doc);
    })
  },

  get : (req,res) =>{
    console.log('GET - api/files - get'.blue, req.body);

      Share.findOne({downloadCode: req.params.code}, function(err,foundFile){
        if(err){
          console.log(err);
        } else {
          res.send(foundFile)
        }
      })
    console.log(req.body)
  },

  check : (req,res) =>{
    Share.findOne({checkCode: req.params.code}, function(err,foundFile){
      if(err){
        console.log(err);
      } else {
        res.send(foundFile)
      }
    })
    console.log(req.body)
  }
}
