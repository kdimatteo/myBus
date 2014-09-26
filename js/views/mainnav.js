/**
 *
 * @file /js/
 * @fileoverview A View
 * @author Keith DiMatteo
 */

define(["utils/messagebus", "text!templates/nav.html", "backbone", "mustache"], function(MessageBus, tplNav, Backbone, Mustache){
	return Backbone.View.extend({
		
		events: {
			"click #btnInbound"		: "onNavClick",
			"click #btnOutbound"	: "onNavClick"
		},

		initialize: function(){
			//this.collection.bind("reset", this.render, this);
		},

		onNavClick: function(e){
			var direction;
			if(e.currentTarget.id == "btnInbound"){
				direction = "inbound";
			} else {
				direction = "outbound";
			}
			MessageBus.trigger("ChangePage", {hash:direction});
			
			$("#btnInbound").removeClass("active");
			$("#btnOutbound").removeClass("active");
			$("#" + e.currentTarget.id).addClass("active");
		},

		getNavStatus: function(){
			var o = {};
			if(this.options.mode === "inbound"){
				o.hasInbound = "active";
			} else {
				o.hasOutbound = "active";
			}
			return o;
		},

		render: function(){
			var o = this.getNavStatus();
			var template = Mustache.render(tplNav, o);
			this.$el.html(template);
			return this;
		}

	});	
});
