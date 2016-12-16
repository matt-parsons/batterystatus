module.exports = function(grunt) {

  // View how long tasks take to run
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Paths
  var config = {
    dev: '_source/',
    tmp: '.tmp/',
    build: '_build/'
  };

  // Default Banner
  var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - built: ' +
    '<%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n';

	// Project configuration
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

	    mkdir: {
	      all: {
	        options: {
	          mode: 0700,
	          create: ['.tmp']
	        },
	      },
	    },

	    // Set Node Environment
	    env: {
	      dev: {
	        NODE_ENV: 'development'
	      },
	      build: {
	        NODE_ENV: 'production'
	      }
	    },
	    // Clean directories
	    clean: {
	      dev: config.tmp,
	      build: config.build
	    },
	    // Sync files
	    sync: {
	      dev: {
	        files: [
	          //Image files
	          {cwd: config.dev + 'images/', src: ['**/*.{jpg,jpeg,png,gif,svg,mp4,ico}'], dest: config.tmp + 'files/images/'},
	          //Assets files
	          {cwd: config.dev + 'assets/', src: ['**/*.{jpg,jpeg,png,gif,svg,mp4,ico}'], dest: config.tmp + 'files/assets/'},
	          //layout files
	          {cwd: config.dev + 'layout/', src: ['**/*.*'], dest: config.tmp + '/'},
	          //php files
	          {cwd: config.dev + 'php/', src: ['**/*.*'], dest: config.tmp + 'files/php/'}
	        ],
	        verbose: true,
	        updateOnly: true
	      },
	      build: {
	        files: [
	          //Image files
	          {cwd: config.dev + 'images/', src: ['**/*.{jpg,jpeg,png,gif,svg,mp4,ico}'], dest: config.build + 'files/images/'},
	          //Assets files
	          {cwd: config.dev + 'assets/', src: ['**/*.{jpg,jpeg,png,gif,svg,mp4,ico}'], dest: config.build + 'files/assets/'},
	          //layout files
	          {cwd: config.dev + 'layout/', src: ['**/*.*'], dest: config.build + '/'},
	          //php files
	          {cwd: config.dev + 'php/', src: ['**/*.*'], dest: config.build + 'files/php/'},
	        ],
	        verbose: true,
	        updateOnly: true
	      }
	    },
		concat: {
			options: {
				separator: '\n'
			},
			dev: {
				src: [config.dev + 'js/lib/jquery-1.8.3.min.js',
						config.dev + 'js/lib/modernizr.js',					
						config.dev + 'js/lib/preloadjs.min.js',
						config.dev + 'js/app/mainController.js',
						config.dev + 'js/app/utils.js'],
				dest: config.tmp + 'files/js/main.min.js'
			},
			build: {
				src: [config.dev + 'js/lib/jquery-1.8.3.min.js',
						config.dev + 'js/lib/modernizr.js',					
						config.dev + 'js/lib/preloadjs.min.js',
						config.dev + 'js/app/mainController.js',
						config.dev + 'js/app/utils.js'],
				dest: config.build + 'files/js/main.min.js'
			}
		},
	    autoprefixer: {
	      options: {
	        browsers: [
	          '> 1%', 'last 2 versions', 'ie 9', 'Firefox ESR'
	        ]
	      },
	      dev: {
	        src: config.tmp + 'files/css/main.css'
	      },
	      build: {
	        src: config.build + 'files/css/main.css'
	      }
	    },
	    sass: {
	      options: {
	        banner: banner,
	        compass: true,
	        quiet: true
	      },
	      dev: {
	        options: {
	          style: 'nested'
	        },
	        files: {
	          '.tmp/files/css/main.css': '_source/scss/main.scss'
	        }
	      },
	      build: {
	        options: {
	          style: 'compressed'
	        },
	        files: {
	          '_build/files/css/main.css': '_source/scss/main.scss'
	        }
	      }
	    },
	    uglify: {
	      options: {
	        banner: banner,
	        compress: {
	          drop_console: true
	        }
	      },
	      dev: {
	        files: {
	          '.tmp/files/js/main.js': [config.tmp + 'files/js/main.js']
	        }
	      },
	      build: {
	        files: {
	          '_build/files/js/main.min.js': [config.build + 'files/js/main.min.js']
	        }
	      }
	    },
	    watch: {
	      grunt: { files: ['Gruntfile.js'] },
	      sass: {
	        files: [config.dev + 'scss/{,*/}*.scss'],
	        tasks: ['sass:dev', 'autoprefixer:dev']
	      },
	      js: {
	        files: [config.dev+'js/**/*.js'],
	        tasks: ['concat:dev']
	      },
	      layout: {
	        files: [config.dev+'layout/*.*'],
	        tasks: ['sync:dev']
	      },
	      images: {
	        files: [config.dev+'images/*.*'],
	        tasks: ['sync:dev']
	      },
	      php: {
	        files: [config.dev+'php/*.*'],
	        tasks: ['sync:dev']
	      }
	    },
	      php: {
	          dev: {
	              options: {
	                  hostname: '127.0.0.1',
	                  port: 8010,
	                  base: '.tmp/'
	              }
	          }
	     },
	    // Browser Sync!
	     browserSync: {
	        options: {
	          watchTask: true,
	          proxy: "<%= php.dev.options.hostname %>:<%= php.dev.options.port %>",
	          // server: { baseDir: '.tmp' }
	        },
	        default_options: {
	          bsFiles: {
	            src: [
	              ".tmp/**/*"
	            ]
	          },
	          ghostMode: {
	              clicks: true,
	              scroll: true,
	              links: true,
	              forms: true
	          }
	        }
	      }


	});
	
	// Default task(s).
	grunt.registerTask('default', ['clean:dev', 'concat:dev', 'sass:dev', 'sync:dev','php:dev','browserSync', 'watch']);
	grunt.registerTask('build', ['clean:build', 'concat:build', 'uglify:build', 'sass:build', 'sync:build']);

};