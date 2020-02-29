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
for both @dwyl products
and client projects.

We need a simple, scalable & maintainable way of sending email,
and _most importantly_ we needed to _**know** with **certainty**_:

+ Are our emails being ***delivered successfully***?
+ How many emails are ***bouncing***?
+ Are we attempting to **re-send email** to addresses that have "***bounced***"?
(_i.e. wasting money?!_)
+ Are people ***opening*** / ***reading*** the email?
+ Do people ***engage*** with the **content** of the email? (_click through_)



## _What_? 💡

The `aws-ses-lambda` function does three _related_ things<sup>1</sup>:

1. Send emails.
2. Parse AWS SNS notifications related to the emails that were sent.
3. Send the parsed SNS notification data
to a designated endpoint for storage, aggregation and visualisation.

The _How?_ section below explains
how each of these functions works.


> <sup>1</sup> The `aws-ses-lambda` function **does 3 things**
because they relate to the unifying theme of
sending email via SES and tracking the status of the sent emails.
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


## _How_?

As the name of this project suggests, we are using AWS Lambda,
to handle all email-related tasks via AWS SES.

> If you (_or anyone `else` on your team_) are new to AWS Lambda,
see:
[github.com/dwyl/learn-aws-lambda](https://github.com/dwyl/learn-aws-lambda)



### 1. Send Email

Thanks to the work we did earlier on
[`sendemail`](https://github.com/dwyl/sendemail),
the email sending part of the lambda is _very_ simple.

We just need to follow the setup instructions in
[github.com/dwyl/sendemail#how](https://github.com/dwyl/sendemail#how-)
including creating a `/templates` directory,
then create a handler function:


```js
const sendemail = require('sendemail').email;

module.exports = function send (event, callback) {
  const template = event.template || 'welcome';
  const options = {
    subject: event.subject || 'Welcome to dwyl ' + event.name,
    email: event.email,
    name: event.name
  };
  return sendemail(template, options, callback);
};
```
It's really that simple. 
All the data required for sending an email
is received in the Lambda **`event`** object.

It works flawlessly.



### 2. Parse AWS SNS Notifications




The SNS Notifications


https://docs.aws.amazon.com/ses/latest/DeveloperGuide/event-publishing-retrieving-sns-examples.html

#### 2.1 Create the SNS Topic

> These instructions follow and expand on the _official_
AWS SNS instructions for creating a Topic:
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-sns-notifications.html
If you get stuck, please _help_ us improve
by opening an issue!

https://eu-west-1.console.aws.amazon.com/sns/v3/home?region=eu-west-1#/homepage



#### 2.x Setup SNS Notification to Trigger Lambda Function

Once you have deployed the `aws-ses-lambda` function,
visit it's configuration page
and click on **`+ Add trigger`**:
https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/aws-ses-lambda-v1

<img width="1268" alt="aws-ses-lambda-configure-1" src="https://user-images.githubusercontent.com/194400/75610749-e69c6b00-5b0b-11ea-84cb-069757618121.png">

Search for SNS in the available triggers:
<img width="1110" alt="add-trigger-sns" src="https://user-images.githubusercontent.com/194400/75610852-fbc5c980-5b0c-11ea-9047-2c4842e8b2e7.png">

Once you have selected the SNS **topic**, click on the **`Add`** button:
<img width="1108" alt="create-trigger-sns" src="https://user-images.githubusercontent.com/194400/75610892-4d6e5400-5b0d-11ea-98d3-9b533527869f.png">





### 3. Save SNS Notification Data














<br /> <br /> <br />












### Features / Requirements

Each time an email is sent using the `aws-ses-lambda` 5 things happen:

#### 1. Pre-Send Checks

+ Is the email address valid. (_basic checks to avoid wasting money_)
+ Check our records to see if the email address we are attempting to
send to has bounced in the past.

#### 2. Send Email

+ Send the email using AWS SES and keep a note of the unique ID confirming the email was sent.

#### 3. Log Email Sent

+ Log all detail of the sent email to the Database

#### 4. Query SES Bounce/Spam Info Service

+ Check which emails have bounced

#### 5. Report Stats/Summary in Dashboard

+ Update the Database with the send/receipt stats
so that they can be viewed on the team's Email Dashboard!

<br />

## Frequently Asked Questions (FAQ)

#### Separate Lambda Functions or One Lambda with Independent Functions?

From _experience_ making distinct functions _separate_ lambda functions,
just increases our cost/complexity without any discernible benefit.

Having separate lambdas when we _know_ that all functionality is executed
each time

aws-ses-bounce-checker periodically retrieves stats on outbound emails from SES.
These include bounce rates and whether an email has been opened.








## (_Potential_) "Future Features"

This is a _potential_ features "_roadmap_" in (_descending_) order of importance.

+ [ ] **Email templates** should be in a ***separate repo***
from the "main" application in _any_ (_all_) our projects.
Non-technical team members should be able
to update the template (_using their "basic" HTML + handlebars knowledge_)
and should be able to save a draft of the changes to GitHub
(_without having to run the "CI" for an entire "web app" project!_)
+ [ ] **Send Sample Email** to _myself_ to check layout/design and confirm
the flow is working.
+ [ ] Extend the [Deployment Tool](https://www.npmjs.com/package/dpl)
to ***automatically configure*** the **API Gateway**
see: https://github.com/dwyl/learn-aws-lambda/issues/62#issuecomment-278009814
(_for now I am doing it manually..._)
+ [ ] **Consider Using DynamoDB** for truly "Serverless" email?
(_this could/should be implemented by someone other than the "core" dwyl team
as I have no "appetite" for the DynamoDB pricing model... but it's something
someone `else` might consider adding_)

<br /> <br /> <br />

# tl;dr

## _Extended_ Why?

There are _way_ more reasons
_why_ we are handcrafting this app
than the ones stated above.
We see email as "_operationally strategic_",
not merely "_transactional_".
i.e. not something to be "_outsourced_"
to a "black box" provider that "_takes care of everything_" for us.
We want to have full control and deep insights into our email system.



<br /><br />


# aws-ses-bounce-checker :mailbox_with_mail:
A tool to check if emails sent by SES have bounced.

Test that POST-ing to the `/bounce` endpoint with a email address
in the payload inserts into database:

```sh
curl -H "Content-Type: application/json" -X POST -d '{"email":"rorry@email.net"}' http://localhost:8000/bounce
```

Or testing against our Heroku endpoint:
```sh
curl -H "Content-Type: application/json" -X POST -d '{"email":"my.test@email.net"}' https://aws-ses-bounce.herokuapp.com/bounce
```


JSON test message:
```js
{
"default": "{\"email\":\"sns.test.email@aws.test\"}",
"https": "{\"email\":\"sns.test.email@aws.test\"}"
}
```
