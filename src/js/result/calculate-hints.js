let hints = 0;

function addHints(value) {
    hints += value;
}

function printTotalHints() {
    document.body.querySelector('[data-js="hints-found"]').innerHTML = `<span class="intro-status-score">${hints}</span>${hints === 1 ? 'HINT' : 'HINTS'}`;
}

export {
    addHints,
    printTotalHints,
}
