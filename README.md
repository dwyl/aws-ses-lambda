# aws-ses-bounce-checker :mailbox_with_mail:
A tool to check if emails sent by SES have bounced.

Test that POST-ing to the `/bounce` endpoint with a email address
in the payload inserts into database:

```sh
curl -H "Content-Type: application/json" -X POST -d '{"email":"rorry@email.net"}' http://localhost:8000/bounce
```

Or testing against our Heroku endpoint:
```sh
curl -H "Content-Type: application/json" -X POST -d '{"email":"rorry@email.net"}' https://aws-ses-bounce.herokuapp.com/bounce
```
