var gulp = require('gulp');
var karma = require('karma').server;
var watch = require('gulp-watch');
var runSequence = require('run-sequence');

var paths = {
  src: {
    bower: './client/src/bower_components',
    img: './client/src/img',
    scss: './client/src/scss'
  },
  dist: {
    css: './client/dist/css',
    img: './client/dist/img'
  },
  karmaConf: __dirname + '/spec/karam.conf.js'
};

var handleError = function(err){
  console.log(err.toString());
  this.emit('end');
};

gulp.task('lint', function(){
});

gulp.task('test', function(){
});

gulp.task('karma', function(done){
  return karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, done);
});
