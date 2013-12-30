/** 
 * geo.js
 */


define([
	"models/stops",
	"utils/messagebus",
	"modernizr",
], function(
	Stops,
	MessageBus,
	Modernizr
){
	"use strict";
	var LocationLib = {
	
		closestStop : {},
		stops 		: {},
		latLon 		: {},
		hasStops 	: false,
		hasLocation : false,
		collection 	: new Stops(),
		distances 	: [],
		displayName : "",

		initialize : function(){
			this.collection.bind("reset", this.onStopsLoaded, this);
			this.stops = this.collection.fetch();
			var that = this;
			//navigator.geolocation.getCurrentPosition(this.onPositionLoaded);
			navigator.geolocation.getCurrentPosition(that.onPositionLoaded);

		},
		
		checkRender : function(){
			if(this.hasLocation && this.hasStops){
				this.render();
			}
		},

		onStopsLoaded : function(){
			this.hasStops = true;
			this.checkRender();
		},

		onPositionLoaded : function(g){
			LocationLib.hasLocation = true;
			LocationLib.latLon = g.coords;
			LocationLib.checkRender();
		},

		/**
		 * Haversine
		 */
		calcDistance : function(lon2, lat2){

			var lon1 = this.latLon.longitude;
			var lat1 = this.latLon.latitude;

			var R = 6371; // km
			/*var dLat = (lat2 - lat1).toRad();
			var dLon = (lon2 - lon1).toRad();
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon/2) * Math.sin(dLon/2);
			*/
			
			var dLat = (lat2 - lat1) * Math.PI / 180;
			var dLon = (lon2 - lon1) * Math.PI / 180;
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);

			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var distance = R * c;
			return distance;
		},

		render : function(){
			_.each(this.collection.toJSON()[0]["items"], function(item){
				var o = {};
				o.displayName = item.display_name.trim();
				o.d = this.calcDistance(item.longitude, item.latitude);
				o.stopID = item.id
				this.distances.push(o);
			}, this);

			var o = _.sortBy(this.distances, 'd');
			console.log(o[0]);
			this.closestStop = o[0];


			MessageBus.trigger('LocationLoaded');

			//console.log(this.distances.orderBy());
			//console.log(this.collection.toJSON()[0]["items"], this.latLon);
		}

	};

	return LocationLib;
	//LocationLib.initialize();
});