var express = require("express");
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'views/index.html'));
});

var server = app.listen(3000, null);