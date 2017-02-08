var aws = require('aws-sdk');

exports.handler = function (event, context, callback) {
	console.log(event);
	console.log('- - - - - - - - - - ');
	console.log(context);
	callback(null, 'done');
}