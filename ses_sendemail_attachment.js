// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var mailcomposer = require('mailcomposer');
// Set the region 
AWS.config.update({ region: 'us-west-2' });

return Promise.resolve().then(() => {
  let sendRawEmailPromise;

  const mail = mailcomposer({
    from: 'jihui.luo@dmv.ca.gov',
    replyTo: 'jihui.luo@dmv.ca.gov',
    to: ['jihui.luo@dmv.ca.gov', 'son.nguyen@dmv.ca.gov'],
    subject: 'Sample SES message with attachment',
    text: 'Hi Sonny/Jay, this is a test message from SES with an attachment.',
    attachments: [
      {
        path: './Excel.xlsx'
      },
    ],
  });

  return new Promise((resolve, reject) => {
    mail.build((err, message) => {
      if (err) {
        reject(`Error sending raw email: ${err}`);
      }
      sendRawEmailPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendRawEmail({RawMessage: {Data: message}}).promise();
    });

    resolve(sendRawEmailPromise);
  });
});