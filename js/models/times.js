/**
 * http://proximobus.appspot.com/agencies/mbta/stops/" + this.stopID + "/predictions.js?callback=?"
 * http://proximobus.appspot.com/agencies/mbta/routes/93/stops
 */
define(["backbone"], function(Backbone){
	
	"use strict";

	return Backbone.Collection.extend({

    initialize: function(stopID){
      if(stopID){
        this.stopID = stopID
      } else {
        throw('You must include a stop ID');
      }
    },

		stopID : null,

		url: function(){
			return "http://proximobus.appspot.com/agencies/mbta/stops/" + this.stopID + "/predictions.js?callback=?";
		}

	});
});