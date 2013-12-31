define(["backbone"], function(Backbone){
	"use strict";
	return Backbone.Collection.extend({
		

		/**
		 * Haversize equation to calc lat lon diffs.
		 */
		calcDistance : function(lon2, lat2){

			var lon1 = this.latLon.longitude;
			var lat1 = this.latLon.latitude;

			var R = 6371; // km
			
			var dLat = (lat2 - lat1) * Math.PI / 180;
			var dLon = (lon2 - lon1) * Math.PI / 180;
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);

			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var distance = R * c;
			return distance;
		},

		/**
		 * not n ajax call in this model, its the collection of stops NEARRST to the geo coords.
		 */
		fetch: function(){
			var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 90000 };
			
			if(geo_position_js.init()){
				geo_position_js.getCurrentPosition(that.onPositionLoaded, that.onError, options);
			} else {
 				//navigator.geolocation.getCurrentPosition(this.onPositionLoaded);
				navigator.geolocation.getCurrentPosition(that.onPositionLoaded, this.onError, options);
			}
		}
	});
});