define(["approuter"], function(AppRouter){
	
	"use strict";

	$(document).ready(function(){
		var appRouter = new AppRouter();
		Backbone.history.start();
	});

});
