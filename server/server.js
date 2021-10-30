const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
//const cookieparser = require("cookieparser");
//const pool = require('.../Model/dbModel');
const {skills} = require('./fakeData');




//route imports 
const userRouter = require('./routes/userRoute');
const skillRouter = require('./routes/skillsRoute');
const messageRouter = require('./routes/messagesRoute');
const sessionRouter = require('./routes/sessionRoute');
const classRouter = require('./routes/classRouter')

app.use(cors());
app.use(express.json());
//app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));


//routes
app.use(express.static('public'));
app.use('/', userRouter);
app.use('/skills', skillRouter);
app.use('/messages', messageRouter);
app.use('/session', sessionRouter);
app.use('/classes',classRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Global error Handler
app.use(function (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error.',
    status: 400,
    message: { err: 'An unknown error occurred.' },
  };
  Object.assign(defaultErr, err);
  //console.log(defaultErr.log);
  return res.status(defaultErr.status).json(defaultErr.message);
});

//listening on 3000:)
app.listen(process.env.PORT || '3000', err => {
  console.log(
    'server error:',
    err || 'server listening on port ' + '3000',
  );
});
