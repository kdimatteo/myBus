define(["backbone"], function(Backbone){
	"use strict";
	return Backbone.View.extend({

		initialize: function(){

		},

		onLocationChange: function(){

		},

		render: function(){
			var html = '';

			_.each(this.collection.toJSON()[0]["items"], function(item){
				html += '<li>'+o.displayName+'</li>';
			});
			$(this.el).html(html);
			return this;
		}

	});
});