<div align="center">

# AWS SES Lambda 📬

An AWS Lambda Function that Sends Email
via Simple Email Service (SES)
and handles notifications for bounces, etc.

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
+ Are we **re-sending email** to addresses that have "***bounced***"?
(_i.e. wasting money?!_)
+ Are people ***opening*** / ***reading*** the email?
+ Do people ***engage*** with the **content** of the email?

> **Note**: all the same reasons ***Why*** that apply to `sendemail` <br />
(_the pre-cursor to this project_) apply here. <br />
see: https://github.com/dwyl/sendemail#why




## _What_? 💡

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

## _How_?

As the name of this project suggests, we are using AWS Lambda,
to handle all email-related tasks.

> If you (_or anyone `else` on your team_) are new to AWS Lambda,
see: https://github.com/dwyl/learn-aws-lambda

<br /> <br /> <br />

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
