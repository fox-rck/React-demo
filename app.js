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

app.listen(3000, function(){
	console.log("Express server listening at http://127.0.0.1:3000");
});