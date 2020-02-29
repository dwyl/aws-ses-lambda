'use strict';
/**
 * `parse` extracts the relevant data from SNS notification events.
 * @param {Object} event - the object we want to store on S3
 * @returns {Object} json - parsed json data returned
 */
module.exports = function parse (event) {
  let json = {};
  if(event && event.Records && event.Records.length > 0) {
    const msg = JSON.parse(event.Records[0].Sns.Message);
    json.message_id = msg.mail.messageId;
    json.status = msg.notificationType + ' ' + msg.bounce.bounceType;
  }
  return json;
};
