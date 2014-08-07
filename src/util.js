'use strict';

define(['./core'], function( BoardJS ) {

	BoardJS.Util = {

		isElement: function(obj) {
            return !!(obj && obj.nodeType === 1);
        },

        isFunction: function(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        },

        isObject: function(obj) {
            return (!!obj && obj.constructor === Object);
        },

        isArray: function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },

        isNumber: function(obj) {
            return Object.prototype.toString.call(obj) === '[object Number]';
        },

        isString: function(obj) {
            return Object.prototype.toString.call(obj) === '[object String]';
        },
        
		/**
		 * Convert rgb color to int
		 * @param  {int} r Red color
		 * @param  {int} g Green color
		 * @param  {b} b Blue color
		 * @return {int}
		 */
		rgbToInt : function(r, g, b) {
			var c = 0;
			c |= (r & 255) << 16;
			c |= (g & 255) << 8;
			c |= (b & 255);
			return c;
		},
 		
 		/**
 		 * Convert hex color to rgb
 		 * @param  {string} hex color
 		 * @return {object}  r,g,b object
 		 */
 		hexToRgb: function(hex) {
            hex = hex.replace('#', '');
            var bigint = parseInt(hex, 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        },

       	/**
       	 * Generate random collor
       	 * @return {[type]} [description]
       	 */
		getRandomColor: function() {
            var randColor = (Math.random() * 0xFFFFFF << 0).toString(16);
            while (randColor.length < 6) {
                randColor = '0' + randColor;
            }
            return '#' + randColor;
        },

		toRadians : function( degrees ) {
			return degrees * ( Math.PI / 180 );
		},

		toDegrees : function( radians ) {
			return radians * ( 180 / Math.PI );
		}
	};

	return BoardJS.Util;
});