var mongoose = require('mongoose');

var shareSchema = mongoose.Schema({
  email : String,
  files : Array,
  path : Array,
  downloadCode : String,
  editCode : String,
  createdAt : {type : Number, default : () => Date.now()},
  deleteDate: Number
});

module.exports = mongoose.model('ShareFile', shareSchema);
