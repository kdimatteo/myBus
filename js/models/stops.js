define(["backbone"], function(Backbone){
	
	"use strict";

	return Backbone.Collection.extend({

		routeID: 93,

		url: function(){
			return "http://proximobus.appspot.com/agencies/mbta/routes/" + this.routeID + "/stops.json";
		}

	});
});