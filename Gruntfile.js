module.exports = function(grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		clean: {
            clean: [ './dist' ],
            postBuild: [ './dist/js/app.js' ]
        },
       

		copy: {
			main: {
				src: 'index.html',
				dest: 'dist/index.html',
			},
			css: {
				src: 'css/*',
				dest: 'dist/',
			}
		},

		/**
		 * for some reason requireJS optimization is truncating app.min.js during build. 
		 * we have a distinct task for this below.
		 */
		requirejs: {
			compile: {
				options: {
					//almond: true,
					name : 'main',
					//optimize: 'uglify2',
					optimize: 'none', 
					baseUrl: "js",
					mainConfigFile: "js/config.js",
					out: "dist/js/app.js",
					preserveLicenseComments: false,
					wrap:true,
					include: 'vendor/require.js'

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
					'dist/js/app.min.js': ['dist/js/app.js']
				}
			}
		},

		/**
		 * requires a .ftppass file which is omitted from this repo. 
		 * this file contains a JS object such as :
		 * {
  		 * 	"key1": {
     	 *		"username": "haut",
    	 * 		"password": "hau667gough"
  		 *	}
  		 *}
		 */
		'sftp-deploy': {
			build: {
				auth: {
					host: 'hauthaus.net',
					port: 22,
					authKey: 'key1'
				},
				src: './dist',
				dest: '/home/haut/hauthaus.net/bus',
				exclusions: ['/path/to/source/folder/**/.DS_Store', '/path/to/source/folder/**/Thumbs.db', 'dist/tmp'],
				server_sep: '/'
			}
		}


	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks("grunt-remove-logging");
	grunt.loadNpmTasks('grunt-useref');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-sftp-deploy');


	grunt.registerTask('default', ['copy', 'requirejs', 'removelogging', 'useref', 'uglify']);
	grunt.registerTask('deploy', ['clean', 'copy', 'requirejs', 'removelogging', 'useref', 'uglify', 'clean:postBuild', 'sftp-deploy']);



};

