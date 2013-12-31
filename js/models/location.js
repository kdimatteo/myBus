/** 
 * geo.js
 */


define([
	"models/stops",
	"utils/messagebus",
	"modernizr",
	"geoMobile"
], function(
	Stops,
	MessageBus,
	Modernizr,
	GeoMobile
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
		geoMobile   : GeoMobile,

		initialize : function(){
			this.collection.bind("reset", this.onStopsLoaded, this);
			this.stops = this.collection.fetch();
			var that = this;
			var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 90000 };
			
			if(geo_position_js.init()){
				geo_position_js.getCurrentPosition(that.onPositionLoaded, that.onError, options);
			} else {
 				//navigator.geolocation.getCurrentPosition(this.onPositionLoaded);
				navigator.geolocation.getCurrentPosition(that.onPositionLoaded, this.onError, options);
			}
		},

		onError : function(s){
			_.each(s, function(i, k){
				$("#timesContainer").append("<li>" + i + ", " + k + "</li>");
			});
			//document.write(s);
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
			var html = "";
			_.each(this.collection.toJSON()[0]["items"], function(item){
				var o = {};
				o.displayName = item.display_name.trim();
				o.d = this.calcDistance(item.longitude, item.latitude);
				o.stopID = item.id
				this.distances.push(o);

				html += '<option value="'+o.stopID+'">' + o.displayName + '</option>';

			}, this);

			var o = _.sortBy(this.distances, 'd');
			console.log(o[0]);
			this.closestStop = o[0];

			//$("#userStop").html(html);
			//$("#userStop").val(o[0]["stopID"]);
			
			MessageBus.trigger('LocationLoaded');

			//console.log(this.distances.orderBy());
			//console.log(this.collection.toJSON()[0]["items"], this.latLon);
		}

	};

	return LocationLib;
	//LocationLib.initialize();
});