/**
 *
 * @file /js/
 * @fileoverview A View
 * @author Keith DiMatteo
 * @todo merge with outbound view, ended up being the same anyway
 */

define(function(){
	"use strict";
		
	return Backbone.View.extend({

		events: {
			
		},

		initialize: function(){
			this.collection.bind("reset", this.render, this);
		},

		/**
		 * we do not need to check direction since this stop ID only exists inbound
		 */
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
			this.$el.html(myList);
			return this;
		}

	});
});
