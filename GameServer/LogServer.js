var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var log = express();

// view engine setup
log.set('views', path.join(__dirname, 'views'));
log.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
log.use(logger('dev'));
log.use(bodyParser.json());
log.use(bodyParser.urlencoded({ extended: false }));
log.use(cookieParser());
log.use(express.static(path.join(__dirname, 'public')));

log.use('/', index);
log.use('/users', users);

// catch 404 and forward to error handler
log.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
log.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = log;