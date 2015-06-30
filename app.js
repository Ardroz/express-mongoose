/*jslint node: true, indent: 2,nomen:true */
'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', users);

// catch 404 and forward to error handler
/*jslint unparam: true */
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/*jslint unparam: false */

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  /*jslint unparam: true */
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
  /*jslint unparam: false */
}

// production error handler
// no stacktraces leaked to user
/*jslint unparam: true */
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});
/*jslint unparam: false */

module.exports = app;
