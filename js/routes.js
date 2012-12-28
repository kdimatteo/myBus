/**
 * @todo simplify on inbound + outbound views, ended up being the same anyway
 */
define(["views/mainnav", "views/inbound", "views/outbound", "models/times", "utils/messagebus"],
    function(MainNavView, InboundView, OutboundView, TimesCollection, MessageBus){

    "use strict";
    
    return Backbone.Router.extend({
        
        currentView : "",
        mainNav : null,
        refresh: 0,

        routes: {
            ""          : "main",
            "inbound"   : "showInbound",
            "outbound"  : "showOutbound"
        },

        initialize: function(){

            MessageBus.on("ChangePage", function(args){
                this.navigate(args.hash, {trigger:true});
                $("#timesContainer").empty();
                $("#timesContainer").html("<div style='text-align:center; padding-top:30px;'><img src='i/loading.gif'></div>");
                
            }, this);

        },

        main: function(){
            var now = new Date();
            if(now.getHours() >= 15){
                this.navigate("outbound", {trigger:true});
            } else {
                this.navigate("inbound", {trigger:true});
            }
        },

        addNav: function(mode){
            if(this.mainNav === null){
                this.mainNav = new MainNavView({el:"#navContainer", mode:mode});
                this.mainNav.render();
            }
        },

        switchView: function(newView){
            if (this.currentView !== undefined && this.currentView !== newView){
                //this.currentView.undelegateEvents();
                this.currentView = newView;
                clearInterval(this.refresh);
            }
        },

        /**
         * need stopID:
         * @see http://proximobus.appspot.com/agencies/mbta/routes/92/stops.json
         *
         */
        showOutbound: function(){
            var timesCollection = new TimesCollection();
            timesCollection.stopID = "16540"; // 92 @ franklin st @ washinton st
            
            var timesView = new OutboundView({el:"#timesContainer", collection:timesCollection});
            timesCollection.fetch();

            this.switchView(timesView);

            this.refresh = setInterval(function(){
                timesCollection.fetch();
            }, 30000);

            this.addNav("outbound");
            
        },

        showInbound: function(){
            var timesCollection = new TimesCollection();
            timesCollection.stopID = "02848";

            var timesView = new InboundView({el:"#timesContainer", collection:timesCollection});
            timesCollection.fetch();

            this.switchView(timesView);

            this.refresh = setInterval(function(){
                timesCollection.fetch();
            }, 30000);

            this.addNav("inbound");
        }

	});

});
