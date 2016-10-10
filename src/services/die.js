'use strict'

function Die(low, high, diecolor, dotcolor) {
	var self = this;
    var value = low;
    diecolor = diecolor || 'white';
	dotcolor = dotcolor || 'black'

	function randomBetween(low, high) {
		return Math.floor(Math.random()*(high-low+1)) + low;
	}

    self.color = function() {
    	return {
			die: diecolor,
			dot: dotcolor
		};
    }
	self.sides = function() {
		return high;
	}

    self.value = function(d) {
    	if (typeof d != 'undefined') {
        	value = d;
            if (value < low) {
            	value = low;
            } else if (value > high) {
            	value = high;
            }
        }
        return value;
    }

    self.increment = function(rollover) {
    	if (++value > high) {
        	value = rollover ? low : high;
        }
    }
    self.decrement = function(rollover) {
    	if (--value < low) {
        	value = rollover ? high : low;
        }
    }
    self.roll = function() {
    	value = randomBetween(low, high);
        return value;
    }
}

module.exports = Die;
