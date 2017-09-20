module.exports = function(grunt) {
    
      const package=require('./package.json');

      var ThemeName='release/'+package.name;

      grunt.initConfig({
        clean: {
          git: ['.git/**'],
          release: ['release/**']  
        },
        copy:{
          bootstrap:{
            expand: true,
            cwd: 'bower_components/bootstrap/dist/',
            src: '**',
            dest: 'assets/bootstrap'
          },
          jquery:{
            expand: true,
            cwd: 'bower_components/jquery/dist/',
            src: '**',
            dest: 'assets/jquery'
          },
          fontawesome:{
            expand: true,
            cwd: 'bower_components/font-awesome/',
            src: ['css/**','fonts/**'],
            dest: 'assets/font-awesome/'
          },
          build: {
            files:[
              {
              expand:true,
              src: [
                '**/**',
                'templates/.htaccess',
                'include/.htaccess',
                '!release',
                '!node_modules/**',
                '!bower_components/**',
                '!src/**',
                '!scripts/**',
                '!Gruntfile.js',
                '!tsconfig.json',
                '!webpack.config.js',
                '!.vscode/**',
                '!.git/**',
                '!.gitignore',
                '!package.json',
                '!package-lock.json',
              ],
              dest: ThemeName
              }
            ]
          }
        },
        execute: {
          build: {
              src: ['scripts/build.js']
          }
        },
        exec:{
          webpack: "webpack",
          bower_install: "bower install"
        },
        less: {
          development: {
            files: {
              'src/css/styles.css': 'src/less/main.less'
            }
          }
        },
        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'src/css',
              src: ['styles.css'],
              dest: 'css',
              ext: '.min.css'
            }]
          }
        },
        uglify: {
          js: {
            files: {
              'js/bundle.min.js': ['src/js/bundle.js']
            }
          }
        },
        watch: {
            less: {
              files: ['src/less/**/*.less'],
              tasks: ['css']
            },
            typescript: {
              files: ['src/ts/**/*.ts'],
              tasks: ['webpack']
            }

        }
      });
    
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-execute');
      grunt.loadNpmTasks('grunt-exec');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-less');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-uglify');
    
      grunt.registerTask('default', ['watch']);

      grunt.registerTask('install', [
        'exec:bower_install',
        'copy:bootstrap',
        'copy:jquery',
        'copy:fontawesome',
        'css',
        'webpack',
        'build'
      ]);
      
      grunt.registerTask('build', [
        'css',
        'webpack',
        'clean:release',
        'copy:build',
        'execute:build'
      ]);

      grunt.registerTask('css', [
        'less',
        'cssmin'
      ]);

      grunt.registerTask('webpack', [
        'exec:webpack',
        'uglify:js'
      ]);
    
};