define(['./core'], function( BoardJS ) {

	BoardJS.Util = {

		/**
		 * Convert hex color to rgb
		 * @param  {string} hex color
		 * @return {array}     The [r,g,b] array
		 */
		hexToRgb : function( hex ) {
			var bigint = parseInt(hex, 16);
		    var r = (bigint >> 16) & 255;
		    var g = (bigint >> 8) & 255;
		    var b = bigint & 255;

		    return [r, g, b];
		},

		/**
		 * Convert rgb color to int
		 * @param  {int} r Red color
		 * @param  {int} g Green color
		 * @param  {b} b Blue color
		 * @return {int}
		 */
		rgbToInt = function(r, g, b) {
			var c = 0;
			c |= (r & 255) << 16;
			c |= (g & 255) << 8;
			c |= (b & 255);
			return c;
		}
	};

	return BoardJS.Util;
});