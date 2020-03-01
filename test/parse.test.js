const test = require('tape');
const parse = require('../lib/parse.js');

test('parse the bounce sns notification event', function (t) {
  const event = require('./fixtures/sample_sns_bounce.json');

  const json = parse(event)
  console.log(json);
  console.log(' - - - - - - - - ');
  const mid = '0102017092006798-f0456694-ac24-487b-9467-b79b8ce798f2-000000';
  t.equal(json.message_id, mid, "message_id is: " + json.message_id);
  t.equal(json.status, "Bounce Permanent", "Type: " + json.status)
  t.end();
});

test('attempt to parse an SNS event without event.Records', function (t) {
  const event = require('./fixtures/sample_sns_bounce.json');
  delete event.Records;
  const json = parse(event)
  t.deepEqual(json, {}, "Does not choke when SNS event is invalid");
  t.end();
});
