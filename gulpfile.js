var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require("gulp-notify");
var sass = require("gulp-sass");
var webserver = require('gulp-webserver');
var rename = require("gulp-rename");
var template = require('gulp-template');
var secrets = require('./config/secrets.json');
var spawn = require('child_process').spawn;
var minimist = require('minimist');

var scriptsDir = './js';
var buildDir = './public/js';

var knownOptions = {
    string: 'env',
    default: { env: 'dev' }
};
var options = minimist(process.argv.slice(2), knownOptions);

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}


// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file, watch) {
    var props = {entries: [scriptsDir + '/' + file]};
    var bundler = watch ? watchify(props) : browserify(props);

    bundler.transform(reactify);

    var rebundle = function() {
        var stream = bundler.bundle({debug: true});
        return stream.on('error', handleErrors)
            .pipe(source("bundle.js"))
            .pipe(gulp.dest(buildDir + '/'));
    };

    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundle...');
    });
    return rebundle();
}

gulp.task('sass', function() {
    gulp.src('./sass/*.scss')
        .pipe(sass({
            includePaths: require('node-neat').includePaths
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
    spawn('parse', ['develop', 'dev'], { stdio: 'inherit' });
    return buildScript('app.js', true);
});

gulp.task('default', ['sass'], function() {
    return buildScript('app.js', false);
});

gulp.task('init', ['initLocalConfig', 'initCloudCodeConfig', 'initParseGlobalConfig']);

gulp.task('initLocalConfig', function() {
    var configData = options.env === 'prod' ? secrets.prod : secrets.dev;

    return gulp.src('./setup/templates/localConfig.json')
        .pipe(template(configData))
        .pipe(gulp.dest('./config'));
});

gulp.task('initCloudCodeConfig', function() {
    var configData = options.env === 'prod' ? secrets.prod : secrets.dev;

    return gulp.src('./setup/templates/cloudCodeConfig.js')
        .pipe(rename("config.js"))
        .pipe(template(configData))
        .pipe(gulp.dest('./cloud'));
});

gulp.task('initParseGlobalConfig', function() {
    return gulp.src('./setup/templates/parseGlobalConfig.json')
        .pipe(rename("global.json"))
        .pipe(template(secrets))
        .pipe(gulp.dest('./config'));
});

gulp.task('webserver', function() {
    gulp.src('./public')
        .pipe(webserver({
            fallback: './public/index.html'
        }));
});