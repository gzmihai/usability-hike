const { series } = require('gulp');
const del = require('del');
const { rollup } = require('rollup');

function cleanDev(path) {
    return del([`dev/js/${path}/`]);
}

async function runRollup(path) {
    const bundle = await rollup({
        input: `src/js/${path}/main.js`,
        treeshake: true,
        plugins: [],
    });

    return bundle.write({
        format: 'iife',
        file: `dev/js/${path}/main.js`,
        sourcemap: false,
        name: 'usabilityhike',
        globals: {},
    });
}

module.exports = {
    jsBackgroundDev: series(cleanDev.bind(null, 'background'), runRollup.bind(null, 'background')),
    jsContentScriptDev: series(cleanDev.bind(null, 'content-script'), runRollup.bind(null, 'content-script')),
    jsResultDev: series(cleanDev.bind(null, 'result'), runRollup.bind(null, 'result')),
}
