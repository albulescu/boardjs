'use strict';

define(['./core'], function(BoardJS) {


	/**
	 * Matrix transformations
	 */

	BoardJS.Transform = function( matrix ) {
		this.matrix = matrix;
	};

	BoardJS.Transform.prototype = {


		/**
		 * Clone this transform object
		 * @return {BoardJS.Transform} Transform object
		 */
		clone: function() {
            return new BoardJS.Transform( this.matrix );
        },

        /**
         * Transform point
         * @param  {[type]} p [description]
         * @return {[type]}   [description]
         */
        point: function(/*point*/) {
			var p = BoardJS.Geom.Point.read(arguments);
            return {
                x: this.matrix[0] * p.x + this.matrix[2] * p.y + this.matrix[4],
                y: this.matrix[1] * p.x + this.matrix[3] * p.y + this.matrix[5]
            };
        },

        translate: function(x, y) {
            this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
            this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;
        },

        /**
         * Scale this matrix
         * @param  {number} sx
         * @param  {number} sy
         * @return {void}
         */
        scale: function(sx, sy) {
            this.matrix[0] *= sx;
            this.matrix[1] *= sx;
            this.matrix[2] *= sy;
            this.matrix[3] *= sy;
        },

        /**
         * Rotate this matrix
         * @param  {number} rad Radians
         * @return {void}
         */
        rotate: function(rad) {
            var c = Math.cos(rad);
            var s = Math.sin(rad);
            var m11 = this.matrix[0] * c + this.matrix[2] * s;
            var m12 = this.matrix[1] * c + this.matrix[3] * s;
            var m21 = this.matrix[0] * -s + this.matrix[2] * c;
            var m22 = this.matrix[1] * -s + this.matrix[3] * c;
            this.matrix[0] = m11;
            this.matrix[1] = m12;
            this.matrix[2] = m21;
            this.matrix[3] = m22;
        },

        /**
         * Skew this matrix
         * @param  {number} sx scale x
         * @param  {number} sy scale y
         * @return {void}
         */
        skew: function(sx, sy) {
            var m11 = this.matrix[0] + this.matrix[2] * sy;
            var m12 = this.matrix[1] + this.matrix[3] * sy;
            var m21 = this.matrix[2] + this.matrix[0] * sx;
            var m22 = this.matrix[3] + this.matrix[1] * sx;
            this.matrix[0] = m11;
            this.matrix[1] = m12;
            this.matrix[2] = m21;
            this.matrix[3] = m22;
        },

        /**
         * Multiplay this matrix
         * @param  {BoardJS.Matrix} matrix
         * @return {void}
         */
        multiply: function( matrix ) {

            var m11 = this.matrix[0] * matrix.matrix[0] + this.matrix[2] * matrix.matrix[1];
            var m12 = this.matrix[1] * matrix.matrix[0] + this.matrix[3] * matrix.matrix[1];

            var m21 = this.matrix[0] * matrix.matrix[2] + this.matrix[2] * matrix.matrix[3];
            var m22 = this.matrix[1] * matrix.matrix[2] + this.matrix[3] * matrix.matrix[3];

            var dx = this.matrix[0] * matrix.matrix[4] + this.matrix[2] * matrix.matrix[5] + this.matrix[4];
            var dy = this.matrix[1] * matrix.matrix[4] + this.matrix[3] * matrix.matrix[5] + this.matrix[5];

            this.matrix[0] = m11;
            this.matrix[1] = m12;
            this.matrix[2] = m21;
            this.matrix[3] = m22;
            this.matrix[4] = dx;
            this.matrix[5] = dy;
        },

        /**
         * Invert this matrix
         * @return {void}
         */
        invert: function() {
            var d = 1 / (this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2]);
            var m0 = this.matrix[3] * d;
            var m1 = -this.matrix[1] * d;
            var m2 = -this.matrix[2] * d;
            var m3 = this.matrix[0] * d;
            var m4 = d * (this.matrix[2] * this.matrix[5] - this.matrix[3] * this.matrix[4]);
            var m5 = d * (this.matrix[1] * this.matrix[4] - this.matrix[0] * this.matrix[5]);
            this.matrix[0] = m0;
            this.matrix[1] = m1;
            this.matrix[2] = m2;
            this.matrix[3] = m3;
            this.matrix[4] = m4;
            this.matrix[5] = m5;
        },

        get translation() {
            return {
                x: this.matrix[4],
                y: this.matrix[5]
            };
        },

        get matrix() {
        	return this.matrix;
        },
	};
});
