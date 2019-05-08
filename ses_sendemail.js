// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-west-2' });

// Create sendEmail params 
var params = {
    Destination: { /* required */
        CcAddresses: [
            'son.nguyen@dmv.ca.gov',
            'zhiyuanluo9@gmail.com'
            /* more items */
        ],
        ToAddresses: [
            'jihui.luo@dmv.ca.gov',
            'son.nguyen@dmv.ca.gov',
            /* more items */
        ]
    },
    Message: { /* required */
        Body: { /* required */
            Html: {
                Charset: "UTF-8",
                Data: "Hi Sonny, I just send you an email through AWS-SES. --- HTML"
            },
            Text: {
                Charset: "UTF-8",
                Data: "Hi Sonny, I am tring to send the attachment as well. --- Text"
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: 'Test email'
        }
    },
    Source: 'jihui.luo@dmv.ca.gov', /* required */
    ReplyToAddresses: [
        'jihui.luo@dmv.ca.gov',
        /* more items */
    ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
    function (data) {
        console.log(data.MessageId);
    }).catch(
        function (err) {
            console.error(err, err.stack);
        });
