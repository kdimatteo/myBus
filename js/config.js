var require = {

    // Initialize the application with the this file.
    //deps: ['main'],

    paths: {

        jquery:         'vendor/jquery-1.8.2.min',

        underscore:     'vendor/underscore-min',

        backbone:       'vendor/backbone-min',

        mustache:      'vendor/mustache'


    },

    // Shim those modules that are not set up for AMD
    // http://requirejs.org/docs/api.html#config-shim
    shim: {

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        underscore: {
            exports: '_'
        },

        mustache: {
            exports: "Mustache"
        }

    }
};