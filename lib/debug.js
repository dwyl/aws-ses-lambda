require('env2')('.env');
const AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
const s3bucket = new AWS.S3({params: {Bucket: process.env.AWS_S3_BUCKET}});

module.exports = function save_event (event, callback) {
  if(event) {
    const params = {
      Key: 'event.json',
      Body: JSON.stringify(event),
      ContentType: 'application/json',
      ACL: 'public-read'
    };

    s3bucket.upload(params, function(err, data) {
      return callback(err, data);
    });
  } else {
    return callback('please provide valid message');
  }

}
