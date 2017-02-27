var aws = require('aws-sdk');
require('env2')('.env');
var send = require('./lib/send');

exports.handler = function (event, context, callback) {
	console.log(event);
	console.log('- - - - - - - - - - ');
	console.log(context);
	console.log('- - - - - - - - - - ');
	// console.log(process.env);
	send(function(err, data) {
		// console.log(err, data);
		callback(err, data);
	});
}
