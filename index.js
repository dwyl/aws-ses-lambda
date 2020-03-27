require("env2")(".env");
const debug = require("./lib/debug.js");
const send = require("./lib/send.js");
const parse = require('./lib/parse.js');
const http_request = require('./lib/http_request');

exports.handler = function handler (event, context, callback) {
  debug(event);

  if (event.ping) { // prime lambda: github.com/dwyl/aws-ses-lambda/issues/17
    return callback(null, event);
  }
  else if (event.email) { // event contains an email (address)
  	send(event, function send_cb (error, data) { // send the email
      const json = {...event, ...parse(data)};
      http_request(json, function http_cb (_status, response) { // save to API
        const merged = {...json, ...response};
        return callback(error, merged);
      });
    });
  }
  else {
    const json = parse(event); // parse sns event
    return http_request(json, callback); // POST parsed data to Email App
  }
}
