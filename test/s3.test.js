const test = require('tape');
const save = require('../lib/s3.js').save;
const get = require('../lib/s3.js').get;
const context = require('aws-lambda-test-utils').mockContextCreator({}, test);

test('save event data to S3 with callback', function (t) {
  const time = Date.now().toString();
  const event = {"hello":"world!", time: time};
  save(event, function(error, data) {
    // console.log('error:', error);
    // console.log('data (event):', data);
    // retrieve the data from S3 to confirm it was saved correctly!
    get(data.key, function(error2, data2) {
      // console.log(' - - - - get:');
      // console.log(error2, data2);
      t.deepEqual(event, data2, "event save/get success! "  + data2.time);
      t.end();
    });
  })
});

test('save event data to S3 without callback', function (t) {
  let event = require('./fixtures/sample_sns_bounce.json');
  event.key = "without_callabck"
  save(event);
  setTimeout(function delay () {
    get('without_callabck.json', function(error2, data2) {
      // console.log(' - - - - get:');
      // console.log(error2, data2);
      t.deepEqual(event, data2, "event saved and retrieved! " + data2.time);
      t.end();
    });
  }, 2000);
});

test('attempt s3.save without an event (should error)', function (t) {
  save(null, function callback (error, data) {
    // console.log('error:', error);
    t.equal(error, "ERROR: please provide json data", error + " (as expected)");
    t.end();
  })
});

test('attempt s3.get invalid key (should error)', function (t) {
  const key = Date.now().toString();
  get(key, function callback (error, data) {
    // console.log('error:', error, "data:", data);
    t.equal(error.message, "The specified key does not exist.",
      error + " (as expected)");
    t.end();
  })
});
