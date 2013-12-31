/**
 * @todo simplify on inbound + outbound views, ended up being the same anyway
 */
define([
    "views/mainnav",
    "views/list",
    "models/times",
    "models/location",
    "utils/messagebus"
],
    function(
        MainNavView,
        ListView,
        TimesCollection,
        LibLocation,
        MessageBus
    ){

    "use strict";
    
    return Backbone.Router.extend({
        
        currentView : "",
        mainNav : null,
        refresh: 0,

        routes: {
            //"#!" : "foo"
            "inbound"   : "showInbound",
            "outbound"  : "showOutbound"
        },

        initialize: function(){

            MessageBus.on("ChangePage", function(args){
                this.navigate(args.hash, {trigger:true});
                $("#timesContainer").empty();
                $("#timesContainer").html("<div style='text-align:center; padding-top:30px;'><img src='i/loading.gif'></div>");
                
            }, this);

            MessageBus.on("LocationLoaded", function(){
                if(LibLocation.closestStop.displayName === "Bunker Hill St @ Sullivan St"){
                    this.navigate("inbound", {trigger:true});
                } else {
                    this.navigate("outbound", {trigger:true});
                }
            }, this);

            LibLocation.initialize();
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
            if(LibLocation.closestStop.stopID !== undefined){
                var timesCollection = new TimesCollection();
                //timesCollection.stopID = "16540"; // 92 @ franklin st @ washinton st
                timesCollection.stopID = LibLocation.closestStop.stopID;

                var timesView = new ListView({
                    el : "#timesContainer", 
                    collection : timesCollection, 
                    closestStop : LibLocation.closestStop.displayName
                });

                timesCollection.fetch();

                this.switchView(timesView);

                this.refresh = setInterval(function(){
                    timesCollection.fetch();
                }, 30000);

                this.addNav("outbound");
            } else {
                this.navigate("", {trigger:true});
            }
            
        },

        showInbound: function(){
            var timesCollection = new TimesCollection();
            timesCollection.stopID = "02848";

            var timesView = new ListView({
                el:"#timesContainer",
                collection:timesCollection,
                closestStop : "Home"
            });
            timesCollection.fetch();

            this.switchView(timesView);

            this.refresh = setInterval(function(){
                timesCollection.fetch();
            }, 30000);

            this.addNav("inbound");
        }

	});

});
