## AWS SNS Setup Instructions


### Create an SNS Topic

Visit the AWS Simple Notifications Service (SNS) home page and create a new topic:

<img width="1034" alt="new-sns-topic" src="https://user-images.githubusercontent.com/194400/75611041-9d99e600-5b0e-11ea-9c36-1f7318cf3362.png">

We called ours `SESNotifications` and then clicked **`Next step`**.
You will see a page where you can configure your SNS topic:

<img width="1024" alt="create-sns-topic-1" src="https://user-images.githubusercontent.com/194400/75611283-0da96b80-5b11-11ea-9cca-f3d7ac33d477.png">

Ignore all the _optional_ configurations and
just scroll to the bottom of the page
and click **`Create topic`**:

<img width="1024" alt="create-sns-topic-2" src="https://user-images.githubusercontent.com/194400/75611290-1f8b0e80-5b11-11ea-8e5f-4c07252bf8eb.png">

You will then see a confirmation page saying your topic was created successfully:

<img width="1210" alt="ses-topic-created" src="https://user-images.githubusercontent.com/194400/75611267-eeaad980-5b10-11ea-836c-248d321fa8e5.png">

### Create SNS Subscription to the Topic


On this page, scroll till you find the **`Create subscription`** button:
(Click it)

<img width="1124" alt="sns-create-subscription" src="https://user-images.githubusercontent.com/194400/75611323-7d1f5b00-5b11-11ea-9d98-3f9f08867db6.png">

Once you have selected/input the relevant data,
click the **`Create subscription`** button:

<img width="1124" alt="aws-sns-create-subscription" src="https://user-images.githubusercontent.com/194400/75611359-c2dc2380-5b11-11ea-9a9d-29354746a549.png">

You should see a confirmation that your subscription was created successfully:

<img width="1124" alt="sesnotifications-subscription-created" src="https://user-images.githubusercontent.com/194400/75611541-54986080-5b13-11ea-890c-8311649b75ac.png">


### Configuring Notifications on Amazon SES Console

> This section follows and expands on the _official_
instructions:
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-sns-notifications.html

Once you have created the SNS Topic,
visit the SES home page
and click on **`Email Addresses`**:
https://eu-west-1.console.aws.amazon.com/ses

<img width="1266" alt="aws-ses-console-home" src="https://user-images.githubusercontent.com/194400/75611690-c0c79400-5b14-11ea-93af-abcd2cd52c0b.png">

Click on the _verified_ email address
you want to configure SNS notifications for:

<img width="1234" alt="aws-ses-email-address-no-topics" src="https://user-images.githubusercontent.com/194400/75611797-8d393980-5b15-11ea-8c7f-53908c4873fa.png">

In the **`Notifications`** section,
click on **`Edit configuration`**:

<img width="1234" alt="aws-ses-edit-configuration" src="https://user-images.githubusercontent.com/194400/75611829-f751de80-5b15-11ea-802e-c75e29ad6d03.png">

Select the SNS topic we created above
for _all_ the types of notification
then click **`Save Config`**:

<img width="1117" alt="aws-ses-sns-notifications-edit-configuration" src="https://user-images.githubusercontent.com/194400/75611888-629bb080-5b16-11ea-8770-0683f56324a8.png">

Your configuration should now look something like this:

<img width="1184" alt="aws-ses-sns-notificaitons-updated" src="https://user-images.githubusercontent.com/194400/75611930-cf16af80-5b16-11ea-9e68-0415f187e326.png">


### Test it!!

In the Lambda configuration page
https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/aws-ses-lambda-v1
configure a bounce event to an email address you _know_ does not exist:

<img width="967" alt="configure-bounce-test-event" src="https://user-images.githubusercontent.com/194400/75612435-43ebe880-5b1b-11ea-9a58-28de4e8f209f.png">

_Run_ the bounce event in the Lambda console:

<img width="1276" alt="lambda-bounce-test" src="https://user-images.githubusercontent.com/194400/75612461-7eee1c00-5b1b-11ea-943e-f20d8b41112e.png">

You will see a "success" message confirming that the `aws-ses-lambda` ***attempted*** to send the email to the **`bounce@dwyl.com`** address (_which we know will fail_). Our lambda function and AWS SES does not _know_ that the **`bounce@dwyl.com`** address will bounce. That's the _reason_ we need to have the SNS topic so we can _monitor_ bounce events!

The SNS bounce notification **`event`** is saved to S3
thanks to [#12](https://github.com/dwyl/aws-ses-lambda/issues/12)
https://ademoapp.s3-eu-west-1.amazonaws.com/event.json
<img width="1080" alt="bounce-event-saved" src="https://user-images.githubusercontent.com/194400/75612360-937de480-5b1a-11ea-81a0-51200b96bb62.png">

For the purposes of _testing_ our parser,
we save this `event` JSON in:
[`test/fixtures/sample_sns_bounce.json`](https://github.com/dwyl/aws-ses-lambda/blob/9ad2381bda7a2f35049732569af055ff80e167d2/test/fixtures/sample_sns_bounce.json)

Now we can _parse_ the notification!
