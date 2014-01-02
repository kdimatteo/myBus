/**
 *
 * @file /js/
 * @fileoverview A View
 * @author Keith DiMatteo
 * @todo merge with inbound view, ended up being the same anyway
 */

define(["backbone"], function(Backbone){

	"use strict";
		
	return Backbone.View.extend({

		events: {
			
		},

		initialize: function(){
			this.collection.bind("reset", this.render, this);
		},

		genList: function(){
			var html = "";
			var o = this.collection.toJSON();
			_.each(o[0].items, function(o, i, list){
				html += "<li>" + o.route_id + " Bus arriving in " + o.minutes + " minutes.</li>";
			}, this);
			return html;
		},

		render: function(){
			var myList = this.genList();
			//console.log(this.collection.toJSON());
			this.$el.html(myList);
			return this;
		}

	});
});
