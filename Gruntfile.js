module.exports = function(grunt) {

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
			fonts: {
				src: 'fonts/*',
				dest: 'dist/',
			},
		},


		useref: {
			// specify which files contain the build blocks
			html: 'dist/index.html',
			//html: '../dist/**/*.html',
			// explicitly specify the temp directory you are working in
			// this is the the base of your links ( "/" )
			temp: '/'
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files : {
					'dist/js/app.min.js' : [
						'js/vendor/jquery-2.0.3.js',
						'js/vendor/lodash.js',
						'js/app.js'
					]
				}
				//src: '../js/<%= pkg.name %>.js',
				//dest: 'dist/app.min.js'
			}
		},

		removelogging: {
			dist: {
				src: "js/app.js",
				dest: "js/app.js",
			}
		},


	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks("grunt-remove-logging");
	grunt.loadNpmTasks('grunt-useref');
	grunt.loadNpmTasks('grunt-contrib-uglify');


	grunt.registerTask('default', ['clean', 'copy', 'useref', 'removelogging', 'uglify']);

};

