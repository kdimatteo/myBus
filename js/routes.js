/**
 * @todo simplify on inbound + outbound views, ended up being the same anyway
 */
define(["views/mainnav", "views/list", "models/times", "utils/messagebus"],
    function(MainNavView, ListView, TimesCollection, MessageBus){

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
                $("#timesContainer").addClass("loading");                
            }, this);
        },


        addNav: function(mode){
            if(this.mainNav === null){
                this.mainNav = new MainNavView({el:"#navContainer", mode:mode});
                this.mainNav.render();
            }
        },

        addRefresh: function(collection){
            this.refresh = setInterval(function(){
                collection.fetch();
            }, 30000);
        },

        switchView: function(newView){
            if (this.currentView !== undefined && this.currentView !== newView){
                this.currentView = newView;
                clearInterval(this.refresh);
            }
        },

        /**
         * routes
         * ------------------------------------------------------------------------------
         */
        
        /**
         * init the UI
         */
        main: function(){
            var now = new Date();
            if(now.getHours() >= 15){
                this.navigate("outbound", {trigger:true});
            } else {
                this.navigate("inbound", {trigger:true});
            }
        },

        /**
         * need stopID:
         * @see http://proximobus.appspot.com/agencies/mbta/routes/93/stops.json
         *
         */
        showOutbound: function(){
            var timesCollection = new TimesCollection("06548"); // milk & devonshire
            var timesView = new ListView({el:"#timesContainer", collection:timesCollection});
            timesCollection.fetch();
            this.switchView(timesView);
            this.addNav("outbound");
            this.addRefresh(timesCollection);
        },

        showInbound: function(){
            var timesCollection = new TimesCollection("02848");
            var timesView = new ListView({el:"#timesContainer", collection:timesCollection});
            timesCollection.fetch();

            this.switchView(timesView);
            this.addNav("inbound");
            this.addRefresh(timesCollection);
        }

	});

});
