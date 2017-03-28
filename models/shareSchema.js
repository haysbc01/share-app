var mongoose = require('mongoose');

var shareSchema = mongoose.schema({
  email = String,
  files = [String],
  path = String,
  downloadCode = String,
  editCode = String,
  createdAt : {type : Number, default : () => Date.now()};
});

module.exports = mongoose.model('ShareFile', shareSchema);
