/**
 * http://realtime.mbta.com/developer/api/v2/ALERTSBYROUTE?api_key=wX9NwuHnZU2ToO7GmGR9uw&format=json&route=93
 */


 define(["backbone"], function(Backbone){
  "use strict";
  return Backbone.Collection.extend({
    url: 'http://realtime.mbta.com/developer/api/v2/ALERTSBYROUTE?api_key=wX9NwuHnZU2ToO7GmGR9uw&format=json&route=93'
  });
 });