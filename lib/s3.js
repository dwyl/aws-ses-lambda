require('env2')('.env');
const AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
const s3bucket = new AWS.S3({params: {Bucket: process.env.AWS_S3_BUCKET}});

module.exports.save = function save (json, callback) {
  if (json) {
    const key = json.key || 'event'
    const params = {
      Key: key + '.json',
      Body: JSON.stringify(json),
      ContentType: 'application/json',
      ACL: 'public-read'
    };

    s3bucket.upload(params, function(err, data) {
      if (callback && typeof callback === "function") {
        return callback(err, data);
      }
    });

  } else {
    return callback('please provide json data');
  }
}
