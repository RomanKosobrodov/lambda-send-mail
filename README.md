# lambda-send-mail

Send emails from a website contact form using AWS Lambda.

# Prerequisites

## Serverless CLI

You will need `serverless` to deploy this code to AWS Lambda.
Install serverless CLI from npm:

```bash
npm install -g serverless
```

You can update an existing installation by running:

```bash
npm update -g serverless
```

You might need an administator's account (sudo) to run these commands.

## AWS account with access to Lambda

You will need an active AWS account with programmatic access to AWS Lambdas.
Sign-up for an AWS account if you do not already have one.

## Set up AWS credentials

Configure `serverless` with your AWS access key and secret:

```bash
serverless config credentials --provider aws --key <your-aws-key> --secret <your-aws-secret>
```

## Create and AIM user and generate temporary access keys

Create an AIM user and generate access keys as described in the [serverless tutorial](https://serverless.com/framework/docs/dashboard/access-roles/).

## Put your secrets in a file

To keep your secrets safe put them in `secrets.json` file. Be careful not to add this file to your repo. If you accidentally did, watch this Miguel Grinberg's [talk](https://www.youtube.com/watch?v=2uaTPmNvH0I).
Your `secrets.json` should look like this:

```json
{
  "NODE_ENV": "production",
  "EMAIL": "<your-email-address>",
  "DOMAIN": "https://romankosobrodov.github.io/",
  "REDIRECT_URL": "https: //romankosobrodov.github.io/thanks"
}
```

The `EMAIL` is the email address to which you are going to send messages from the website.
The `DOMAIN` field is used to deny access to the Lambda function from other domains. And the `REDIRECT_URL` is the URL of the page on your website that you are going to display to the user after they submitted the contact form.

## Deploy your Lambda
