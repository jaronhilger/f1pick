'use strict';

exports.get = function(event, context, callback) {
  console.log("## EVENT");
  console.log(JSON.stringify(event, null, 2));  
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