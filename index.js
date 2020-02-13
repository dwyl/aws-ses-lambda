const env = require('env2')('.env');
const sendemail = require('sendemail').email;

exports.handler = function (event, context, callback) {
  // console.log('- - - - - - - - - - event');
  // console.log('event.email:', event.email);
	// console.log(event);
	// console.log('- - - - - - - - - - context');
	// console.log(context);
	// console.log('- - - - - - - - - - ');

  const template = event.template || 'welcome';
  const options = {
    subject: 'Welcome to dwyl ' + event.name,
    email: event.email,
    name: event.name
  };

	return sendemail(template, options, callback);
  // return callback(null, options);
}
