const test = require('tape');
const parse = require('../lib/parse.js');

test('parse the bounce sns notification event', function (t) {
  const event = require('./fixtures/sample_sns_bounce.json');
  // console.log('event:', event);
  // console.log('event.Records[0].Sns', event.Records[0].Sns);
  const json = parse(event)
  // console.log('json', json);
  // console.log(' - - - - - - - - ');
  const mid = '0102017092006798-f0456694-ac24-487b-9467-b79b8ce798f2-000000';
  t.equal(json.message_id, mid, "json.message_id: " + json.message_id);
  t.equal(json.status, "Bounce Permanent", "json.status: " + json.status);
  t.equal(json.email, "bounce@dwyl.com", 'json.email: ' + json.email);
  t.end();
});

test('attempt to parse an SNS event without event.Records', function (t) {
  const event = require('./fixtures/sample_sns_bounce.json');
  delete event.Records;
  const json = parse(event);
  t.deepEqual(json, {}, "Does not choke when SNS event is invalid");
  t.end();
});

test('parse response from sendemail to save to Phoenix', function (t) {
  const event = require('./fixtures/ses_sent.js')
  // console.log('event:', event);
  const json = parse(event);
  // console.log('json:', json);
  const expected = {
    message_id: '01020170b0c80030-02edabfa-bf8d-4985-8c29-3c77e1b89aa5-000000',
    request_id: '950d09c6-eefd-4877-a2e1-2ded26d9ba05'
  };
  t.deepEqual(json, expected, "json.message_id:" + json.message_id)
  t.end()
});
