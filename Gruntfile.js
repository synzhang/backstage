module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['dist/']
    },

    copy: {
      build: {
        files: [
          { src: 'images/**', dest: 'dist/' },
          { src: 'templates/**', dest: 'dist/' },
          { src: 'index.html', dest: 'dist/' }
        ]
      }
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
      build: {
        options: {
          appDir: 'scripts/',
          dir: 'dist/scripts/',
          mainConfigFile: 'scripts/config.js',
          paths: {
            jquery: 'http://cdn.staticfile.org/jquery/1.10.2/jquery.min'
          },
          modules: [
            { name: 'app/main/index' },
            { name: 'app/main/accordion' },
            { name: 'app/main/dialog' },
            { name: 'app/main/form' },
            { name: 'app/main/panel' },
            { name: 'app/main/tab' },
            { name: 'app/main/table' }
          ],
          removeCombined: true
        }
      }
    },

    connect: {
      develop: {
        options: {
          port: 9001,
          base: '.'
        }
      },
      build: {
        options: {
          port: 9002,
          base: 'dist'
        }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:<%= connect.develop.options.port %>'
      },
      build: {
        path: 'http://localhost:<%= connect.develop.options.port %>/dist/index.html'
      }
    },

    watch: {
      livereload: {
        options: { livereload: true },
        files: ['**/*']
      }
    }
  });

  // Load the plugin.
  // grunt.loadNpmTasks('grunt-contrib-csslint');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-kss');
  // grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-css-combo');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Task(s).
  grunt.registerTask('default', ['connect:develop', 'open:dev', 'watch:livereload']);
  grunt.registerTask('build', ['clean:build', 'css_combo', 'cssmin', 'requirejs:build', 'copy:build', 'connect:build', 'open:build']);

};
