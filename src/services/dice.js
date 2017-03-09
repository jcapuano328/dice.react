import {Range} from 'react-native-nub';
var Die = require('./die');
var Sound = require('./sound');


function Dice(opts) {
	var self = this;
    var dice = [];
    opts = opts || [{num: 1, low: 1, high: 6, diecolor: 'white', dotcolor: 'black'}];
	opts.forEach((opt) => {
		Range(opt.num).forEach((i) => {
	    	dice.push(new Die(opt.low, opt.high, opt.diecolor||opt.color, opt.dotcolor));
        });
	});

	self.count = function() {
    	return dice.length;
    }

    self.each = function(callback) {
    	dice.forEach((die, index) => {
        	callback(die, index);
        });
    }

	self.map = function(callback) {
    	return dice.map((die, index) => {
        	return callback(die, index);
        });
    }

    self.dice = function() {
        return dice.map((die) => {
        	return {
            	value: die.value(),
                color: die.color()
            };
        });
    }

    self.dieEx = function(i) {
    	if (--i >= 0 && i < dice.length) {
        	return dice[i];
        }
        return {};
    }

    self.die = function(i, d) {
    	var o = self.dieEx(i);
    	if (typeof d != 'undefined' && o.hasOwnProperty('value')) {
        	o.value(d);
        }
        return o.hasOwnProperty('value') ? o.value() : 0;
    }

    self.roll = function(i) {
    	if (typeof i != 'undefined') {
        	var d = self.dieEx(i);
            if (d && d.hasOwnProperty('roll')) {
            	d.roll();
                return d.value();
            }
            return 0;
        }

        Sound.play();
    	for (var i=0; i<dice.length; i++) {
        	dice[i].roll();
        }
    }
}

module.exports = {
	Die: Die,
	Dice: Dice
};
