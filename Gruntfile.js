module.exports = function(grunt) {
    
      const package=require('./package.json');

      var ThemeName='release/'+package.name;

      grunt.initConfig({
        clean: {
          acf: ['advanced-custom-fields-pro/.git/**'],
          git: ['.git/**'],
          release: ['release/**']  
        },
        copy:{
          acf:{
            src: 'include/.htaccess',
            dest: 'advanced-custom-fields-pro/.htaccess'
          },
          build: {
            files:[
              {
              expand:true,
              src: [
                '**/**',
                'templates/.htaccess',
                'include/.htaccess',
                'advanced-custom-fields-pro/.htaccess',
                '!release',
                '!node_modules/**',
                '!src/**',
                '!scripts/**',
                '!Gruntfile.js',
                '!tsconfig.json',
                '!webpack.config.js',
                '!.git',
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
          clone_acf: "git clone https://github.com/wp-premium/advanced-custom-fields-pro.git",
          webpack: "webpack"
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
        'exec:clone_acf',
        'clean:acf',
        'copy:acf',
        'css',
        'build'
      ]);
      
      grunt.registerTask('build', [
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