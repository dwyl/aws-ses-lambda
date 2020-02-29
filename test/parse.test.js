const test = require('tape');
const handler = require('../index.js').handler;
const context = require('aws-lambda-test-utils').mockContextCreator({}, test);

test('', function (t) {

  const event = {
    "template": "welcome",
    "email": "success@simulator.amazonses.com"
  };

  handler(event, context, function(err, data){
    console.log(err, data);
    console.log(' - - - - - - - - ');
    t.equal(data.MessageId.length, 60,
        "Email sent! MessageId: " + data.MessageId)
    t.end();
  })

});
