'use strict';

require("env2")(".env"); // ensure JWT_SECRET environment variable is defined.
const http = require('https'); // ALWAYS use TLS over the internets!
const jwt = require('jsonwebtoken');
/**
 * simple_http_request is a bare-bones http request using node.js core http
 * see: https://nodejs.org/api/http.html#http_http_request_options_callback
 * the NPM request module is 3.6 Megabytes and offers v. little benefit ...
 * This code achieves the same in less than 1kb. less code = faster response.
 * @param {Object} json - the JSON data we want to send to the Phoenix App.
 * @param {Function} callback - a standard callback with error & response args
 * response is a JSON Object unless there is an error.
 */

module.exports = function simple_http_request (json, callback) {
  const options = { // the json data is included in the token! 😮
    headers: { 'authorization': jwt.sign(json, process.env.JWT_SECRET) },
    hostname: process.env.EMAIL_APP_URL,
    method: 'POST'
    port: '443',
    path: '/'
  }

  http.request(options, function (res) {
    let resStr = '';
    console.log(res.statusCode);

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      resStr += chunk;
    }).on('end', function () {
      return callback(res.statusCode, JSON.parse(resStr));
    });
  }).end();
};
