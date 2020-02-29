require("env2")(".env");
const debug = require("./lib/debug.js");
const send = require("./lib/send.js");

exports.handler = function handler (event, context, callback) {
  debug(event);
  if (event.email) { // event contains an email (address), so send!
  	return send(event, callback);
  }
  else {
    return callback(null, event)
  }

}
