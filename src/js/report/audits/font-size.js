import { pushHTMLHints } from '../markup-hints';
import { isDescendant, isHidden } from '../util';

function hasSmallFontSize(elem) {
    const { fontSize, textTransform } = window.getComputedStyle(elem);
    const fontSizeInt = Number.parseInt(fontSize, 10);

    if ((textTransform === 'uppercase' && fontSizeInt >= 11) || fontSizeInt > 11)  {
        return;
    }

    for (const child of elem.childNodes) {
        if (child.nodeType === 3) {
            if (child.nodeValue.replace(/\s+/g, ' ').split(/\s/gi).filter(Boolean).length > 2) {
                return true;
            }
        }
    }
}

export default function () {
    const elems = [];

    for (const el of document.body.getElementsByTagName('*')) {
        if (isDescendant(elems, el) || isHidden(el)) {
            continue;
        }

        if (hasSmallFontSize(el)) {
            elems.push(el);
        }
    }

    pushHTMLHints({
        name: 'fontSize',
        title: 'Use legible font sizes',
        success: `No illegible font sizes (smaller than 12px) were found on this page.`,
        fix: `Font sizes smaller than 12px are often difficult to read and may require users to zoom the text at a comfortable reading size. The smaller the font, the greater the eyestrain. Many times, people will skip over hard-to-read font sizes, ignoring the information.`,
        resources: [
            `https://developers.google.com/web/tools/lighthouse/audits/font-sizes`,
        ],
        elems,
    });
}
