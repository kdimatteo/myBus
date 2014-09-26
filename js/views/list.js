/**
 *
 * @file /js/
 * @fileoverview A View
 * @author Keith DiMatteo
 */

define(["backbone"], function(Backbone){
	"use strict";
		
	return Backbone.View.extend({

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
			$("#timesContainer").removeClass("loading");
			this.$el.html(myList);
			return this;
		}

	});
});
