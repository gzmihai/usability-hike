const hints = {};

function getHints(name) {
    return hints[name] || [];
}

function pushHints(name, selector) {
    if (!hints[name]) {
        hints[name] = [];
    }

    hints[name].push(selector);
}

export {
    getHints,
    pushHints,
}
