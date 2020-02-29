'use strict';
const sendemail = require('sendemail').email;

/**
 * `send` sends an email using sendmail.
 * the data for to be replaced in the email template are included in event.
 * @param {Object} event - the Lambda invocation event
 * required keys in the `event` object are: email, name, subject and template.
 * @param {Function} callback - called once the file has been uploaded
 */
module.exports = function send (event, callback) {
  const template = event.template || 'welcome';
  const options = {
    subject: event.subject || 'Welcome to dwyl ' + event.name,
    email: event.email,
    name: event.name
  };
  return sendemail(template, options, callback);
};
