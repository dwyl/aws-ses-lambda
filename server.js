// Start the app from your command line with: node examples/hellohapi.js
// then visit: http://localhost:8000 in your browser

var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({
	host: '0.0.0.0',
	port: Number(process.env.PORT || 8000)
});

server.register({ // register all your plugins
  register: require('hapi-postgres-connection') // no options required
}, function (err) {
  if (err) {
    // handle plugin startup error
  }
});

server.route({
	method: 'GET',
	path: '/bounce',
	handler: function(request, reply) {

const insert = `
INSERT INTO bounces (email)
VALUES ( $1 );
`
const email = 'rory@bouncy.bounce';

    request.pg.client.query(insert, [email], function(err, result) {
    console.log(err, result);
    return reply(email);
    });
	}
});

server.start(function(){ // boots your server
	console.log('Now Visit: http://localhost:'+server.info.port);
});
