const test = require('tape');
const handler = require('../index.js').handler;
const context = require('aws-lambda-test-utils').mockContextCreator({}, test);

test('send email without template', function (t) {
  const event = {
    "email": "success@simulator.amazonses.com",
    "name": "Alex!",
    "subject": "my amazing subject!",
    "key": "test"
  };
  handler(event, context, function (err, data) {
    // console.log('event:', event);
    // console.log('err:', err);
    // console.log('data:', data);
    t.equal(data.MessageId.length, 60, "MessageId: " + data.MessageId);
    t.end();
  })
});


test('POST sns event to Phoenix App via index.handler', function (t) {
  const event = require('./fixtures/sample_sns_bounce.json');
  handler(event, context, function (status, data) {
    // console.log('event:', event);
    console.log('status:', status);
    console.log('data:', data);
    t.equal(status, 200, "data successfully sent to Phoenix!");
    t.end();
  })
});
