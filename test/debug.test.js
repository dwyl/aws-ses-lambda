const test = require('tape');
const save_event = require('../lib/debug.js');
const context = require('aws-lambda-test-utils').mockContextCreator({}, test);

test('send email without template', function (t) {
  const event = {"hello":"my lovely!"};
  save_event(event, function(error, data) {
    console.log('error:', error);
    console.log('data (event):', data);
    // t.deepEqual(event, data)
    t.end();
  })
});
