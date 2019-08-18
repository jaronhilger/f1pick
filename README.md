#F1 Project
---
The goal is to host an app where players can make their picks for the F1 season and the application will run the pool.

##MVP definition
---
    1. Users can use their email address and password to log in to the site.  You cannot access any data or services from the site without logging in
    2. Users can View results for all previous races.  Race results are made available within two hours of race completion.
    3. Users can always see their own picks for all races.
    4. Users cannot see picks for other users until the start of qualifying.
    5. Users cannot change their picks after the start of first practice.
    6. Users are notified 7 days in advance of the race start time and 24 hours before 1st practice starts
    7. Users are sent a link to the race results when they are avaialble

##AWS needs
---
    - Dynamo Table for user data and race data
    - Lambda function(s) and API gateway to serve webpages and data
    - SES/SNS to deliver email (possibly txts)
    - Cognito for user auth info (possibly their data too)
    - AWS Step function of Cloudwatch Events for scheduled events (like updates, data changes, and emails)

##File List
-----------
* README.md - this file
* buildspec.yml - used by AWS CodeBuild to package application for deployment to AWS Lambda
* index.js - contains the Node.js code for the web service
* template.yml - contains the AWS Serverless Application Model (AWS SAM) used by AWS CloudFormation to deploy
* tests/ - this directory contains unit tests for your application