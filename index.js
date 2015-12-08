var httpProxy = require('http-proxy');
var fs = require('fs');

var podConfig = JSON.parse(fs.readFileSync(process.env.HOME + '/.podrc', 'utf-8'));

var router = {};

for (var key in podConfig.apps) {
   var app = podConfig.apps[key];

   if ('root_url' in app) {
     router[app.root_url] = 'http://127.0.0.1:' + app.port;
   }
}

var proxy = httpProxy.createProxy();

var server = require('http').createServer(function(req, res) {
  if (req.headers.host in router) {
    proxy.web(req, res, {
      target: router[req.headers.host]
    })
  } else {
    res.end('No proxy match for ' + req.headers.host);
  }

}).listen(process.env.PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("pod-proxy listening at http://%s:%s", host, port);
});
