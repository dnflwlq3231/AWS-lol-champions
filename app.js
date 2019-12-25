const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const logger = require('morgan');

app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    // Pass to next layer of middleware
    next();
});

//use cors 
app.use(cors());

//router
const indexRouter = require('./routes/index')
const port = 3000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

//view path
app.set('views', __dirname + '/public/views');

// set engine ejs
app.set('veiw engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set default path public 
app.use(express.static(__dirname + '/public' ));

app.use('/', indexRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))