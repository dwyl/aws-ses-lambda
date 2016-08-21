var msg = {
  "Type" : "Notification",
  "MessageId" : "1143ac66-56b9-54f8-a721-fc55fbe10171",
  "TopicArn" : "arn:aws:sns:eu-west-1:182294303866:ses-bounce",
  "Message" : "{\"notificationType\":\"Bounce\",\"bounce\":{\"bounceType\":\"Permanent\",\"bounceSubType\":\"General\",\"bouncedRecipients\":[{\"emailAddress\":\"testy.mctest@dwyl.io\",\"action\":\"failed\",\"status\":\"5.1.1\",\"diagnosticCode\":\"smtp; 550-5.1.1 The email account that you tried to reach does not exist. Please try\\n550-5.1.1 double-checking the recipient's email address for typos or\\n550-5.1.1 unnecessary spaces. Learn more at\\n550 5.1.1  https://support.google.com/mail/answer/6596 la2si14278441wjb.120 - gsmtp\"}],\"timestamp\":\"2016-08-21T13:22:32.354Z\",\"feedbackId\":\"01020156ad4456de-ce32e502-a3a0-4f14-a042-6d6b1a6b3e1b-000000\",\"reportingMTA\":\"dsn; a4-6.smtp-out.eu-west-1.amazonses.com\"},\"mail\":{\"timestamp\":\"2016-08-21T13:22:31.000Z\",\"source\":\"dwyl.test@gmail.com\",\"sourceArn\":\"arn:aws:ses:eu-west-1:182294303866:identity/dwyl.test@gmail.com\",\"sendingAccountId\":\"182294303866\",\"messageId\":\"01020156ad44535b-aa4ca55c-4a9a-4f8b-8394-db615f9a8742-000000\",\"destination\":[\"testy.mctest@dwyl.io\"],\"headersTruncated\":false,\"headers\":[{\"name\":\"From\",\"value\":\"dwyl.test@gmail.com\"},{\"name\":\"To\",\"value\":\"testy.mctest@dwyl.io\"},{\"name\":\"Subject\",\"value\":\"Bouncy Bounce\"},{\"name\":\"MIME-Version\",\"value\":\"1.0\"},{\"name\":\"Content-Type\",\"value\":\"text/plain; charset=UTF-8\"},{\"name\":\"Content-Transfer-Encoding\",\"value\":\"7bit\"}],\"commonHeaders\":{\"from\":[\"dwyl.test@gmail.com\"],\"to\":[\"testy.mctest@dwyl.io\"],\"subject\":\"Bouncy Bounce\"}}}",
  "Timestamp" : "2016-08-21T13:22:32.405Z",
  "SignatureVersion" : "1",
  "Signature" : "NwHQ5yn38SQ7VSb4aMnimnj1+MVHxYciMVpmRblMbvjgP6Sr3K1TPTYjKgI4ZQ9RA9Ck2Kv+slTIo3TB6N6Pzron87b5MRPI2z1QHEMb9uYxxEl2Nk2L/Tdjew8l9zKCmrltSOh8Z5VjF4bYD2+7wHq1D1k7buemaHgfezA+WhFGpOGNjj6OY4G77KaWTWKhT5YbfaJIhHYY1qRHn9swuyshQ+d/oUfsLxbqnm6eKOM2o+cxVS4+FwbfQs7LEuYjYAE7xh886Yu8iZU0SQsovb6r0L/BI61+m8K6I0yrvPwRdSNDbb0/aZEchh2V9FG5OzomdQtf1rYqY7uyhzx3Mw==",
  "SigningCertURL" : "https://sns.eu-west-1.amazonaws.com/SimpleNotificationService-b95095beb82e8f6a046b3aafc7f4149a.pem",
  "UnsubscribeURL" : "https://sns.eu-west-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:eu-west-1:182294303866:ses-bounce:c29ad1a8-1bf1-4b61-8040-20626b3b93d7"
}

console.log(JSON.parse(msg.Message).mail.headers);
