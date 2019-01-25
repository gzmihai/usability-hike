export default function (hints) {
    hints.sort((a, b) => {
        if (a.hints < b.hints) {
            return 1;
        }

        if (a.hints > b.hints) {
            return -1;
        }

        return 0;
    });

    document.body.querySelector('[data-js="after-block"]').insertAdjacentHTML('afterend', hints.reduce((acc, { markup }) => `${acc}${markup}`, ''));
}
