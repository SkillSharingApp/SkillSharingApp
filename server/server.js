const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  console.error(err);
  res.status(err.status || 500).send(res.locals.message);
});

app.listen('3000', err => {
  console.log('server error:', err || 'server listening on port ' + '3000');
});
