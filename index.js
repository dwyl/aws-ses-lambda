const env = require('env2')('.env');
const sendemail = require('sendemail').email;

exports.handler = function (event, context, callback) {
	// console.log(event);
	// console.log('- - - - - - - - - - ');
	// console.log(context);
	// console.log('- - - - - - - - - - ');
  // require('env2')('.env');
  // console.log(process.env);

  const template = 'welcome';
  const options = {
    subject: 'Welcome to dwyl Nelson!',
    email: 'nelson.k.correia@gmail.com',
    name: 'Nelson'
  };

	return sendemail(template, options, callback);§
  // return callback(null, options);
}
