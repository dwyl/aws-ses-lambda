const test = require('tape');
const save = require('../lib/s3.js').save;
const context = require('aws-lambda-test-utils').mockContextCreator({}, test);

test('save event data to S3 with callback', function (t) {
  const event = {"hello":"world"};
  save(event, function(error, data) {
    console.log('error:', error);
    console.log('data (event):', data);

    // t.deepEqual(event, data)
    t.end();
  })
});
