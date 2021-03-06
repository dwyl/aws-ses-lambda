require("env2")(".env");
const test = require('tape');
const http_request = require('../lib/http_request');
const jwt = require('jsonwebtoken');

test('test extracting data from JWT', function (t) {
  const json = {
    message_id: '0102017092006798-f0456694-ac24-487b-9467-b79b8ce798f2-000000',
    status: 'Bounce Permanent'
  }
  const token = jwt.sign(json, process.env.JWT_SECRET);
  // console.log("token:", token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  t.equal(decoded.message_id, json.message_id, "JWT verification works");
  // console.log('decoded:', decoded);
  // t.end();
  http_request(json, function (status, response) {
    // console.log('status:', status, 'response:', response);
    t.equal(status, 200, "data successfully sent to Phoenix!");
    t.end();
  });
});


test('send data to Phoenix', function (t) {
  const json = {
    message_id: '01020170fa0c2a82-67271308-6fcd-466d-b9a8-185d735efb5b-000000',
    status: 'Sent'
  }
  http_request(json, function (status, response) {
    // console.log('status:', status, 'response:', response);
    t.equal(status, 200, "data successfully sent to Phoenix!");
    t.end();
  });
});


test('make jwt', function (t) {
  const json = {
    id: 142
  }
  const token = jwt.sign(json, process.env.JWT_SECRET)
  console.log('token:', token);
  const decoded = jwt.decode(token);
  t.equal(decoded.id, json.id, "id matches")
  t.end();
});
