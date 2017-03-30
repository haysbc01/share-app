var Auth    = require('../models/authSchema.js'),
    bcrypt  = require('bcryptjs');
    colors  = require('colors');

module.exports = {
  registerUser : (req,res)=>{
    console.log('Registering User'.blue, req.body);

    var newUser = new Auth(req.body);
    newUser.save(function(err,user){
      if(err){
        console.log('Could not save user'.blue, err);
        res.status(403).send(err)
      }else{
        console.log('New user created in MongoDB'.blue, user);
        req.session.uid = user._id;
        res.send('Register Successful')
      }
    })
  },

  loginUser : (req,res)=>{
    console.log('loging in'.blue, req.body);

    Auth.findOne({email:req.body.email}, function(err,user){
      if(err){
        console.log('MongoDB error'.blue, err);

      }else if(!user){
        console.log('No User found!');
        res.status(403).send('User not found!');
      }else {
        console.log('auth.login.user'.blue, user);

        bcrypt.compare(req.body.password, user.password, function(bcryptErr, matched){

          if(bcryptErr){
            console.error('MongoDB error'.red, bcryptErr);
            res.status(500).send('mongodb error');
          } else if(!matched){
            console.warn('Password did not match!');
            res.status(403).send('Incorrect Password!');
          }
          else {
            req.session.uid = user._id;
            console.log('login success'.yellow)
            res.send('login success')
          }
        });

      }
    });
  },

  me: function (req,res){Auth.findOne({_id : req.session.uid}, function(err, user){
    res.send(user)
  })
}
}
