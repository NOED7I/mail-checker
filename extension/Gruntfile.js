
'use strict';

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngtemplates: {
            app: {
                 options: {
                     module: "<%= pkg.name %>"
                 },
                 src: 'templates/*.html',
                 dest: 'dist/templates.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'lib/jquery/jquery-1.10.2.js',
                    'lib/bootstrap/bootstrap.js',
                    'lib/angular/angular.js',
                    'lib/angular/angular-resource.js',
                    'lib/angular/angular-route.js',
                    'js/*.js',
                    '<%= ngtemplates.app.dest %>'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/',
                ext: '.min.css'
            },
            combine: {
                files: {
                    'dist/<%= pkg.name %>.min.css': ['dist/*.min.css']
                }
            }
        },
        watch: {
            src: {
                files: ['css/*.css', 'js/*.js', 'templates/*.html'],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify', 'cssmin']);
}

