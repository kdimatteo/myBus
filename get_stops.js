
var request = require('request'),
  JSONStream = require('JSONStream'),
  es = require('event-stream'),
  u = 'http://proximobus.appspot.com/agencies/mbta/routes/93/stops.json';

j = request({url: u})
  .pipe(JSONStream.parse())
  .pipe(es.mapSync(function (data) {
    data.items.forEach(function(r){
      console.log(r.id + ": " + r.display_name);
    });
  })
);
