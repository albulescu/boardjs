'use strict';

define(['./core'], function( BoardJS ){
	
	BoardJS.Formatter = {
		/**
		 * @param {Number} [precision=5] the amount of fractional digits.
		 */
		precision : 5,

		multiplier : Math.pow(10, this.precision),

		/**
		 * Utility function for rendering numbers as strings at a precision of
		 * up to the amount of fractional digits.
		 *
		 * @param {Number} num the number to be converted to a string
		 */
		number: function(val) {
			// It would be nice to use Number#toFixed() instead, but it pads with 0,
			// unecessarily consuming space.
			return Math.round(val * this.multiplier) / this.multiplier;
		},

		pair: function(val1, val2, separator) {
			return this.number(val1) + (separator || ',') + this.number(val2);
		},

		point: function(val, separator) {
			return this.number(val.x) + (separator || ',') + this.number(val.y);
		},

		size: function(val, separator) {
			return this.number(val.width) + (separator || ',') + this.number(val.height);
		},

		rectangle: function(val, separator) {
			return this.point(val, separator) + (separator || ',') + this.size(val, separator);
		}
	};

	return BoardJS.Formatter;
});