const env = require('env2')('.env');
const send = require('./lib/send.js');

exports.handler = function (event, context, callback) {
  if (event.email) {
  	return send(event, callback);
  }
  else {
    return callback(null, event)
  }

}
