module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      },
      less: {
        development: {
          options: {
            paths: ["web/less/"]
          },
          files: {
            "web/public/css/main.css": "web/less/main.less"
          }
        },
        production: {
          options: {
            paths: ["web/less/"]
          },
          files: {
            "web/public/css/main.css": "web/less/main.less"
          }
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-less');


  // Default task(s).
  grunt.registerTask('default', ['build']);

  grunt.registerTask('run', ['run'], function() {
      grunt.util.spawn(
        { cmd: 'node',
        args: [ 'web/app.js']}
        );
  });


};