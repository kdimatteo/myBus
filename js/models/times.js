/**
 * http://proximobus.appspot.com/agencies/mbta/stops/" + this.stopID + "/predictions.js?callback=?"
 * http://proximobus.appspot.com/agencies/mbta/routes/93/stops
 */
define(["backbone"], function(Backbone){
	
	"use strict";

	return Backbone.Collection.extend({

		//model : Time,

		stopID : null,

		url: function(){
			return "http://proximobus.appspot.com/agencies/mbta/stops/" + this.stopID + "/predictions.js?callback=?";
		}

	});
});