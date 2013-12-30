var require = {

    // Initialize the application with the this file.
    //deps: ['main'],

    paths: {

        jquery:         'vendor/jquery-1.8.2.min',

        underscore:     'vendor/lodash.compat',

        backbone:       'vendor/backbone-min',

        modernizr:      'vendor/modernizr.custom.49724',

        mustache:      'vendor/mustache',

        string:         'utils/string'


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
        },

        string: {
            exports: "string",
        }

    }
};