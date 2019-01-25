const { series, src, dest } = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

function clean() {
    return del(['dev/style/result/']);
}

function runSass() {
    return src('src/style/result/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 3 version'] }))
        .pipe(sourcemaps.write())
        .pipe(dest('dev/style/result/'));
}

module.exports = {
    sassResultDev: series(clean, runSass),
}
