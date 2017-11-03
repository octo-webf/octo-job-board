const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

const index = require('./src/features/api/index');
const jobs = require('./src/features/api/jobs');
const interests = require('./src/features/api/interests');
const auth = require('./src/features/api/auth');
const certificate = require('./src/features/api/certificate');
const feedbacks = require('./src/features/api/feedbacks');
const subscriptions = require('./src/features/api/subscriptions');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// enable cors
app.use(cors());

// static resources
// FIXME manage better environment variables
if ('test' !== process.env.NODE_ENV) {
  // Don't redirect if the hostname is `localhost:port`
  app.use(redirectToHTTPS([/localhost:(\d{4})/]));

  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
}

app.use('/', index);
app.use('/api/feedbacks', feedbacks);
app.use('/api/jobs', jobs);
app.use('/api/interests', interests);
app.use('/api/subscriptions', subscriptions);
app.use('/auth', auth);
app.use('/.well-known/acme-challenge/:content', certificate);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
