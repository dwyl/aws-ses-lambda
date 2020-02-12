const test = require('tape');
const handler = require('../index.js').handler;

test('send!!!', function (t) {
  const context = {
    functionName: 'LambdaTest',
    functionVersion: '1',
    invokedFunctionArn: 'arn:aws:lambda:eu-west-1:655240711487:function:LambdaTest:ci'
  };
  const event = { key1: 'value1' };
  handler(context, event, function(err, data){
    console.log(err, data);
    t.end();
  })
});
