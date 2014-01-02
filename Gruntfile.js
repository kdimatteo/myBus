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
			css: {
				src: 'css/*',
				dest: 'dist/',
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
				src: "dist/js/app.min.js",
				dest: "dist/js/app.min.js",
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
				exclusions: ['/path/to/source/folder/**/.DS_Store', '/path/to/source/folder/**/Thumbs.db', 'dist/tmp'],
				server_sep: '/'
			}
		}


	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks("grunt-remove-logging");
	grunt.loadNpmTasks('grunt-useref');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-sftp-deploy');

	grunt.registerTask('default', ['clean', 'copy', 'requirejs', 'removelogging', 'useref']);
	grunt.registerTask('deploy', ['clean', 'copy', 'requirejs', 'removelogging', 'useref', 'sftp-deploy']);



};
