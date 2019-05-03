'use strict';

var fs = require('fs');
var path = require('path');

exports.get = function(event, context, callback) {
  console.log('path');
  console.log(path.basename);
  console.log(path.extname);
  console.log(path.parse);

  var contents = fs.readFileSync(`public${path.sep}index.html`);
  var result = {
    statusCode: 200,
    body: contents.toString(),
    headers: {'content-type': 'text/html'}
  };

  callback(null, result);
};
