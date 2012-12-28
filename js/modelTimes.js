require([], function(){
	return Backbone.Model.extend({

		defaults: {
			vehicle_id : "",
			block_id : "",
			run_id : "",
			seconds : 0,
			is_delayed : false,
			is_affected_by_layover : true,
			is_departing : false,
			route_id : "",
			minutes : 0
		}
		
	});
});