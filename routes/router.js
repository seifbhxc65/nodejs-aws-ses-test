const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const e = require('express');
//SET UP DOTENV
require('dotenv').config();
console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

const ses = new aws.SES({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

router.post("/send-email", function (req, res) {
    const { email, message, name } = req.body;
    console.log("req", req.body);
    sesTest("saif40340@gmail.com", email, message, name)
      .then((val) => {

        console.log("got this back", val);
        res.send("Successfully Sent Email");
      })
      .catch((err) => {
        res.send(err);
  
        console.log("There was an error!", err);
      });
  });
  
  function sesTest(emailTo, emailFrom, message, name) {
    console.log(`Sending email to: ${emailTo}`);
    var params = {
      Destination: {
        
        ToAddresses: [emailTo]

      },
      Message: {
        Body: {
          Text: { Data: "From Contact Form: " + name + "\n " + message }
        },
  
        Subject: { Data: "From: " + emailFrom }
      },
      Source: "saif40340@gmail.com"
    };
  
    return ses.sendEmail(params).promise();
  }
module.exports = router;