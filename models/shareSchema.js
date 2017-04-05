var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

var shareSchema = mongoose.Schema({
  email : String,
  files : Array,
  downloadCode : String,
  password: String,
  editCode : String,
  createdBy: String,
  createdAt : {type : Number, default : () => Date.now()},
  deleteDate: Number
});

shareSchema.pre('save', function(next){
  var share = this;

  if(!share.isModified('password')){
    return next ();
  }

  bcrypt.genSalt(10, (saltErr,salt)=>{
    if(saltErr){
      return next(saltErr);
    }

    bcrypt.hash(share.password, salt, (hashErr, hashedPassword)=>{
      if(hashErr){
        return next(hashErr);
      }
      share.password = hashedPassword;
      next();
    })
  })
})


module.exports = mongoose.model('ShareFile', shareSchema);
