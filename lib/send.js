'use strict';
const sendemail = require('sendemail').email;

module.exports = function send (event, callback) {
  const template = event.template || 'welcome';
  const options = {
    subject: 'Welcome to dwyl ' + event.name,
    email: event.email,
    name: event.name
  };
  return sendemail(template, options, callback);
};
