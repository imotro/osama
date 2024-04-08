var express = require('express')
var Unblocker = require('unblocker');
var app = express();
var unblocker = new Unblocker({prefix: '/boom/'});
app.use(unblocker);
app.use(express.static('public'))
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' *");
  next();
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// the upgrade handler allows unblocker to proxy websockets
app.listen(process.env.PORT || 8080).on('upgrade', unblocker.onUpgrade);