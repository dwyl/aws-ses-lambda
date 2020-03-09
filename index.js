require("env2")(".env");
const debug = require("./lib/debug.js");
const send = require("./lib/send.js");
const parse = require('./lib/parse.js');
const http_request = require('./lib/http_request');

exports.handler = function handler (event, context, callback) {
  debug(event);

  if (event.email) { // event contains an email (address)
  	send(event, function send_cb (error, data) { // send the email
      let json = parse(data);
      json.email = event.email;
      json.template = event.template;
      http_request(json, function http_cb (_status, response) { // save to API
        const merged = {...event, ...json, ...response};
        return callback(error, merged);
      });
    });
  }
  else {
    const json = parse(event); // parse sns event
    return http_request(json, callback); // POST parsed data to Email App
  }
}
