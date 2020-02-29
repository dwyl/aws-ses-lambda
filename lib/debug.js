require('env2')('.env');
const save = require('../lib/s3.js').save;

module.exports = function debug (event) {
  // console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "test") {
    save(event, function callback (error, data) {
      console.log("DEBUG - - - error:", error, " - - - data:");
      console.log(data);
      console.log(" - - - - - - - - - - - - - - - - - - - - ");
    });
  }
};
