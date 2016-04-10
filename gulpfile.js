var gulp    = require('gulp'),
    uglify  = require("gulp-uglify"),
    concat  = require("gulp-concat"),
    plumber = require("gulp-plumber");

var bs = require('browser-sync').create();

gulp.task('default', ['js.concat.vendor', 'browser-sync'], function() {
    console.log('It works!');
});

gulp.task('browser-sync', function() {
    bs.watch("js/*.js").on("change", bs.reload);
    bs.init({
        server: {
          baseDir: "./",
          index: "space.html"
        }
    });
});

gulp.task('js.concat.vendor', function() {
    return gulp.src([
        'node_modules/d3/d3.js',
        'node_modules/d3-random/build/d3-random.js'
      ])
      .pipe(plumber({
            errorHandler: (error) => {
              notify('js.concat.vendor', error);
            }
      }))
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('./js'));
});

gulp.task('js.uglify.vendor', function() {
  return gulp.src('js/vendor.js')
      .pipe(plumber({
            errorHandler: (error) => {
              notify('js.uglify.vendor', error);
            }
      }))
      .pipe(uglify('vendor.min.js'))
      .pipe(gulp.dest('./js'));
});
