var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var todoRouter = require('./routes/todomodel');
const { default: mongoose } = require('mongoose');

var app = express();
app.use(
  session({
    secret: 'session_secret_key',
    resave: true,
    saveUnitialized: true,
    cookie: {
      secure: false,
    },
  })
);
//defining a connection string to connect to the mongodb
/*let mongoConnUrl = 'mongodb://localhost/westsidenode';
//connecting the mongodb
mongoose.connect(mongoConnUrl, { useNewUrlParser: 'true' });
//we are getting the connection pointer
let db = mongoose.connection;
//now adding error event and it will run if there is any error in connecting to mongodb
db.on('error', function (error) {
  console.log('unable to connect to the mondodb');
  console.log(error);
});
//adding open event and responding in the callback function if connection is successful
db.on('open', function (error) {
  console.log('we are connected to the mongodb server via mongoose');
});*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/todomodel', todoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
