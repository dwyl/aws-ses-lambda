'use strict';

const sendemail = require('sendemail').email;

module.exports = function send (template, options, callback) {
  return sendemail(template, options, callback);
};
