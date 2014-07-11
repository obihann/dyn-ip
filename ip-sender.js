var http = require("http");
var salt = "=4-{.@hE]!EBk<o";

var optionsRead = {
    host: 'www.curlmyip.com',
    port: 80,
};

var get = http.request(optionsRead, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (ip) {
        var optionsSend = {
            host: '127.0.0.1',
            port: 3000,
            method: 'POST',
            path: '/',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        var send = http.request(optionsSend, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log(chunk);
            });
        });

        var postData = JSON.stringify({salt: salt, ip: ip});
        send.end(postData);
    });
});

get.end();
