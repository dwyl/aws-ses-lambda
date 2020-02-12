require('env2')('.env');
console.log(process.env);
const sendemail = require('sendemail').email;

exports.handler = function (event, context, callback) {
	console.log(event);
	console.log('- - - - - - - - - - ');
	console.log(context);
	console.log('- - - - - - - - - - ');
  const template = 'welcome';
  const options = {
    subject: 'Welcome to dwyl Nelson!',
    email: 'nelson.k.correia@gmail.com',
    name: 'Nelson'
  };

	return sendemail(template, options, callback);
}
