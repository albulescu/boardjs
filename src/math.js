define(['./core'], function( BoardJS ) {

	BoardJS.Math = {

		/**
		 * Distance between two points
		 * @param  {BoardJS.Point} a Point 1
		 * @param  {BoardJS.Point} b Point 2
		 * @return {number}   The distance b
		 */
		distance : function( a, b ) {

			var xs = 0;
			var ys = 0;

			xs = b.x - a.x;
			xs = xs * xs;

			ys = b.y - a.y;
			ys = ys * ys;

			return Math.sqrt( xs + ys );
		}
	};

	return BoardJS.Math;

});