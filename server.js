// require('colors')
var express     = require('express'),
    morgan      = require('morgan')('dev'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    sockets     = require('socket.io'),
    colors      = require('colors'),
    multiparty  = require('connect-multiparty'),
    fs          = require('fs'),
    shareShit   = require('./controllers/share'),
    cors        = require('cors'),
    PORT        = 4000,
    app         = express();

mongoose.connect('mongodb://localhost/fileShare')

app.use(
  express.static('public'),
  cors({
    origin: 'http://10.125.129.213:8000', // ionic serve url
    optionsSuccessStatus: 200,
    credentials : true
}))

app.get('/', (req, res)=>{
  res.sendFile('index.html', {root : './public/html'});
});

app.get('/api/files/:code', shareShit.get ,function(req,res){
  res.send(`${req.params.code}`)
})

app.get('/download', (req,res)=>{
  var file = fs.readFileSync(req.query.path)
  // res.header('content-Type', 'octet-stream')
  // res.contentType('application/pdf')
  res.send(file)
})



  app.post('/api/files', multiparty(), shareShit.create)


app.listen(PORT, ()=>{
  console.log(`The server is up and running on port ${PORT}`.america)
});
