var _           = require('lodash');
var $           = require('gulp-load-plugins')();
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var harp        = require('harp');
var vendorCfg   = require('./vendor.config.json');

gulp.task('vendorScripts', function () {
  var scripts = [];
  _.forEach(vendorCfg.scripts, function (script) {
    scripts.push('./bower_components/' + script);
  });

  return gulp.src(scripts)
    .pipe($.concat('vendor.js'))
    .pipe($.order(vendorCfg.scripts))
    .pipe(gulp.dest('./src/scripts/'));
});

/**
 * Serve the Harp Site from the src directory
 */
gulp.task('serve', ['vendorScripts'], function () {
  harp.server(__dirname + '/src', {
    port: 9000,
  }, function () {
    browserSync({
      proxy: 'localhost:9000',
      open: false,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 0', 'position: absolute'],
      },
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch(['src/styles/*.{css,sass,scss,less}'], function () {
      reload('src/styles/main.css', { stream: true });
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(['src/**/*.{html,ejs,jade,js,json,md}'], function () {
      reload();
    });
  });
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);
