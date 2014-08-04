define(['./core', './formatter'], function(BoardJS, Formatter) {

	BoardJS.Matrix = function() {

		var count = arguments.length,
			ok = true;
		if (count === 6) {
			this.set.apply(this, arguments);
		} else if (count === 1) {
			if (arg instanceof Matrix) {
				this.set(arg._a, arg._c, arg._b, arg._d, arg._tx, arg._ty);
			} else if (Array.isArray(arg)) {
				this.set.apply(this, arg);
			} else {
				ok = false;
			}
		} else if (count === 0) {
			this.reset();
		} else {
			ok = false;
		}
		if (!ok)
			throw new Error('Unsupported matrix parameters');
	};

	BoardJS.Matrix.prototype = {

		set: function(a, c, b, d, tx, ty) {
			this._a = a;
			this._c = c;
			this._b = b;
			this._d = d;
			this._tx = tx;
			this._ty = ty;
			return this;
		},

		clone: function() {
			return new Matrix(this._a, this._c, this._b, this._d,
					this._tx, this._ty);
		},

		/**
		 * @return {String} a string representation of this transform
		 */
		toString: function() {
			return '[[' + [Formatter.number(this._a), Formatter.number(this._b),
						Formatter.number(this._tx)].join(', ') + '], ['
					+ [Formatter.number(this._c), Formatter.number(this._d),
						Formatter.number(this._ty)].join(', ') + ']]';
		},

		/**
		 * Resets the matrix by setting its values to the ones of the identity
		 * matrix that results in no transformation.
		 */
		reset: function() {
			this._a = this._d = 1;
			this._c = this._b = this._tx = this._ty = 0;
			return this;
		},
	};

	return BoardJS.Matrix;

});