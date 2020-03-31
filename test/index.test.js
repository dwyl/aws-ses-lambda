const test = require('tape');
const handler = require('../index.js').handler;
const context = require('aws-lambda-test-utils').mockContextCreator({}, test);

test('ping to warm up lambda function', function (t) {
  const event = {ping: Date.now(), key: "ping"};
  handler(event, context, function (error, data) {
    t.equal(data, event, "event returned without modification");
    t.end();
  })
});


test('send email to success simulator and save to API', function (t) {
  const event = {
    "email": "success@simulator.amazonses.com",
    "name": "Alex!",
    "subject": "my amazing subject!",
    "key": "test",
    "template": "welcome",
    "time":  Date.now().toString()
  };
  handler(event, context, function cb (err, data) {
    console.log('event:', event);
    console.log('err:', err);
    console.log('data:', data);
    t.equal(data.message_id.length, 60, "message_id: " + data.message_id);
    t.equal(data.status, "Sent", "Status: " + data.status);
    t.end();
  })
});


test('POST sns event to Phoenix App via index.handler', function (t) {
  const event = require('./fixtures/sample_sns_bounce.json');
  handler(event, context, function (status, data) {
    // console.log('event:', event);
    // console.log('status:', status);
    // console.log('data:', data);
    t.equal(status, 200, "data successfully sent to Phoenix!");
    t.end();
  })
});
