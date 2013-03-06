/**
* Author:   Paul Klingelhuber paul.klingelhuber@gmail.com
*/
(function($) {
	"use strict";
	var app = window.app || {};
	window.app = app;
	
	var eventCount = 0; // used to compute events/second
	var emptyMarker = "#000";
    var LINE_WIDTH = 100;
    var gridSize = LINE_WIDTH * LINE_WIDTH;
    
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
    
    var colorMap = {
    '_':'000000',
    'P':'FF0000',  // red (hat)
    '1':'E3D28D', // skin
    'S':'695919', // hair
    };
    
    function getCol(forChar) {
        if (colorMap.hasOwnProperty(forChar)) {
            return colorMap[forChar];
        }
        return 'FFFFFF';
    }

	app.recalculateEventsPerSecond = function() {
		var seconds = 5;
		app.viewModel.eventsPerSecond(eventCount / seconds);
		eventCount = 0;
		setTimeout(app.recalculateEventsPerSecond, seconds*1000);
	}

	app.start = function() {
		var container = $('#container');
		for (var i=0; i<gridSize; i++) {
			if (i>0 && i % LINE_WIDTH == 0) {
				container.append('<div class="breaker">&nbsp;</div>');
			}
			container.append('<div data-bind="style: { backgroundColor: divs['+i+']() }" data-idx="'+i+'">&nbsp;</div>');
		}
        
        mario = []
        for (var i=0; i<marioInput.length; i++)  {
            mario.push(marioInput[i].split(""));
        }
        
        app.viewModel = new DivGridViewModel();
        ko.applyBindings(app.viewModel);
        
        // create real mario array representation to work off later
        for (var x=0; x<mario.length; x++) {
            for (var y=0; y<mario[x].length; y++) {
                mario[x][y] = '#' + getCol(mario[x][y]);
                marioMaxWidth = Math.max(marioMaxWidth, mario[x].length);
            }
        }
        marioHeight = mario.length;
        
        MarioWalker(2,2, true);
        
		// start automatic recalc
		app.recalculateEventsPerSecond();
	};
    
    function MarioWalker(x,y, right) {
        var x1 = x, y1 = y;
        x1 = x + (right ? 1 : -1);
        if ( (right && x1 > LINE_WIDTH - marioMaxWidth) || (!right && x1 < 1) ) {
            right = ! right;
            y1 = y + 1;
        }
        if (y1 > LINE_WIDTH - marioHeight) {
            y1 = 0;
        }
        
        setTimeout(function() { MarioWalker(x1,y1,right); }, 50);
        drawMario(x,y);
    }
    
    function drawMario(xOffset, yOffset) {
        for (var y=0; y<mario.length; y++) {
            for (var x=0; x<mario[y].length; x++) {
                app.viewModel.divs[(y+yOffset)*LINE_WIDTH + x + xOffset](mario[y][x]);
            }
            eventCount += mario[y].length;
        }
    }

	
    var marioHeight = 0;
    var marioMaxWidth = 0;
    var mario = [];
    
    var marioInput = [
"__________________________________" ,    
"__________________PPPPPPPPPPPPP__" ,
"_____________PPPPPPPPPPPPPPPPPP__" ,
"___________PPPPPPPPPPPPPPPPP111______" ,
"_________PPPPPPPPPPPPPPPPP11111__________" ,
"_________PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP__" ,
"__________PPPPPPPPPPPPPPPPPPPPPPPPPPPPP__" ,
"________SSSSSSSSS11111111111111111________" ,
"_______SSSS1111SSS111111$$$111111111111__" ,
"______SSSS11111SSSSS11111111111111111111__" ,
"_____SSSSS11111SSSSSS11111111111111111111__" ,
"____SSSSS1111111SSSS11111111SSSS11111111__" ,
"____SSSSSS1111111111111SSSSSSSSSSSSSSSS__" ,
"____SSSSSSSS11111111111111SSSSSSSSSSSSS__" ,
"________SSSSSS11111111111111111111111__" ,
"__________SSSSS1111111111111111111____" ,
"______________111111111111111111____" ,
"____________SSPPPPSSSSSSSSSSPPPPSS____" ,
"__________SSSSPPPPSSSSSSSSSSPPPPSSSS____" ,
"________SSSSSSPPPPSSSSSSSSSSPPPPSSSSSS____" ,
"______SSSSSSSSPPPPSSSSSSSSSSPPPPSSSSSSSS__" ,
"____SSSSSSSSSSPPPPSSSSSSSSSSPPPPSSSSSSSSS__" ,
"___SSSSSSSSSSPPPPPSSSSSSSSSSPPPPPSSSSSSSSS__" ,
"__SSSSSSSSSSPPPPPPSSSSSSSSSSPPPPPPSSSSSSSSS__" ,
"_SSSSSSSSSSSPPPPPPSSSSSSSSSSPPPPPPSSSSSSSSSS__" ,
"_SSSSSSSSSSSPPPPPPPPPPPPPPPPPPPPPPSSSSSSSSSS__" ,
"_SSSSSSSSSSSPPP00PPPPPPPPPPPP00PPPSSSSSSSSSS__" ,
"_11111111111PPPPPPPPPPPPPPPPPPPPPP1111111111__" ,
"_11111111111PPPPPPPPPPPPPPPPPPPPPP1111111111__" ,
"__1111111111PPPPPPPPPPPPPPPPPPPPPP111111111__" ,
"____11111111PPPPPPPPPPPPPPPPPPPPPP1111111__" ,
"______1111PPPPPPPPPPPPPPPPPPPPPPPPPP1111____" ,
"_______SLPPPPPPPPPPPPPPPPPPPPPPPPPPPP______" ,
"______PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP____" ,
"____PPPPPPPPPPPPPPPPP____PPPPPPPPPPPPPPPPP____" ,
"____PPPPPPPPPPPPPPP________PPPPPPPPPPPPPPP____" ,
"____PPPPPPPPPPPPP____________PPPPPPPPPPPPP__" ,
"_____PPPPPPPPPPPP____________PPPPPPPPPPPP__" ,
"_______SSSSSSSSSS____________SSSSSSSSSS____" ,
"_______SSSSSSSSSS____________SSSSSSSSSS________" ,
"_______SSSSSSSSSS____________SSSSSSSSSS__________" ,
"_SSSSSSSSSSSSSSSS____________SSSSSSSSSSSSSSSS__" ,
"_SSSSSSSSSSSSSSSS____________SSSSSSSSSSSSSSSS__" ,
"__SSSSSSSSSSSSSSS____________SSSSSSSSSSSSSSS__",
"_______________________________________________"];


})(jQuery);