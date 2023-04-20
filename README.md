# gpt4-aws

The goal is to run the GPT4 API via a one-line script on the command line as a serverless function.
There are two different APIs: one where you preset the system message
(`index.js/index.sh`) and one where you pass in the system message (`system.js/system.sh`).

The main problem is function execution time because GPT4 is slow.
On the hobby (free) plan, Vercel is limited to 10s timeout. The pro plan has a 60s timeout.
AWS Lambda functions have 900s timeout, but AWS API Gateway actually has a 30 second timeout.
What this means in specific is that if you have a Lambda function behind an API gateway, you can only run functions for 30 seconds.
So, the solution is to use a Lambda function URL which has no timeout: https://docs.aws.amazon.com/lambda/latest/dg/urls-tutorial.html

You can check which models you have access to with `test-model.sh`.

### Setup

```
  $ npm install -g serverless
  $ npm install
  $ aws ssm put-parameter --name openai --value 'sk-IIxxx' --type SecureString # Store your API key in AWS SSM
  $ sls deploy
```

This should give you two Lambda functions named `aws-node-http-api-dev-api` and
`aws-node-http-api-dev-system`, running off of `index.js` and `system.js` respectively.

Now, login to the Lambda console and go to Configuration > Function URL. Create it with the following settings:

- Auth type: NONE
- Invoke mode: BUFFERED (default)
- Configure cross-origin resource sharing (CORS): Yes
- Allow origin: *
- Allow headers: origin, content-type, accept (separate fields)
- Allow methods: *
- Allow credentials: On

Paste the URLs into `index.sh` and `system.sh` and you're good to go.

