// Hapi is class
var Hapi = require('hapi');

// Instantiate
var server = new Hapi.Server();

// Configure server connections / host
server.connection({
  host: '0.0.0.0',
  port: 3000,
  routes: {
    cors: {
      headers: ["Access-Control-Allow-Credentials"],
      credentials: true
    }
  }
});

// Any other dependencies
var plugins = [
  // Require MongoDB
  {
    register: require('hapi-mongodb'),
    options: {
      url: 'mongodb://127.0.0.1:27017/hapi-twitter',
      settings: {
        db: {
          native_parser: false
        }
      }
    }
  }
];

// Start server
server.register(plugins, function(err){
  // check error
  if (err) {
    throw err;
  }

  // start server
  server.start(function(){
    console.log('info', 'Server running at: ' + server.info.uri);
  });
});