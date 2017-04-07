// require('colors')
var express         = require('express'),
    morgan          = require('morgan')('dev'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    sockets         = require('socket.io'),
    colors          = require('colors'),
    multiparty      = require('connect-multiparty'),
    fs              = require('fs'),
    shareShit       = require('./controllers/share'),
    authShit        = require('./controllers/auth'),
    dashShit        = require('./controllers/dash'),
    emailShit       = require('./controllers/email'),
    cors            = require('cors'),
    clientSessions  = require('client-sessions'),
    PORT            = 80,
    app             = express();

mongoose.connect('mongodb://localhost/fileShare')

var sessionsMiddleware = clientSessions({
  cookieName: 'auth-cookie',  // front-end cookie name
      secret: 'BESTEVERSHAREAPP',        // the encryption password : keep this safe
      requestKey: 'session',    // req.session,
      duration: (86400 * 1000) * 7, // one week in milliseconds
      cookie: {
          ephemeral: false,     // when true, cookie expires when browser is closed
          httpOnly: true,       // when true, the cookie is not accessible via front-end JavaScript
          secure: false         // when true, cookie will only be read when sent over HTTPS
      }
})

var checkIfLoggedIn = function (req, res, next) {
    if (req.session.uid) {
        console.info('User is logged in, proceeding to dashboard...'.green);
        next();
    } else {
        console.warn('User is not logged in!'.yellow)
        res.redirect('/');
    }
  }

app.use(
  express.static('public'),
  (sessionsMiddleware),
  bodyParser.json(),
  cors({
    origin: 'http://10.25.15.25:8100', // ionic serve url
    optionsSuccessStatus: 200,
    credentials : true
}));

app.get('/', (req, res)=>{
  res.sendFile('index.html', {root : './public/html'});
});

// app.get('/auth', (req, res)=>{
//   res.sendFile('auth.html', {root : './public/html'})
// });

app.get('/dashboard',checkIfLoggedIn, (req,res)=>{
  res.sendFile('dashboard.html', {root : './public/html'})
  // res.send('go home')
});

app.get('/api/files/:code', shareShit.get ,(req,res)=>{
  res.send(`${req.params.code}`)
});

app.get('/api/edits/:id', dashShit.getEdits, (req,res)=>{
  res.send(`${req.params.id}`)
});

app.get('/download', (req,res)=>{
  var file = fs.readFileSync(req.query.path)
  // res.header('content-Type', 'octet-stream')
  // res.contentType('application/pdf')
  res.send(file)
});

app.get('/api/uploads/:data', dashShit.get, (req,res)=>{
  res.send(req.params.data)
})

app.get('/logout', (req,res)=>{
  req.session.reset();
  res.redirect('/');
});

app.get('/me', authShit.me);
app.post('/register', authShit.registerUser);
app.post('/login', authShit.loginUser);
app.post('/api/files', multiparty(), shareShit.create, emailShit.email);
app.post('/api/delete/:id', dashShit.deleteFiles);
app.post('/api/deleteBlock/:id', dashShit.deleteBlock);
app.put('/api/editName/:id', dashShit.edit);
app.post('/api/addFiles/:id', multiparty(), dashShit.add);
app.post('/downloadWithPass', shareShit.downloadWithPass);



app.listen(PORT, ()=>{
  console.log(`The server is up and running on port ${PORT}`.america)
});
