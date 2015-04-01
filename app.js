'use static';
var express = require("express")
, bodyParser = require('body-parser')
, serveStatic = require('serve-static')

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(serveStatic('./build', {'index': ['index.html', 'index.htm']}));
app.use(serveStatic('./public', {'index': null}));

// app.post('/api/authenticate', function (req, res) {
//   console.log(req.body)
//   var pass = req.body.pass;
//   var ret = ""
//   if(pass == "Fox") {
//     ret = req.body
//   } 
//     res.send(ret)
// });

app.listen(3000);