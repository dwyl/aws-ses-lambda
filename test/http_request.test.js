const test = require('tape');
const http_request = require('../lib/http_request');



test('send data to Phoenix', function (t) {

  const json = {
    message_id: '0102017092006798-f0456694-ac24-487b-9467-b79b8ce798f2-000000',
    status: 'Bounce Permanent'
  }
  http_request(json, function (error, response) {
    console.log(error, response);
    t.end();
  });
});

/*
test('make GET request to invalid url (error branch check)', function (t) {
  const path = '/nelsonic' ;
  http_request(path, function (statusCode, html) {
    // console.log(statusCode, html);
    t.equal(statusCode, 200, 'statusCode for valid request is: ' + statusCode);
    t.ok(html.indexOf('<!DOCTYPE html>') > -1, 'got html back from GitHub');
    t.end();
  });
});

// see: https://github.com/nelsonic/github-scraper/issues/60
const validate = require('../lib/url_validator');

test('Regression Test for issue #60', function(t) {
  const path = '/hangouts/followers';
  http_request(path, function (statusCode, html) {
    t.equal(statusCode, 200, 'statusCode for valid request is: ' + statusCode);
    t.ok(html.indexOf('<!DOCTYPE html>') > -1, 'got html back from GitHub');
    t.end();
  });
});
*/
