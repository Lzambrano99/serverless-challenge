<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This project is a serverless implementation using the NestJS framework and AWS Serverless services. It provides a scalable and efficient backend for building server-side applications. The integration with Serverless allows for easy deployment and management of your NestJS application on AWS.

## Installation

```bash
$ npm install -g serverless
$ npm install
```
### Serverless Credentials

Before deploying with Serverless, make sure to set up your AWS credentials. If you haven't configured your AWS credentials, you can do so by installing the AWS CLI and running:
```bash
$ aws configure
$ accessKeyId: YOUR_ACCESS_KEY_ID
$ secretAccessKey: YOUR_SECRET_ACCESS_KEY
$ region: YOUR_REGION
```

# build the Nest app
```bash
$ npm run build

# deploy using Serverless framework
$ sls deploy
```

Afther deploying, obtain the ARN of the DynamoDB table from your AWS console and update the serverless.yml file:

```bash
# serverless.yml

# ... (other configurations)

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  iamRoleStatements:
    - Effect: Allow
      Action: 
        - dynamodb:PutItem
        - dynamodb:GetItem
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: "YOUR_DYNAMODB_TABLE_ARN" # SET YOUR ARN TABLE
```
Finish:
```bash
$ npm run build

# deploy using Serverless framework
$ sls deploy
```

## Endpoints

Your Nest.js application is deployed as a Serverless service on AWS, and it exposes the following endpoints:

- **Base URL:** `https://3uowuddaw3.execute-api.us-east-1.amazonaws.com/dev/`
- **Example body:** 
```bash
{
  "name": "Jon Doe",
  "age": 31,
  "jobTitle": "Senior Software Engineer"
}
```
### Available Routes

- **Create Employee:**
  - **Endpoint:** `POST /employees/createEmployee`
  - **Description:** Create a new employee.

- **Get Employee by ID:**
  - **Endpoint:** `GET /employees/getEmployeeById/{id}`
  - **Description:** Get details of a specific employee by ID.

- **Update Employee:**
  - **Endpoint:** `PUT /employees/updateEmployee/{id}`
  - **Description:** Update information for a specific employee by ID.

- **Delete Employee:**
  - **Endpoint:** `DELETE /employees/deleteEmployee/{id}`
  - **Description:** Delete a specific employee by ID.

- **Get All Employees:**
  - **Endpoint:** `GET /employees/getAllEmployees`
  - **Description:** Get a list of all employees.

Feel free to modify this section according to your actual routes and endpoints. This provides users with a quick reference to understand how to interact with your deployed application.
Please note that the base URL https://3uowuddaw3.execute-api.us-east-1.amazonaws.com/dev/ is just an example, and you should replace it with the URL provided by your own Serverless deployment.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
