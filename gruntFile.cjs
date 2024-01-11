const sass = require("node-sass"); 

module.exports = function(grunt) {
    grunt.initConfig({
        // connect: {
        //     server: {
        //         options: {
        //             port: 8080, 
        //             hostname: "localhost"
        //         }
        //     }
        // }, 
        sass: {
            dist: {
                files: {
                    // destination file: source file
                    'static/css/style.css': 'static/css/style.scss'
                }
            }, 
            options: {
                implementation: sass, 
                sourceMap: true
            }
        }, 
        browserSync: {
            bsFiles: {
                src : [
                    'static/css/*.css', 
                    'static/*.html', 
                    'views/partials/*.ejs', 
                    'views/*.ejs', 
                    './curl-output-file.html'
                ]
            },
            options: {
                watchTask: true, 
                proxy: 'localhost:8080', 
                port: 5000
            }
        }, 
        watch: {
            css: {
                files: ["static/css/*.scss"], 
                tasks: ["sass"], 
                options: { 
                    spawn: false, 
                    livereload: {
                        host: "localhost", 
                        port: 3000
                    }
                }
            }, 
        }
    }); 
    // grunt.registerTask("start-static-server", "connect"); 
    // grunt.registerTask("default", ["connect", "watch"]); 
    grunt.registerTask("default", ["watch", "sass", "browserSync"]); 
    grunt.loadNpmTasks("grunt-sass"); 
    grunt.loadNpmTasks("grunt-contrib-watch"); 
    // grunt.loadNpmTasks("grunt-contrib-connect"); 
    grunt.loadNpmTasks("grunt-browser-sync"); 
}
