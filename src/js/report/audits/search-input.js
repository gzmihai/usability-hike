import { pushHTMLHints } from '../markup-hints';
import { isHidden } from '../util';

export default function () {
    const elems = [];

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
            elems.push(search);
        }

        fakeInput.remove();
    }

    pushHTMLHints({
        name: 'searchInput',
        title: 'Use wide enough search input boxes',
        success: `Check if all search inputs boxes are large enough to show the entered data.`,
        fix: `Search input should be wide enough for users to see all the entered data in that box. One study found that this entry field should be at least 35-40 characters long to accommodate ninety-five percent of search terms being used.`,
        resources: [
            `https://webstandards.hhs.gov/guidelines/133`,
        ],
        elems,
    });
}
