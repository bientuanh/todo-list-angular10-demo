const { authenticate, isAuthenticated } = require('./jwt-authenticate');
const { databaseFile } = require('./config.json');

//  Create server
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(databaseFile);
const middleWares = jsonServer.defaults();
const port = process.env.PORT || 4000;

// Create database from JSON file
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(databaseFile);
const db = low(adapter);

// Set default middleWares (logger, static, cors and no-cache)
server.use(middleWares);

// Handle POST, PUT and PATCH request
server.use(jsonServer.bodyParser);

// Login in request
server.post('/login', (req, res, next) => {
  setTimeout(() => {
    authenticate(req.body)
      .then(user =>
        user
          ? res.jsonp(user)
          : res
              .status(400)
              .jsonp({ message: 'Email or password is incorrect!' })
      )
      .catch(err => next(err));
  }, 650);
});

// Get user request
server.post('/me', (req, res, next) => {
  setTimeout(() => {
    if (isAuthenticated(req)) {
      setTimeout(() => {
        next();
      }, 500);
    } else {
      res.sendStatus(401);
    }
  }, 650);
});

// Access control
server.use((req, res, next) => {
  const protectedResources = db.get('protected_resources').value();
  if (!protectedResources) {
    setTimeout(() => {
      next();
    }, 500);
    return;
  }

  // https://jsonplaceholder.typicode.com/posts ==> posts
  const resource = req.path.slice(1).split('/')[0];

  // return: [POST, PUT, ...] protected method of posts
  const protectedResource =
    protectedResources[resource] &&
    protectedResources[resource].map(item => item.toUpperCase());

  // Get method of request from client
  const reqMethod = req.method.toUpperCase();

  // If client use method which is protected
  // => we need authenticate
  if (protectedResource && protectedResource.includes(reqMethod)) {
    if (isAuthenticated(req)) {
      setTimeout(() => {
        next();
      }, 500);
    } else {
      res.sendStatus(401);
    }
  } else {
    setTimeout(() => {
      next();
    }, 500);
  }
});

// Setup others routes
server.use(router);

// Start server
server.listen(port, () => {
  console.log('Server is running on port ' + port + ' ...');
});
