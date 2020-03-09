'use strict';
/**
 * `parse` extracts the relevant data from SNS notification events.
 * @param {Object} event - the object we want to store on S3
 * @returns {Object} json - parsed json data returned
 */
module.exports = function parse (event) {
  let json = {};
  // sent event:
  if (event && event.MessageId) {
    json.message_id = event.MessageId;
    json.request_id = event.ResponseMetadata.RequestId;
    json.status = "Sent"; // email was successfully sent by SES
  }
  // bounce event:
  if (event && event.Records && event.Records.length > 0) {
    const msg = JSON.parse(event.Records[0].Sns.Message);
    // console.log('msg', msg);
    json.message_id = msg.mail.messageId; // NOT the same as Sns.MessageId 🤷‍
    json.status = msg.notificationType + ' ' + msg.bounce.bounceType;
    json.email = msg.mail.destination[0];
  }
  return json;
};
