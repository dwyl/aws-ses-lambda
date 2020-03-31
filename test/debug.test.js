const test = require('tape');
const debug = require('../lib/debug.js');
const get = require('../lib/s3.js').get;

test('save event data to S3 without callback', function (t) {
  const time = Date.now().toString();
  let event = {"Bonjour":"le monde!", time: time, key: "event_test"};
  process.env.NODE_ENV="test";
  debug(event);
  setTimeout(function delay (){
    get('event_test.json', function(error2, data2) {
      // console.log(' - - - - get:');
      // console.log(error2, data2);
      t.deepEqual(event, data2, "event saved and retrieved! " + data2.time);
      process.env.NODE_ENV=null;
      t.end();
    });
  }, 3000);
});

test('debug sns event', function (t) {
  let event = require('./fixtures/sample_sns_bounce.json');
  event.time = Date.now().toString();
  process.env.NODE_ENV="test";
  debug(event);
  setTimeout(function delay (){
    get('sns.json', function(error2, data2) {
      // console.log(' - - - - get:');
      // console.log(error2, data2);
      t.deepEqual(event, data2, "sns event saved and retrieved! " + data2.time);
      process.env.NODE_ENV=null;
      t.end();
    });
  }, 3000);
});
