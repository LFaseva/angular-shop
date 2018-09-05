var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
const methodOverride = require('method-override');

var apiUser= require('./routes/apiUser');
var apiProducts= require('./routes/apiProducts');

var app = express();

// app.use(passport.initialize());
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
// app.use(bodyParser.urlencoded({ 'extended': 'false' }));
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/apiUser', apiUser);
app.use('/apiProducts', apiProducts);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;


