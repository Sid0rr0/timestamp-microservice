// server.js
// where your node app starts

var path = require('path');
var env = require('dotenv').config({path: __dirname + '/.env'});

// init project
var express = require('express');
//var reload = require('express-reload');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function(req, res) {
  const newDate = new Date();

  res.json({
    "unix": newDate.getTime(),
    "utc": newDate.toUTCString()
  });
});

app.get("/api/timestamp/:date_string?", function(req, res) {
  const pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g;
  const numPatter = /^-{0,1}\d+$/;
  const date = req.params.date_string;

  if(!pattern.test(date) && !numPatter.test(date)) {
    res.json({"unix": null, "utc" : "Invalid Date" });
  } else {
    let resp = new Date(date);
    if(resp == "Invalid Date")
      resp = new Date(parseInt(date));
    
    res.json({
      "unix": resp.getTime(),
      "utc": resp.toUTCString()
    });
  }
});
/*
var path = __dirname + '/server.js';
console.log("aaaaaa" + path);
app.use(reload(path));
*/
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});