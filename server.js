// require('colors')
var express     = require('express'),
    morgan      = require('morgan')('dev'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    sockets     = require('socket.io'),
    colors      = require('colors'),
    multiparty  = require('connect-multiparty'),
    fs          = require('fs'),
    PORT        = 4000,
    app         = express();

app.use(
  express.static('public')
);

app.get('/', (req, res)=>{
  res.sendFile('index.html', {root : './public/html'});
});

app.post('/api/fileUpload', multiparty(),(req,res)=>{
  // console.log(req.files.files)
  req.files.files.forEach(function(file){
    var name = `./public/img/Block-${Date.now()}-${file.name}`
    // var fileObj ={
    //   email:req.body.data.email,
    //   downloadCode: req.body.data.downloadCode,
    //   path: name
    // }
    // console.log(file)



    return fs.readFile(file.path, (err, data) =>{
      // console.log('READ', data, name);
      fs.writeFile(`${name}`, data, (err) =>{
        console.log('WRITE', err, name)
        // file.url = `${req.protocol}`
      })
      })
    })
  })


app.listen(PORT, ()=>{
  console.log(`The server is up and running on port ${PORT}`.america)
});
