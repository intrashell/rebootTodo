'use strict';

const express      = require('express'),
      favicon      = require('serve-favicon'),
      logger       = require('morgan'),
      babel        = require('babel-core'),
      mongoose     = require('mongoose'),
      todoModel    = require('./modules/todoModel'),
      bodyParser   = require('body-parser'),
      todos        = require('./routes/todos').router,
      router       = express.Router(),
      api          = require('./routes/api').router,
      routes       = require('./routes/routes'),
      // fresh        = require('./routes/fresh'),
      js           = require('./routes/scripts'),
      config       = require('./bin/config'),
      app          = express();


// Set up Pug compilation.
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// ***** Need to create a favicon. ***** //
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

app.use('/todos', api);
app.use('/', todos);
app.use('/about', routes);
app.use('/scripts', js);

/**************************************
 *  Start Dynamic Paramater Routing   *
 **************************************/

// router param method.
// forth paramater to be passed is the dynamic variable being used.
router.param('route', (req, res, next, route) => {
    route = require('./routes/'+route); // A string catenation for the path.
    next(route);  // Passing the new variable as an argument.
});


/*route.get('/:route/', (req, res, next, route) => {  //  The new argument can b e called here.
    res.json({"test": route.test}); // Test was the function I passed.  I am passing it as JSON.
});

***************************************
*         Contents of test.js         *
***************************************

var test = 'this is a test 1';
module.exports = test;

/**************************************
 *   End Dynamic Paramater Routing    *
 **************************************/

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// Commented out until we understand them.

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
