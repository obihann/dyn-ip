if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);

    redis.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis").createClient();
}

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var salt = "=4-{.@hE]!EBk<o";
app.use(bodyParser());

app.post('/', function(req, res){
    var data = req.body;
    redis.get("current_ip", function(err, reply){
        if(reply) {
            redis.set("old_ip", reply, redis.print);
        }

        redis.set("current_ip", data.ip, redis.print);
    });

    res.json({success: true});
});

app.get('/old', function(req, res){
    redis.get("old_ip", function(err, reply){
        res.send(reply);
    });
});

app.get('/', function(req, res){
    redis.get("current_ip", function(err, reply){
        res.send(reply);
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on port: " + port);
});
