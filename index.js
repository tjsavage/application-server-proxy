var httpProxy = require('http-proxy');
var fs = require('fs');

var podConfig = JSON.parse(fs.readFileSync('~/.podrc', 'utf-8'));

console.log("podConfig:", podConfig);
