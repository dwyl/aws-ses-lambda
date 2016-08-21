var test = require('tape'); // testing done simple ;-)
var Hapi = require('hapi');
require('decache')('../index.js'); // ensure the plugin is not cached.
var server = require('./server_example.js');

test('GET /nopg url that do not make any postgres queires', function (t) {

  var nopg = { method: 'GET', url: '/nopg' };
  var request_count = 0;
  var request_total = 5;
  for(var i = 0; i < request_total; i++) {
    server.inject(nopg, function(response) {
      t.equal(response.statusCode, 200, '/nopg visited '+ request_count);
      if(++request_count === request_total - 1) {
        console.log('last one!');
        // server.stop(function(){});
        t.end();
      }
    });
  }
});

test('POST /insert 1k times to simulate many concurent hits to same endpoint', function(t){
  var insert = {
    method: 'POST',
    url: '/insert',
    payload: { message: 'Ground control to major Tom.'}
  }
  var request_count = 0;
  var request_total = 1001;
  var start_time = Date.now();
  for(var i = 0; i < request_total; i++) {
    server.inject(insert, function(response) {
      // t.equal(response.statusCode, 200, "Find Person in Database");
      t.ok(response.result.log_id > 1, "Read log entry " + request_count)
      if(request_count++ === request_total - 1) {
        // server.stop(function(){});
        var end_time = Date.now();
        var time_taken = end_time - start_time; // in miliseconds
        var per_sec = request_total/(time_taken/1000);
        console.log('Time Taken:', time_taken, 'ms | Requests per second:', per_sec);
        t.end();
      }
    });
  }
})

test.onFinish(function () {
  server.stop(function(){});
})
