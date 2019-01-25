import { htmlentities, isHidden } from '../util';

export default function () {
    const code = [];

    for (const search of [...document.body.querySelectorAll('input[type="search"]'), ...document.body.querySelectorAll('input[name*="search"]')]) {
        if (isHidden(search)) {
            continue;
        }

        const cssStyle = window.getComputedStyle(search);

        // https://stackoverflow.com/a/931695/6564332
        const fakeInput = document.createElement('div');
        fakeInput.setAttribute('style', `
            position: absolute;
            top: -9999px;
            left: -9999px;
            width: auto;
            border: ${cssStyle.border};
            padding: ${cssStyle.padding};
            font-size: ${cssStyle.fontSize};
            font-family: ${cssStyle.fontFamily};
            font-weight: ${cssStyle.fontWeight};
            letter-spacing: ${cssStyle.letterSpacing};
            text-transform: ${cssStyle.textTransform};
            word-spacing: ${cssStyle.wordSpacing};
            text-indent: ${cssStyle.textIndent};
            box-sizing: ${cssStyle.boxSizing};
            white-space: nowrap;
        `);

        fakeInput.innerHTML = `abcdefghiklmnopqrstvxyzabcdefghijkl`

        document.body.appendChild(fakeInput);

        if (search.clientWidth < fakeInput.clientWidth) {
            code.push(search);
        }

        fakeInput.remove();
    }

    const hints = code.length;

    if (hints) {
        return {
            searchInput: {
                hints,
                code: code.map(label => htmlentities(label.outerHTML)),
            }
        }
    }
}
