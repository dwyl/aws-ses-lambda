require("env2")(".env");
const debug = require("./lib/debug.js");
const send = require("./lib/send.js");
const parse = require('./lib/parse.js');
const http_request = require('./lib/http_request');

exports.handler = function handler (event, context, callback) {
  debug(event);

  if (event.email) { // event contains an email (address)
  	return send(event, callback); // send the email
  }
  else {
    const json = parse(event); // parse sns event
    return http_request(json, callback); // POST parsed data to Email App
  }
}
