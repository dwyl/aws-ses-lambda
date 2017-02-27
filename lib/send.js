'use strict';

var sendemail = require('sendemail');
var options = {
  templateName: 'hello',
  context: {
    tempalateVariableName: 'Variable Value',
    name: 'Joe Bloggs'
  },
  subject: 'Hello World!',
  toAddresses: ['nelson@dwyl.io']
  // ccAddresses: ['ccRecipient1@gmail.com', 'ccRecipient2@gmail.com'],
  // bccAddresses: ['bccRecipient1@gmail.com', 'bccRecipient2@gmail.com'],
};

module.exports = function send (callback) {
  return sendemail.sendMany(options, callback);
};
