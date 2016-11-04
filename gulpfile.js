/* eslint-disable no-console */

var gulp = require('gulp');
var shellton = require('shellton');
var gutil = require('gulp-util');
var del = require('del');
var argv = require('yargs')
    .array('pattern')
    .argv;

gulp.task('clean', function() {
    return del('coverage');
});

gulp.task('exec', function(done) {
    gutil.log('executing:', gutil.colors.magenta(argv.exec));
    
    shellton.spawn(argv.exec, function(err, stdout, stderr) {
        if (err) {
            gutil.log(err);
        }
        
        if (stdout && stdout.trim()) {
            gutil.log(stdout.trim());
        }
        
        if (stderr && stderr.trim()) {
            gutil.log(stderr.trim());
        }
        
        done();
    });
});

gulp.task('watch', function() {
    gutil.log('watching:', gutil.colors.magenta(argv.pattern));
    
    gulp.watch(argv.pattern, ['exec']);
});
