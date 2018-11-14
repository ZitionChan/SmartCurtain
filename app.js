var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var MySQLStore = require('express-mysql-session')(session);
var pool = require('./dao/connection');

var indexRouter = require('./routes/index');
var controlRouter = require('./routes/control');
var usersRouter = require('./routes/login');
var opRouter = require('./routes/op');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy',1);

var sessionStore = new MySQLStore({},pool);
app.use(session({
    key:'session_cookie',
    secret:"session_secret",
    cookie: {maxAge:1000000},
    resave:false,
    saveUninitialized:false,
    store:sessionStore

}));

app.use('/', indexRouter);
app.use('/control',controlRouter);
app.use('/login', usersRouter);
app.use('/op',opRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
