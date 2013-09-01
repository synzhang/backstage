module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['dist']
    },

    css_combo: {
      combo: {
        files: {
          'dist/styles/backstage.css': ['styles/backstage.css']
        }
      }
    },

    cssmin: {
      compress: {
        files: {
          'dist/styles/backstage.css': ['dist/styles/backstage.css']
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          appDir: 'scripts',
          dir: 'dist/scripts',
          baseUrl: './',
          mainConfigFile: 'scripts/config.js',
          paths: {
            jquery: 'lib/jquery'
          },
          findNestedDependencies: true,
          modules: [
            {name: 'app/main/common'},
            {name: 'app/main/accordion'},
            {name: 'app/main/dialog'},
            {name: 'app/main/tab'},
            {name: 'app/main/table'}
          ]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9001
        }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:<%= connect.server.options.port %>'
      },
      build: {
        path: 'http://localhost:<%= connect.server.options.port %>/dist/index.html'
      }
    },

    watch: {
      options: {
        nospawn: true
      },

      livereload: {
        files: ['*'],
        tasks: 'default',
        options: { livereload: true }
      }
    }
  });

  // Load the plugin.
  // grunt.loadNpmTasks('grunt-contrib-csslint');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-css-combo');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['connect:server', 'open:dev', 'watch:livereload']);
  grunt.registerTask('build', ['clean', 'css_combo', 'cssmin', /* 'requirejs', */'connect:server', 'open:build', 'watch:livereload']);

};
