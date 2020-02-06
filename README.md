 AWS SES Lambda

Amazon Web Services Simple Email Service Lambda Function(s)

## _Why_?

We send (_and receive_) a lot of email
for both @dwyl products
and client projects.

We need a simple, scalable & maintainable way of sending email,
and _most importantly_ we needed to _**know** with **certainty**_:

+ Are our emails being ***delivered successfully***?
+ How many emails are ***bouncing***?
+ Are we **re-sending email** to addresses that have "***bounced***"? (_i.e. wasting money?!_)
+ Are people ***opening*** / ***reading*** the email?
+ Do people ***engage*** with the **content** of the email?

> **Note**: all the same reasons ***Why*** that apply to `sendemail` <br />
(_the pre-cursor to this project_) apply here. <br />
see: https://github.com/dwyl/sendemail#why




## _What_?

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

+ update the Database with the send/receipt stats

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

This is a _potential_ features "_roadmap_" in (_decending_) order of importance.

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

There are _way_ more reasons _why_ we are handcrafting this app than
the ones stated above. We see email as "_operationally strategic_",
not merely "_transactional_". i.e. not something to be "_outsourced_"
to a "black box" provider that "_takes care of everything_" for us.
We want to have full control and deep insights into our email system.

<!--
### Can't We "_Just Use SendGrid_" ?

SendGrid have an _excellent_ product: https://sendgrid.com/solutions/
But it has a _high_ level of
["_stickiness_"](https://www.americanexpress.com/us/small-business/openforum/articles/how-to-make-your-startup-sticky/)
(_i.e [**vendor lock-in**](https://en.wikipedia.org/wiki/Vendor_lock-in)!_)
which we are _not_ fans of ...
Yes, they have great Open Source libraries:
https://sendgrid.com/docs/Integrate/libraries.html
But their _entire_ business model is predicated on _retaining_
the people using their service so they don't make it _easy_ to leave.
By contrast AWS don't make it _hard_ to leave ...


#### To a "_Startup CTO_" SendGrid Pricing is _Compelling_

_Indeed_ the SendGrid Pricing is _compelling_ when viewed through the "_lens_"
of a "**Startup CTO**" whose
["***One Job***"](https://www.google.com/search?q=you+had+one+job&tbm=isch) <br />
is to "***ship the product***" _not_ "_build the tools_" ...!
see: https://sendgrid.com/pricing/
![sendgrid pricing](https://cloud.githubusercontent.com/assets/194400/22721501/0947ccfe-eda9-11e6-9381-61afbd307c0a.png)

> What is ***$20 per month*** when even an hour of a
**"_Junior_" Developer's time costs more than that**?!

#### The Price of "_Success_"

IMO "_success_" for DWYL's Products & Services looks more like this:
+ **200k people** using the app
+ **2 emails _per week_** (_i.e 10 per person per month_)

![sendgrid-the-price-of-success](https://cloud.githubusercontent.com/assets/194400/22722356/538d0d56-edae-11e6-820c-869f17b418af.png)

So sending emails from our App to the people _using_ the app will cost us ***$13k
per year*** ... but if a few _thousand_ of those peole are _paying_ to use the app
surely they will offset the cost?

Another way of looking at this "_discussion_" is **cost-per-user** for email:
$1,250 / 200,000 = ***0.005625*** "_per user per month_". <br />
Given that we will be charging people _considerably_ more than "_half a penny_"
to use our product, the cost of email becomes "_moot_" ... _right_...?

#### SendGrid Cost _Per Email_: [$924.95/2,000,000](http://www.wolframalpha.com/input/?i=$924.95%2F2,000,000) = _$0.000462475_
-->

<br /><br />


### AWS Pricing (Lambda + SES) _Per Email_: $0.0001004 

Each email sent has 2 "_parts_" with corresponding costs.

#### Lambda Price [$0.0000002 + $0.000000208](http://www.wolframalpha.com/input/?i=$0.0000002+%2B+$0.000000208) = $0.00004 (_per request/execution_)

https://aws.amazon.com/lambda/pricing/

![lambda pricing](https://cloud.githubusercontent.com/assets/194400/22722867/c3cedb64-edb1-11e6-97b6-8075315b5726.png)


Lambda Pricing is broken down into two components:
+ $0.0000002 per request (_execution cost regardless of duration/memory used_)
+ $0.000000208 per 100ms (_execution time_)


#### SES Price [$0.10 / 1000](http://www.wolframalpha.com/input/?i=$0.1%2F1000) = $0.0001

https://aws.amazon.com/ses/pricing/
![AWS SES Pricing](https://cloud.githubusercontent.com/assets/194400/22722910/1f50065c-edb2-11e6-9b91-fe9b75ee973b.png)


<!--
#### API Gateway [$3.50 / 1,000,000](http://www.wolframalpha.com/input/?i=$3.50+%2F+1000000) = $0.00035 (_per request_)

The API Gateway is _useful_ in the "_Serverless_" context.
e.g: if we wanted the ability to send an email directly from a client-side app
without going through our application server.

https://aws.amazon.com/api-gateway/pricing/
![API Gateway Pricing](https://cloud.githubusercontent.com/assets/194400/22722312/fbe646b2-edad-11e6-8967-f375be10401b.png)

> **Note**: We _decided_ to ***remove*** the API Gateway from our solution
because it added no value (_actually it adds latency!_)
to this application (_we aren't using caching or request throttling_)
and contributed the _vast majority of the **cost**_!!
-->

#### Conclusion

We need to make our total (_incremental_) cost of running
our "Email Solution" _significantly_ cheaper,
while delivering comparable features.

For _all_ companies/teams using AWS sending up to **65,000 Emails a Month**
will be **_Completely_ Free**.
(_covered by the free usage tier for the first 12 months_).

### Longer Term

Our ***long-term plan*** is to run ***all*** our own infrastructure.
see: https://github.com/dwyl/time/issues/153
Not only is it _cheaper_ to run our own hardware than to _burn_ money on AWS,
but we get the added benefit of being **_fully_ in control** of where
our data is stored and encrypting all communication at all times.
For the next few months we will be using AWS because it's "fit for purpose",
and by building this as a Lambda that uses SES and exposes a simple API,
we can _easily_ substitute it later when we move to our own infra.

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
