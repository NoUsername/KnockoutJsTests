(function($) {
	"use strict";
	var app = window.app || {};
	window.app = app;
	app.comm = app.comm || {};

	var gridSize = 2500;
	var emptyMarker = "#000";
	var userMarker = get_random_color(); //String.fromCharCode(65 + Math.floor(Math.random()*20));
    
    function get_random_color() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

	function DivGridViewModel() {
		var self = this;
		self.divs = Array();

		for (var i=0; i<gridSize; i++) {
			self.divs.push(ko.observable(emptyMarker));
		}
	}

	function getIndex(obj) {
		return parseInt($(obj).attr('data-idx'));
	}


	app.start = function() {
		var container = $('#container');
		for (var i=0; i<gridSize; i++) {
			container.append('<div data-bind="style: { backgroundColor: divs['+i+']() }" data-idx="'+i+'">&nbsp;</div>');
		}
        
        $("body").css('background-color', userMarker);

		app.viewModel = new DivGridViewModel();
		ko.applyBindings(app.viewModel);

		$(document).on('mouseenter', '#container>div', function(e) {
			//console.log("mouse entered");
			var idx = getIndex(e.target);
			app.viewModel.divs[idx](userMarker);
			app.comm.send(idx, userMarker);
		});

		$(document).on('mouseout', '#container>div', function(e) {
			//console.log("mouse left");
			var idx = getIndex(e.target);
			app.viewModel.divs[idx](emptyMarker);
			app.comm.send(idx, emptyMarker);
		});

		app.comm.setup();
	};

	app.comm.setup = function() {
		var wsUrl = "ws://localhost:8080/";
		console.log("trying to establish websocket connection with " + wsUrl);
		var socket = new WebSocket(wsUrl);  

		app.comm.socket = socket;

		socket.onopen = function() {
			console.log("connected");
		};

		socket.onmessage = function(message) {
			var msg = message.data;
			var objs = msg.split(";");
			var idx = parseInt(objs[0]);
			var value = objs[1];
            if (isNaN(idx)) {
                console.log("not a number: " + msg);
                return;
            }
            app.viewModel.divs[idx](value);
		};

		socket.onclose = function(){
			console.log("ws conn closed!");
		};
	};

	app.comm.send = function(idx, val) {
		if (app.comm.socket) {
			app.comm.socket.send(idx+";"+val);
		}
	};

})(jQuery);