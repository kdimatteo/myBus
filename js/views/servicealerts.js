define(["backbone", "mustache", "text!templates/alert.html"], function(Backbone, Mustache, tplAlert){
  "use strict";

  return Backbone.View.extend({
    
    initialize: function(){
      this.collection.bind("reset", this.render, this);
    },

    render: function(){
      if(this.collection.toJSON()[0]['alerts']){
        var o = _.first(this.collection.toJSON()[0]['alerts']);
        var utcSeconds = parseInt(o.last_modified_dt);
        var d = new Date(0);
        d.setUTCSeconds(utcSeconds);
        o.last_modified_date = d.toLocaleString();

        var template = Mustache.render(tplAlert, o);
        this.$el.html(template);
      }
    }

  });
});