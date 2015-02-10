define(["backbone", "mustache", "text!templates/alert.html"], function(Backbone, Mustache, tplAlert){
  "use strict";

  return Backbone.View.extend({
    
    initialize: function(){
      this.collection.bind("reset", this.render, this);
    },

    render: function(){
      var o = _.first(this.collection.toJSON()[0]['alerts']);
      var template = Mustache.render(tplAlert, o);
      this.$el.html(template);
    }

  });
});