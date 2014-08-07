'use strict';

define(['./core'], function( BoardJS ) {

	/**
	 * https://github.com/jeromeetienne/microevent.js
	 * MicroEvent - to make any js object an event emitter (server or browser)
	 */

	BoardJS.Events = function(){};

	BoardJS.Events.prototype = {

		bind : function(event, fct){
			this._events = this._events || {};
			this._events[event] = this._events[event]	|| [];
			this._events[event].push(fct);
		},
		unbind : function(event, fct){
			this._events = this._events || {};
			if( event in this._events === false  ) {
				return;
			}
			this._events[event].splice(this._events[event].indexOf(fct), 1);
		},
		trigger : function(event /* , args... */){
			this._events = this._events || {};
			if( event in this._events === false  ){
				return;
			}
			for(var i = 0; i < this._events[event].length; i++){
				this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}
	};

	return BoardJS;
});