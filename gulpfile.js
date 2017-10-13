const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');  
const webserver = require('gulp-webserver');

gulp.task('vendor', () => {
    return gulp.src([
        './node_modules/lodash/lodash.js',
        './node_modules/string/dist/string.js',
        './node_modules/jquery/dist/jquery.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
        './node_modules/@uirouter/angularjs/release/stateEvents.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./js/'));
})

gulp.task('core', () => {
    return gulp.src('./scripts/core/**')
    .pipe(concat('core.js'))
    .pipe(gulp.dest('./js/'));
})

gulp.task('javascript', () => {
    return gulp.src([
        './scripts/index.js',
        './scripts/components/**/*.js',
        './scripts/controllers/**/*.js',
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js/'));
})

gulp.task('scripts', () => {
    gulp.start('vendor')
    gulp.start('core')
    gulp.start('javascript')
});

gulp.task('sass', () => {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass({
          includePaths: ["./node_modules/flexboxgrid-sass/"]
        } ).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', () => {
    watch('sass/**/*.scss', () => {
        gulp.start('sass');
    });

    watch('scripts/**/*.js', () => {
        gulp.start('scripts');
    });
});

gulp.task('default', () => {
    gulp.start('sass');
    gulp.start('scripts');
    gulp.start('watch');
});
