const { watch, series, parallel } = require('gulp');
const { jsBackgroundDev, jsContentScriptDev, jsResultDev } = require('./js');
const { sassResultDev } = require('./sass');
const { copyDev } = require('./copy');

module.exports = {
    s: series(parallel(copyDev, jsBackgroundDev, jsContentScriptDev, jsResultDev, sassResultDev), function watchAssets(done) {
        watch('src/js/background/**', jsBackgroundDev);
        watch('src/js/content-script/**', jsContentScriptDev);
        watch('src/js/result/**', jsResultDev);
        watch('src/style/result/**', sassResultDev);
        watch(['src/**/*.{html,json,png,jpg}', '!src/assets/**'], copyDev);

        done();
    })
}
