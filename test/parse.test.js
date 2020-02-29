const test = require('tape');
const parse = require('../lib/parse.js');

test('parse the bounce sns notification event', function (t) {
  const event = require('./fixtures/sample_sns_bounce.json');

  const json = parse(event)
  // console.log(json);
  // console.log(' - - - - - - - - ');
  const mid = '0102017092006798-f0456694-ac24-487b-9467-b79b8ce798f2-000000';
  t.equal(json.messageId, mid, "messageId is: " + json.messageId);
  t.equal(json.notificationType, "Bounce Permanent",
    "Type: " + json.notificationType)
  t.end();
});
