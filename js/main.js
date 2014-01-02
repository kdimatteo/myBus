(function(require) {
    'use strict';
    require([
        'routes'
    ],

    function(AppRouter) {
        var appRouter = new AppRouter();
		Backbone.history.start();
    });

}(require));