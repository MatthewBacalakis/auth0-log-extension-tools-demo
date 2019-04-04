# auth0-log-extension-tools Demo

## Introduction

This sample is intended to demonstrate using the [auth0-log-extension-tools](https://github.com/auth0-extensions/auth0-log-extension-tools) library to export logs from an Auth0 tenant. The library utilizes the [management api](https://auth0.com/docs/api/management/v2#!/Logs/get_logs) which allows logs to be retrieved in blocks of up to 100. [Rate limiting](https://auth0.com/docs/policies/rate-limits) also must be considered. It is provided for demo purposes only and should not be considered production ready.

## Setup

Create a .env file based on .env.sample template and provide values for Auth0 domain, client id, and secret. The client id and secret should be for an application authorized to the management api with scope `read:logs`. Set the value of START_FROM to the log_id of the entry from which to start retreiving logs.

## Running

`npm start` will start the sample.
