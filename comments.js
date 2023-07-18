// create web server
// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 3000;
var server = http.createServer(function (request, response) {
    // console.log('someone connected to our server!');
    var parsedUrl = url.parse(request.url, true);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // console.log('trimmedPath', trimmedPath);
    var queryStringObject = parsedUrl.query;
    // console.log('queryStringObject', queryStringObject);
    var method = request.method.toLowerCase();
    // console.log('method', method);
    var headers = request.headers;
    // console.log('headers', headers);
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    request.on('data', function (data) {
        buffer += decoder.write(data);
    });
    request.on('end', function () {
        buffer += decoder.end();
        var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };
        chosenHandler(data, function (statusCode, payload) {
            // console.log('statusCode', statusCode);
            // console.log('payload', payload);
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};
            var payloadString = JSON.stringify(payload);
            response.setHeader('Content-Type', 'application/json');
            response.writeHead(statusCode);
            response.end(payloadString);
            // console.log('returning this response', statusCode, payloadString);
        });
    });
});
server.listen(port, function () {
    console.log("The server is listening on port " + port);
});
var handlers = {};
handlers.hello = function (data, callback) {
    callback(200, { 'message': 'Hello World! Welcome to my page.' });
};
handlers.notFound = function (data, callback) {
    callback(404);
};
var router = {
    'hello': handlers.hello
};
