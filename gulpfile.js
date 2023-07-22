const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat')
const terser = require('gulp-terser');
const clean = require('gulp-clean');
const minifyCSS = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');



const cleanDist = () => {
    return gulp.src('./dist', {read: false})
    .pipe(clean())
}

const dev = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('./src/**/*', gulp.series(cleanDist, gulp.parallel(html, js, scss, imgMin,), (next) => {
        browserSync.reload();
        next();
    }))
}

const html = () => {
    return gulp.src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))
}

const js = () => {
    return gulp.src('./src/**/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('./dist/js'))
}

const scss = () => {
    return gulp.src('./src/scss/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(autoprefixer({cascade: false}))
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest('./dist/css'))
}

const imgMin = () => {
    return gulp.src('./src/img/*.+(png|jpg|svg|jpeg)')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
}


gulp.task('scss', scss)
gulp.task('html', html)
gulp.task('js', js)
gulp.task('clean', cleanDist)
gulp.task('imgMin', imgMin)


gulp.task('build', gulp.parallel(html, js, scss, imgMin))
gulp.task('dev', dev)