/**
* Author:   Paul Klingelhuber paul.klingelhuber@gmail.com
*/
(function($) {
	"use strict";
	var app = window.app || {};
	window.app = app;
	app.comm = app.comm || {};

	app.isTouch = false;

	var eventCount = 0; // used to compute events/second
	var gridSize = 2500;
	var emptyMarker = "#000";
	var userMarker = get_random_color();
    
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
		self.eventsPerSecond = ko.observable(0);
		self.divs = Array();

		for (var i=0; i<gridSize; i++) {
			self.divs.push(ko.observable(emptyMarker));
		}
	}

	function getIndex(obj) {
		return parseInt($(obj).attr('data-idx'));
	}

	app.recalculateEventsPerSecond = function() {
		var seconds = 5;
		app.viewModel.eventsPerSecond(eventCount / seconds);
		eventCount = 0;
		setTimeout(app.recalculateEventsPerSecond, seconds*1000);
	}

	app.selectionChange = function(element, activated) {
		eventCount++;
		var idx = getIndex(element);
		var marker = activated ? userMarker : emptyMarker;
		app.viewModel.divs[idx](marker);
		app.comm.send(idx, marker);
	}


	app.start = function() {
		var container = $('#container');
		for (var i=0; i<gridSize; i++) {
			if (i>0 && i % 50 == 0) {
				container.append('<div class="breaker">&nbsp;</div>');
			}
			container.append('<div data-bind="style: { backgroundColor: divs['+i+']() }" data-idx="'+i+'">&nbsp;</div>');
		}
        
        $("body").css('background-color', userMarker);

		app.viewModel = new DivGridViewModel();
		ko.applyBindings(app.viewModel);

		app.lastTouched = null;
		$(document).on('mouseenter', '#container>div', function(e) {
			app.selectionChange(e.target, true);
			if (app.lastTouched != null) {
				app.selectionChange(app.lastTouched, false);
			}
			app.lastTouched = e.target;
		});
		
		// disable scrolling here
		$(document).on('touchstart', '#container>div', function(e) { return false; });
		$(document).on('touchmove', '#container>div', function(e) {
			app.touch = e;
			var posx = e.pageX, posy = e.pageY;
			if (posx === undefined) { // different apis
				posx = e.originalEvent.touches[0].pageX;
				posy = e.originalEvent.touches[0].pageY;
			}
			var elem = document.elementFromPoint(posx, posy);
			if (app.lastTouched != elem) {
				// changed element
				if (app.lastTouched != null) {
					app.selectionChange(app.lastTouched, false);
				}
				app.selectionChange(elem, true);
			}
			app.lastTouched = elem;
			e.preventDefault();
			e.stopPropagation();
			return false;
		});

		// start automatic recalc
		app.recalculateEventsPerSecond();
		app.comm.setup();

		try {
		   document.createEvent("TouchEvent");
		   app.isTouch = true;
		   // quick, hacky debug console for mobile devices
		   // console.log = function(data) { $('body').prepend("<div>" + data + "</div>"); };
		}
		catch (e) {}
	};

	app.comm.connected = false;

	app.comm.setup = function() {
		var wsUrl = "ws://"+document.location.hostname+":"+document.location.port+"/";
		console.log("trying to establish websocket connection with " + wsUrl);
		var socket = new WebSocket(wsUrl);  

		app.comm.socket = socket;

		socket.onopen = function() {
			app.comm.connected = true;
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
            eventCount++;
            app.viewModel.divs[idx](value);
		};

		socket.onclose = function(){
			app.comm.connected = false;
			console.log("ws conn closed!");
		};
	};

	app.comm.send = function(idx, val) {
		if (app.comm.connected) {
			app.comm.socket.send(idx+";"+val);
		}
	};

})(jQuery);