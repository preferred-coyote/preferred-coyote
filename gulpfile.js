var gulp = require('gulp');
var karma = require('karma').server;
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');

var paths = {
  src: {
    // bower: './client/src/bower_components',
    // img: './client/src/img',
    // scss: './client/src/scss',
    js: './app'
  },
  dist: {
    public: './public',
    css: './client/dist/css',
    img: './client/dist/img'
  },
  karmaConf: __dirname + '/spec/_karma.conf.js'
};

var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('lint', function() {
});

gulp.task('test', function() {
});

gulp.task('browserify', function() {
  gulp.src(['./app/app.js'])
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest(paths.dist.public))
});

gulp.task('karma', function(done) {
  return karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, done);
});


gulp.task('watch', function() {
  gulp.watch(paths.src.js + '/**/*.js', ['browserify']);
});

// Default Task

gulp.task('default', ['lint', 'test', 'browserify', 'watch']);
