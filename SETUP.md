## AWS SNS Setup Instructions


### Create an SNS Topic

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

Open the SES console: https://eu-west-1.console.aws.amazon.com/ses
