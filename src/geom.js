define(['./core'], function( BoardJS ) {

	BoardJS.Geom = {};

	BoardJS.Geom.Point.Base = function() {};

	BoardJS.Geom.Point = function( x, y ) {
		this.x = x;
		this.y = y;
	};

	BoardJS.Geom.Point.prototype = BoardJS.Geom.Point.Base.prototype;

	BoardJS.Geom.Rect = function( x, y, w, h ) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	};

	BoardJS.Geom.Rect.prototype = {
		get bounds() {
			return [this.x, this.y, this.w, this.h];
		}
	};

	/**
	 * Line geometry
	 */

	BoardJS.Geom.Line = function( ax, ay, bx, by ) {
		this.ax = ax;
		this.ay = ay;
		this.bx = bx;
		this.by = by;
	};
	
	/**
	 * Calculate distance between two points
	 * @return {number} Distance of the line
	 */
	BoardJS.Geom.Line.prototype = {

		get width() {
			return BoardJS.Math.distance(
				new BoardJS.Geom.Point( this.ax, this.ay ),
				new BoardJS.Geom.Point( this.bx, this.by )
			);
		},

		get bounds() {

			return [Math.min(this.ax, this.bx),
					Math.min(this.ay, this.by),
					Math.max(this.ax, this.bx) - Math.min(this.ax, this.bx),
					Math.max(this.ay, this.by) - Math.min(this.ay, this.by)];
		}
	};

	return BoardJS.Geom;
	
});