require([], function(){

	console.log("view times is loaded")
	

	var thisView = Backbone.View.extend({
		
		tagName : 'li',

		initialize: function(){
			console.log("view init")
		},
		
		render: function(){return this}
	
	});
	return thisView;

	/*
	return Backbone.View.extend({

		//collection: Times,

		initialize: function() {
			console.log("timesView init")
	    	this.model.bind('change', this.render, this);
	    },

	    render:function(){

	    }

	});
*/
});