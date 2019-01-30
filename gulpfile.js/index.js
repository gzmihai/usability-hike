const { watch, series, parallel } = require('gulp');
const { jsBackgroundDev, jsReportDev } = require('./js');
const { sassReportDev } = require('./sass');
const { copyDev } = require('./copy');

module.exports = {
    s: series(parallel(copyDev, jsBackgroundDev, jsReportDev, sassReportDev), function watchAssets(done) {
        watch('src/js/background/**', jsBackgroundDev);
        watch('src/js/report/**', jsReportDev);
        watch('src/style/report/**', sassReportDev);
        watch(['src/**/*.{html,json,png,jpg}', '!src/assets/**'], copyDev);

        done();
    })
}
