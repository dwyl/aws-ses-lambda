const test = require('tape');
const handler = require('../index.js').handler;
const send = require("../lib/send.js");
const context = require('aws-lambda-test-utils').mockContextCreator({}, test);

test('send a welcome email to the simulator', function (t) {
  const event = {
    "template": "welcome",
    "email": "success@simulator.amazonses.com",
    "name": "Great Success!",
    "subject": "my amazing subject!",
    "id": 1,
    "key": "welcome_test"
  };
  handler(event, context, function(err, data){
    // console.log(err, data);
    // console.log(' - - - - - - - - ');
    t.equal(data.message_id.length, 60,
        "Email sent! MessageId: " + data.message_id)
    t.end();
  })
});

test('send email without template or name', function (t) {
  const event = {
    "email": "success@simulator.amazonses.com",
    "id": 1,
    "key": "no_template"
  }; // no template
  handler(event, context, function(err, data) {
    // console.log(data);
    t.equal(data.message_id.length, 60, "Sent! message_id: " + data.message_id);
    t.end();
  })
});

test('simulate bounce and complaint', function (t) {
  const event = {
    "email": [
      "success@simulator.amazonses.com",
      "complaint@simulator.amazonses.com"
    ],
    "template": "simulator",
    "name": "Testy McTestface",
    "id": 1,
    "key": "simulate_bounce"
  }; // no template
  send(event, function(err, data) {
    // console.log(data);
    t.equal(data.MessageId.length, 60, "Sent! message_id: " + data.message_id);
    t.end();
  })
});
