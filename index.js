'use strict';

// var fs = require('fs');
// var path = require('path');

exports.get = function(event, context, callback) {
  // console.log("## ENVIRONMENT VARIABLES");
  // console.log(JSON.stringify(process.env, null, 2));
  console.log("## EVENT");
  console.log(JSON.stringify(event, null, 2));
  // console.log("## EVENT PATH");
  // console.log(JSON.stringify(event.path, null, 2));
  // console.log("## CONTEXT");
  // console.log(JSON.stringify(context, null, 2));
  // let ParsedJSON = JSON.parse(JSON.stringify(event));
  // console.log("## REQUEST CONTEXT");
  // console.log(ParsedJSON.requestContext);
  // console.log("## REQUEST CONTEXT PATH");
  // if (ParsedJSON.requestContext.path) {console.log(ParsedJSON.requestContext.path)};

  // var contents = fs.readFileSync(`public${path.sep}index.html`);
  // let filePath = ''
  // if (event.path === '/') {
  //     filePath = `public${path.sep}index2.html`
  // } else {filePath = `public${event.path}.html`};
  // console.log(filePath);
  // var contents = fs.readFileSync(filePath);
  
  var result = {
    statusCode: 200,
    body: JSON.stringify(event, null, 2),
    headers: {
      'content-type': 'text/html',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
      }
  };

  callback(null, result);
};