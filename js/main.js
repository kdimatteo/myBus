(function(require) {
    'use strict';
    require([
        'approuter'
    ],

    function(AppRouter) {
        var appRouter = new AppRouter();
		Backbone.history.start();
    });

}(require));
