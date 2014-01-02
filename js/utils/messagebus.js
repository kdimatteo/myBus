define(["underscore", "backbone"], function(_, Backbone) {
    'use strict';

    var _messageBus = _.extend({}, Backbone.Events);

    return {
        on: function(events, callback, context) {
            _messageBus.on(events, callback, context);
        },

        off: function(events, callback, context) {
            _messageBus.off(events, callback, context);
        },

        trigger: function(/*events*/) {
            _messageBus.trigger.apply(_messageBus, arguments);
        }
    };
});