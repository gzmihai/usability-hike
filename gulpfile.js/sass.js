const { series, src, dest } = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

function clean() {
    return del(['dev/style/report/']);
}

function runSass() {
    return src('src/style/report/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 3 version'] }))
        .pipe(sourcemaps.write())
        .pipe(dest('dev/style/report/'));
}

module.exports = {
    sassReportDev: series(clean, runSass),
}
