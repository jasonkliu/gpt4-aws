// import { Configuration, OpenAIApi } from "openai";
const Configuration = require('openai').Configuration;
const OpenAIApi = require('openai').OpenAIApi;

// Just for storing the API key, could use a different system
const aws = require('aws-sdk');
const ssm = new aws.SSM();

module.exports.handler = async (event) => {
  
  const apiKey = await getSecret();
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  if (!configuration.apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "OpenAI API key not configured, please follow instructions in README.md",
          input: event,
        },
        null,
        2
      ),
    };
  }

  input = JSON.parse(event.body);
  const system = input.system || '';
  const message = input.user || '';

  if (message.trim().length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Please enter a valid prompt",
          input: event,
        },
        null,
        2
      ),
    };
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      "messages": [
        {"role": "system", "content": system},
        {"role": "user", "content": message}
      ],
      temperature: 0.6,
    });
    console.log(completion.data.choices[0].message.content);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: completion.data.choices[0].message.content,
          input: event,
        },
        null,
        2
      ),
    };
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: error.response.data,
            input: event,
          },
          null,
          2
        ),
      };
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return {
        statusCode: 500,
        body: JSON.stringify(
          {
            message: 'An error occurred during your request.',
            input: event,
          },
          null,
          2
        ),
      };
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Success: " + event.body,
        input: event,
      },
      null,
      2
    ),
  };
};


// https://scratchpad.blog/serverless/managing-secrets-for-aws-lambda/
async function getSecret() {
  const params = {
    Name: 'openai',
    WithDecryption: true
  };

  const result = await ssm.getParameter(params).promise();
  return result.Parameter.Value
}
