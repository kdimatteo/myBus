
/**
 * get stops for a specifc bus (we do not care about inbound/outbound)
 * @usage
 * node get_stops.js 93
 * yields stop id and display_name for all stops on the 93 bus
 */
var request = require('request'),
  JSONStream = require('JSONStream'),
  colors = require('colors'),
  es = require('event-stream');

var u = 'http://proximobus.appspot.com/agencies/mbta/routes/' + process.argv[2] + '/stops.json';

j = request({url: u})
  .pipe(JSONStream.parse())
  .pipe(es.mapSync(function (data) {
    data.items.forEach(function(r){
      if(r.id !== undefined){
        id = r.id.green
      } else {
        id = r.id
      }
      console.log(id + ": " + r.display_name);
    });
  })
);
