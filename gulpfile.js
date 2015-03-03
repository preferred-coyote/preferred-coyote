var gulp = require('gulp');
var karma = require('karma').server;
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');
var run = require('gulp-run');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  src: {
    bower: './client/bower_components',
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

// files to concat into final build
var filesToUglify = [
  paths.src.bower + '/jquery/dist/jquery.min.js',
  paths.src.bower + '/foundation/js/foundation.min.js',
  paths.src.bower + '/foundation/js/foundation/foundation.orbit.js',
  paths.dist.public + '/js/app.bundled.js'
];

var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('uglify', function() {
  gulp.src(filesToUglify)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('javascript', function(callback) {
  runSequence('browserify', 'uglify', callback);
});

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
      debug: false, // disable source maps
      transform: ['reactify'],
    }))
    .on('error', handleError)
    .pipe(rename('app.bundled.js'))
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

// folders to watch
gulp.task('watch', function() {
  gulp.watch(paths.src.js + '/**/*.js', ['javascript']);
  gulp.watch(paths.src.scss + '/**/*.scss', ['scss']);
});

// build for deploys
gulp.task('build', ['javascript', 'scss']);

// Default Task
gulp.task('default', ['lint', 'test', 'javascript', 'scss', 'watch']);
