const test = require('tape');
const handler = require('../index.js').handler;
const context = require('aws-lambda-test-utils').mockContextCreator({}, test);

test('send email without template', function (t) {
  const event = {};
  handler(event, context, function(err, data){
    t.deepEqual(event, data)
    t.end();
  })
});
