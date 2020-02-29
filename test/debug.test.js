const test = require('tape');
const debug = require('../lib/debug.js');
const get = require('../lib/s3.js').get;

test('save event data to S3 without callback', function (t) {
  const time = Date.now().toString();
  const event = {"Bonjour":"le monde!", "time": time};
  process.env.NODE_ENV="test";
  debug(event);
  setTimeout(function delay (){
    get('event.json', function(error2, data2) {
      // console.log(' - - - - get:');
      // console.log(error2, data2);
      t.deepEqual(event, data2, "event saved and retrieved! " + data2.time);
      process.env.NODE_ENV=null;
      t.end();
    });
  }, 2000);
});
