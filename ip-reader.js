var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var salt = "=4-{.@hE]!EBk<o";
app.use(bodyParser());

app.post('/', function(req, res){
    res.json(req.body);
});

app.listen(3000);
