define(['./core'], function( BoardJS ) {

	BoardJS.Geom = {};

	BoardJS.Geom.Base = function() {};
	BoardJS.Geom.Base.prototype = {
		get bounds() {
			return null;
		}
	}


	var geom = function( c ) {
		c.prototype = BoardJS.Geom.Base.prototype;
		c.prototype.constructor = c;
		return c;
	}

	BoardJS.Geom.Point = geom(function( x, y ) {
		this.x = x;
		this.y = y;
	});
	
	BoardJS.Geom.Point.read = function( p ) {
		
		if( p.length == 1 && 
			p[0] instanceof BoardJS.Geom.Point) {
			return p[0];
		}
		if( p.length === 2 ) {
			var x = parseInt(p[0],10);
			var y = parseInt(p[1],10);

			if( !isNaN(x) && !isNaN(y)) {
				return new BoardJS.Geom.Point(x,y);
			}
		}

		throw new Error("Invalid params");
	};

	BoardJS.Geom.Point.prototype = {
		get bounds() {
			return [this.x, this.y, 0, 0];
		},

		clone : function() {
			return new BoardJS.Geom.Point(this.x, this.y);
		},

		add : function(/* point */) {
			var point = BoardJS.Geom.Point.read(arguments);
			this.x += point.x;
			this.y += point.y;
			return this;
		},

		subtract: function(/* point */) {
			var point = BoardJS.Geom.Point.read(arguments);
			this.x -= point.x;
			this.y -= point.y;
			return this;
		},

		rotate : function( angle, center ) {

			if( angle === 0 ) {
				return this.clone();
			}

			angle = angle * Math.PI / 180;

			var point = center ? this.subtract(center) : this, 
						s = Math.sin(angle),
						c = Math.cos(angle);

			point = new BoardJS.Geom.Point(
				point.x * c - point.y * s,
				point.x * s + point.y * c
			)

			if( center ) {
				point.add(center);
			}

			this.x = point.x;
			this.y = point.y;
		},

		transform: function(matrix) {

			if( matrix ) {
				matrix._transformPoint(this);
			}
		},

		negate : function() {
			this.x = this.x * -1;
			this.y = this.y * -1;
		},
	}

	BoardJS.Geom.Rect = geom(function( x, y, w, h ) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	});

	BoardJS.Geom.Rect.prototype = {
		get bounds() {
			return [this.x, this.y, this.w, this.h];
		}
	};

	/**
	 * Line geometry
	 */

	BoardJS.Geom.Line = geom(function( ax, ay, bx, by ) {
		this.ax = ax;
		this.ay = ay;
		this.bx = bx;
		this.by = by;
	});
	
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