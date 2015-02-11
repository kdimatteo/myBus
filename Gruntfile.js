module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: {
            clean: [ './dist' ]
        },

        copy: {
            main: {
                src: 'index.html',
                dest: 'dist/index.html',
            },
            img: {
                src: 'i/*.png',
                dest: 'dist/'
            },
            config: {
                src: '.htaccess',
                dest: 'dist/.htaccess',
            }
        },

        requirejs: {
            compile: {
                options: {
                    //almond: true,
                    name : 'main',
                    optimize: 'none',
                    baseUrl: "js",
                    mainConfigFile: "js/config.js",
                    out: "dist/js/app.min.js",
                    preserveLicenseComments: false,
                    wrap:true,
                    include: 'vendor/requirejs/require.js'

                }
            }
        },

        compass: {                    
            dist: {    
              options: {
                config: 'config.rb'
                }
            }
        },

        useref: {
            // specify which files contain the build blocks
            html: 'dist/index.html',
            //html: '../dist/**/*.html',
            // explicitly specify the temp directory you are working in
            // this is the the base of your links ( "/" )
            temp: 'dist'
        },

        
        removelogging: {
            dist: {
                src: "dist/js/app.js",
                dest: "dist/js/app.js",
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            prod: {
                files: {
                    'dist/js/app.min.js': ['dist/js/app.min.js']
                }
            }
        },

        manifest: {
            generate: {
                options: {
                    basePath: 'dist',
                    cache: ['js/app.min.js', 'css/theme.css'],
                    network: ['*'],
                    //fallback: ['/ /offline.html'],
                    exclude: ['js/app.min.js', 'css/theme.css'],
                    preferOnline: true,
                    verbose: true,
                    timestamp: true,
                    hash: true,
                    master: ['index.html']
                },
                src: [
                    '*.html',
                    'js/*.js',
                    'css/*.css'
                ],
                dest: 'dist/manifest.appcache'
            }
        },
        
        hashres: {
            options: {
                // Optional. Format used to name the files specified in 'files' property.
                // Default value: '${hash}.${name}.cache.${ext}'
                fileNameFormat: '${name}.${hash}.${ext}',
                
                // Optional. Should files be renamed or only alter the references to the files
                // Use it with '${name}.${ext}?${hash} to get perfect caching without renaming your files
                // Default value: true
                renameFiles: true
            },
            prod: {
                src: [
                    'dist/js/*.js',
                    'dist/css/*.css'
                ],
                dest: 'dist/index.html',
            }
        },


        'sftp-deploy': {
            build: {
                auth: {
                    host: 'hauthaus.net',
                    port: 22,
                    authKey: 'key1'
                },
                src: './dist',
                dest: '/home/haut/hauthaus.net/bus',
                exclusions: ['get_stops.js', '**/.DS_Store', '**/Thumbs.db', 'dist/tmp'],
                server_sep: '/'
            }
        },

        watch: {
            files: ['js/models/*.js', 'js/views/*.js', 'js/*.js', 'js/templates/*.html', 'styles/*.scss'],
            tasks: ['watchtask']
        },

    
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-remove-logging");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-useref');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-sftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['clean', 'copy', 'compass', 'requirejs', 'removelogging', 'uglify', 'hashres', 'useref']);
    grunt.registerTask('deploy', ['clean', 'copy', 'compass', 'requirejs', 'removelogging', 'uglify', 'hashres', 'manifest', 'useref', 'sftp-deploy']);
    grunt.registerTask('watchtask', ['copy', 'compass', 'requirejs', 'useref']);

};
