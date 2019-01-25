import { htmlentities, isDescendant, isHidden } from '../util';

function hasSmallFontSize(elem) {
    const style = window.getComputedStyle(elem);
    const fontSize = Number.parseInt(style.fontSize, 10);

    if ((style.textTransform === 'uppercase' && fontSize >= 11) || fontSize > 11)  {
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

    const hints = elems.length;

    if (hints) {
        return {
            fontSize: {
                hints,
                code: elems.map(el => htmlentities(el.outerHTML)),
            }
        };
    }
}
