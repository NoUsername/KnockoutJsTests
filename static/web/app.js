#!/usr/bin/env node
var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();

var PORT = 80;

/*
app.get('/', function(req, res){
  res.send('hello world');
});
*/

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(PORT, function() {
    console.log((new Date()) + ' Server is listening on port ' + PORT);
});

var clients = Array();

function addClient(client) {
	clients.push(client);
}

function removeClient(client) {
	for (var i=0; i<clients.length; i++) {
		if (clients[i] == client) {
			clients.splice(i,1);
			break;
		}
	}
}

// ws api
var wss = new WebSocketServer({server: server});

wss.on('connection', function(ws) {
	clients.push(ws);

    ws.on('message', function(message) {
    	console.log("received: " + message);
        for (var i=0; i<clients.length; i++) {
        	if (clients[i] != ws) {
        		// send to everybody else
        		clients[i].send(message);
        	}
        }
    });

    ws.on('close', function() {
    	for (var i=0; i<clients.length; i++) {
    		if (clients[i] == ws) {
    			clients.splice(i,1);
    			break;
    		}
    	}
    });
});