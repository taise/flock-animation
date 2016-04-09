var gulp = require('gulp');
var bs = require('browser-sync').create();

gulp.task('default', function() {
  // place code for your default task here
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
