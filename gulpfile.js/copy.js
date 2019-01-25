const { series, src, dest } = require('gulp');
const del = require('del');

function clean() {
    return del(['dev/**/*.{html,json,png,jpg}']);
}

function copy() {
    return src(['src/**/*.{html,json,png,jpg}', '!src/assets/**']).pipe(dest('dev/'));
}

module.exports = {
    copyDev: series(clean, copy),
}
