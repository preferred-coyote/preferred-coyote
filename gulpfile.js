var gulp = require('gulp');
var karma = require('karma').server;
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');
var run = require('gulp-run');
var compass = require('gulp-compass');

var paths = {
  src: {
    // bower: './client/src/bower_components',
    // img: './client/src/img',
    scss: './client/scss',
    js: './client/app'
  },
  dist: {
    public: './public',
    css: './public/css',
    img: './public/img',
    js: './public/js'
  },
  karmaConf: __dirname + '/spec/_karma.conf.js'
};

var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('lint', function() {});

gulp.task('test', function() {});

gulp.task('scss', function() {
  gulp.src(paths.src.scss + '/app.scss')
    .pipe(compass({
      css: paths.dist.css,
      sass: paths.src.scss
    }))
    .on('error', handleError)
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('browserify', function() {
  gulp.src(paths.src.js + '/app.js')
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest(paths.dist.js))
});

gulp.task('seed', function(done) {
  run('node seed.js').exec(function() {
    done();
  });
});

gulp.task('karma', function(done) {
  return karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, done);
});


gulp.task('watch', function() {
  gulp.watch(paths.src.js + '/**/*.js', ['browserify']);
  gulp.watch(paths.src.scss + '/**/*.scss', ['scss']);
});

// Default Task

gulp.task('default', ['lint', 'test', 'browserify', 'scss', 'watch']);
