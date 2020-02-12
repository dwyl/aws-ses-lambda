const env = require('env2')('.env');
const sendemail = require('sendemail').email;

exports.handler = function (event, context, callback) {
  console.log('- - - - - - - - - - event');
	console.log(event);
	console.log('- - - - - - - - - - context');
	console.log(context);
	console.log('- - - - - - - - - - ');
  // require('env2')('.env');ga
  // console.log(process.env);

  const template = 'welcome';
  const options = {
    subject: 'Welcome to dwyl Nelson!',
    email: 'nelson@gmail.com',
    name: 'Nelson'
  };

	return sendemail(template, options, callback);
  // return callback(null, options);
}
