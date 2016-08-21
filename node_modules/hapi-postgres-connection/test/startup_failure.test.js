var test = require('tape');
var Hapi = require('hapi');
require('decache')('../index.js'); // we have to "un-require" the plugin

/************************* TESTS ***************************/
test("server.register plugin fails when DATABASE_URL undefined", function (t) {
  // temporarily set process.env.DATABASE_URL to an Invalid url:
  delete process.env.DATABASE_URL;
  var server1 = new Hapi.Server();
  server1.connection();
  try {  // attempt to boot the server with an invalid DATABASE_URL
    server1.register({ register: require('../index.js') }, function(err) {
      console.log(err); // this error is never reached as the assert is fatal!
    });
  } catch (e) {
    t.ok(e.toString().indexOf('Please set DATABASE_URL') > 1,
      'Please set DATABASE_URL Env Variable');
    t.end();
  }
});
