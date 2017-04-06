var nodemailer  = require ('nodemailer'),
    sgTransport = require ('nodemailer-sendgrid-transport'),
    colors      = require ('colors');

module.exports = {
  email : (req,res)=>{
    // console.log('EMAIL'.yellow, req.body.data.email);
    // console.log(req.files.files.map(function(file){return file.name}).join('\n'))
    var options = {
      auth: {
        api_user: 'file.share',
        api_key: 'AmazingFileShare9'
      }
    };

    var client = nodemailer.createTransport(sgTransport(options));

    var email = {
      from: 'amazing.file.share@gmail.com',
      to: req.body.data.email,
      subject: 'Your Amazingly Awesome Download codes',
      text: 'Hello World' + req.body.data,
      html: '<h1>Thank you for using the Amazing Share App. The download code for files:</h1>'+ req.files.files.map(function(file){return file.name}).join('\n') + '<h1>is</h1>'+ req.body.data.downloadCode
    };

    client.sendMail(email, (err, info)=>{
      if(err){
        return console.log(err);
      }else{
      // console.log('Message was sent', info);
    }
    });
  }
}
