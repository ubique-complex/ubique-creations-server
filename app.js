var createError = require('http-errors');
var express = require('express');
const port = process.env.PORT || 3001
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var MailerRouter = require('./routes/Mailer');
var ContactRouter = require('./routes/Contact');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client/build')));
// app.get('*', function (res, req) {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });
var corsOptions = {
  origin: "https://ubique-creations.onrender.com/"
}; // Use this after the variable declaration
app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/send', MailerRouter);
app.use('/contact', ContactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //   // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`pbcreations is listening on port ${port}`)
})

module.exports = app;
