<div align="center">

# AWS SES Lambda 📬

An AWS Lambda Function that Sends Email
via Simple Email Service (SES)
and handles notifications for bounces, etc.


[![Build Status](https://img.shields.io/travis/dwyl/aws-ses-lambda/master.svg?style=flat-square)](https://travis-ci.org/dwyl/aws-ses-lambda)
[![codecov.io](https://img.shields.io/codecov/c/github/dwyl/aws-ses-lambda/master.svg?style=flat-square)](http://codecov.io/github/dwyl/aws-ses-lambda?branch=master)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/dwyl/aws-ses-lambda?color=brightgreen&style=flat-square)](https://codeclimate.com/github/dwyl/aws-ses-lambda)
[![dependencies Status](https://david-dm.org/dwyl/aws-ses-lambda/status.svg?style=flat-square)](https://david-dm.org/dwyl/aws-ses-lambda)
[![devDependencies Status](https://david-dm.org/dwyl/aws-ses-lambda/dev-status.svg?style=flat-square)](https://david-dm.org/dwyl/aws-ses-lambda?type=dev)
<!-- [![HitCount](http://hits.dwyl.com/dwyl/aws-ses-lambda.svg)](http://hits.dwyl.com/dwyl/aws-ses-lambda) -->
[![npm package version](https://img.shields.io/npm/v/aws-ses-lambda.svg?color=brightgreen&style=flat-square)](https://www.npmjs.com/package/dpl)
[![Node.js Version](https://img.shields.io/node/v/aws-ses-lambda.svg?style=flat-square "Only Node.js v12 LTS supported")](http://nodejs.org/download/)


</div>
<br />

## _Why_? 🤷

We send (_and receive_) a lot of email
both for the @dwyl App
and our newsletter. <br />
We need a simple, scalable & maintainable way of sending email,
and _most importantly_ we needed to _**know** with **certainty**_:

+ Are our emails being ***delivered***?
+ How many emails are ***bouncing***?
+ Are we attempting to **re-send email**
to addresses that have "***bounced***"?
(_i.e. wasting money?!_)
+ Are people ***opening*** / ***reading*** the email?
+ Do people ***engage*** with the **content** of the email? (_click through_)
+ If someone no longer wants to receive emails (_too many or not relevant_),
do we have a reliable way for them to ***unsubscribe***?

This project is our quest to answer these questions.


## _What_? 💡

The `aws-ses-lambda` function does three _related_ things<sup>1</sup>:

1. **Send** emails.
2. **Parse** AWS SNS notifications related to the emails that were sent.
3. **Save** the parsed SNS notification data for aggregation and visualisation.

The _How?_ section below explains
how each of these functions works.


## _How_?

As the name of this project suggests, we are using AWS Lambda,
to handle all email-related tasks via AWS SES.

> If you (_or anyone `else` on your team_) are new to AWS Lambda,
see:
[github.com/dwyl/learn-aws-lambda](https://github.com/dwyl/learn-aws-lambda)

In this section we will break down _how_ the lambda works.


### 1. _Send_ Email

Thanks to the work we did earlier on
[`sendemail`](https://github.com/dwyl/sendemail),
sending emails using AWS Simple Email Service (SES)
from our Lambda function is _very_ simple.

We just need to follow the setup instructions in
[github.com/dwyl/sendemail#how](https://github.com/dwyl/sendemail#how-)
including creating a `/templates` directory,
then create a handler function:


```js
const sendemail = require('sendemail').email;

module.exports = function send (event, callback) {
  return sendemail(event.template, event, callback);
};
```

Don't you just _love_ it when things are _that_ simple?! <br />
All the data required for sending an email
is received in the Lambda **`event`** object.

The required keys in the `even` object are:
+ `email` - the email address we want to send an email to.
+ `name` - the name of the person we are sending the email to.
  (_if your email messages aren't personal, don't send them!_)
+ `subject` - the subject of the email you are sending.
+ `template` - the template you want to send.

It works flawlessly.

<!-- Insert screenshot of received email -->


The full code is:
[`lib/send.js`](https://codecov.io/gh/dwyl/aws-ses-lambda/src/master/lib/send.js)



### 2. _Parse_ AWS SNS Notifications

After an email is sent using AWS SES,
AWS keeps track of the status of the emails
e.g `delivered`, `bounce` or `complaint`. <br />
By _subscribing_ to AWS Simple Notification System (SNS)
notifications, we can keep track of the status.

There are a few steps
for setting up SNS notifications for SES events,
so we created detailed setup instructions:
[`SETUP.md`](https://github.com/dwyl/aws-ses-lambda/blob/master/SETUP.md)

Once you have configured the SNS Topic,
used the topic for SES notifications
and set the topic as the trigger for the lambda function,
it's time to _parse_ the notifications.

Thankfully this is _also_ really simple code!

```js
let json = {};
if(event && event.Records && event.Records.length > 0) {
  const msg = JSON.parse(event.Records[0].Sns.Message);
  json.messageId = msg.mail.messageId;
  json.notificationType = msg.notificationType + ' ' + msg.bounce.bounceType;
}
```

We are only interested in the `messageId` and `notificationType`.
This code is included in
[`lib/parse.js`](https://github.com/dwyl/aws-ses-lambda/blob/master/lib/parse.js)


During MVP we are only interested in the emails that _bounce_.
So we are only parsing the bounce event.
Gmail does not send _delivery_ notifications,
so we will need to _implement_ a workaround.
See: https://github.com/dwyl/email/issues/1

More detail on the various SES SNS notifications:
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/event-publishing-retrieving-sns-examples.html



### 3. _Save_ SNS Notification Data

Once we have _parsed_ the SNS notifications for SES events,
we need to _save_ the data back to our PostgreSQL database
so that we can build our analytics dashboard!

This again is pretty simple code;
we just invoke `http_request`
with the `json` data we want to send to the Phoenix App:

```js
const json = parse(event); // parse SNS event see: step 2.
http_request(json, callback); // json data & lambda callback argument
```

View the complete code in [`index.js`]()
and the supporting `http_request` function in
[`lib/http_request.js`]()

The **`http_request`** function wraps the Node.js core
[`http.request`](https://nodejs.org/api/http.html#http_http_request_options_callback)
method with a few basic options
and allows us to pass in a `json` Object
to send to the Phoenix App.

### Required Environment Variables

In order for all parts of the Lambda function to work,
we need to ensure that all environment variables are defined.

For the complete list of required environment variables,
please see the [`.env_sample`](https://github.com/dwyl/aws-ses-lambda/blob/master/.env_sample) file.

Copy the [`.env_sample`](https://github.com/dwyl/aws-ses-lambda/blob/master/.env_sample) file and create a `.env` file:

```
cp .env_sample .env
```

Then update all the values in the file
so that they are the _real_ values.


Once you have a `.env` file with all the correct environment variables,
it's time to _deploy_ the Lambda function to AWS!

### _Deploy_ the Lambda to AWS!

Run the following command in your terminal:

```
npm run deploy
```

You should see output similar to the following:

```
- - - - - - - - > Lambda Function Deployed:
{
  FunctionName: 'aws-ses-lambda-v1',
  FunctionArn: 'arn:aws:lambda:eu-west-1:123456789247:function:aws-ses-lambda-v1',
  Runtime: 'nodejs12.x',
  Role: 'arn:aws:iam::123456789247:role/service-role/LambdaExecRole',
  Handler: 'index.handler',
  CodeSize: 8091768,
  Description: 'A complete solution for sending email via AWS SES using Lambda | https://github.com/dwyl/aws-ses-lambda/commit/5d0a719568c27987be32e5d22547f7224eb45c03',
  Timeout: 42,
  MemorySize: 128,
  LastModified: '2020-03-05T23:42:56.809+0000',
  CodeSha256: 'jvOg/+8y9UwBcLeTprMRIEvT0ryun1bdjzrAJXAk5m8=',
  Version: '$LATEST',
  Environment: { Variables: { EMAIL_APP_URL: 'phemail.herokuapp.com' } },
  TracingConfig: { Mode: 'PassThrough' },
  RevisionId: '42442cee-d506-4aa5-aec5-d7fb73145a58',
  State: 'Active',
  LastUpdateStatus: 'Successful'
}
- - - - - - - - > took 8.767 seconds
```





<br /> <br /> <br />

# tl;dr

## _Extended_ Why?

There are _way_ more reasons
_why_ we are handcrafting this app
than the ones stated above. <br />
We see email as our primary feedback mechanism
and thus "_operationally strategic_",
not merely "_transactional_".
i.e. not something to be "_outsourced_"
to a "black box" provider that "_takes care of everything_" for us.
We want to have full control and deep insights into our email system. <br />
By using a _decoupled_ lambda function to send email
and subscribe to SNS events
we keep all the AWS specific
functionality in a single place.
This is easy to reason about, maintain and _extend_ when required.
In the future, if we decide to switch email sending provider,
(_or run our own email service_),
we can simply re-write the `sendemail`
and `parse_notification` functions
and not need to touch our **`email`** analytics dashboard at all!

For now SES is _by far_ the cheapest
and superbly reliable way to send email.
We are very happy to let AWS take care of _this_ part of our stack.


> <sup>1</sup> The `aws-ses-lambda` function **does 3 things**
because they relate to the unifying theme of
sending email via SES and tracking the status of the sent emails via SNS.
We _could_ split these 3 bits of functionality into separate repositories
and deploy them separately as distinct lambda functions,
however in our experience having _too many_ lambda functions
can quickly become a maintenance headache.
We _chose_ to _group_ them together
because they are small, easy to reason about
and work well as a team!
If you feel strongly about the
[UNIX Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well)
definitely split out the functions in your _own_ fork/implementation.
> The code for this Lambda function is less than
[**100 lines**](https://codecov.io/gh/dwyl/aws-ses-lambda/tree/master/lib)
and can be read in **10 minutes**.
The [**`sendemail`**](https://github.com/dwyl/sendemail) module
which the Lambda uses to send emails via AWS SES is **38 lines** of code. See:
[lib/index.js](https://codecov.io/gh/dwyl/sendemail/src/master/lib/index.js)
it's mostly comments which make it very beginner friendly.
