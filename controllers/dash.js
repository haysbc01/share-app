// var Dash    = require('../models/dashSchema.js'),
var Share = require('../models/shareSchema.js'),
    colors  = require('colors');

module.exports = {
  get : (req,res) =>{
    console.log('GET - api/uploads - get'.blue, req.body);

      Share.find({createdBy: req.params.data}, function(err,foundFiles){
        if(err){
          console.log(err);
        } else {
          res.send(foundFiles)
        }
      })
    console.log(req.body)
  },
}
