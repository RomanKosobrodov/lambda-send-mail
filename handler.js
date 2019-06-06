const aws = require("aws-sdk");
const querystring = require("querystring");
const ses = new aws.SES();
const myEmail = process.env.EMAIL;
const myDomain = process.env.DOMAIN;
const redirectURL = process.env.REDIRECT_URL;

function redirectResponse() {
  return {
    statusCode: 301,
    headers: {
      Location: redirectURL
    }
  };
}

function generateError(code, err) {
  console.log(err);
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": myDomain,
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(err.message)
  };
}

function generateEmailParams(body) {
  const { email, sender, message } = querystring.parse(body);
  console.log(email, sender, message);
  if (!(email && sender && message)) {
    throw new Error(
      "Missing parameters! Make sure to add parameters 'email', 'sender', 'message'."
    );
  }

  return {
    Source: myEmail,
    Destination: { ToAddresses: [myEmail] },
    ReplyToAddresses: [myEmail],
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `Message sent from email ${email} by ${sender} \nmessage: ${message}`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: `You received a message from ${sender}!`
      }
    }
  };
}

module.exports.send = async event => {
  try {
    const emailParams = generateEmailParams(event.body);
    const data = await ses.sendEmail(emailParams).promise();
    return redirectResponse();
  } catch (err) {
    return generateError(500, err);
  }
};
