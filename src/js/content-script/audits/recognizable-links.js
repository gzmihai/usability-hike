import { htmlentities, isDescendant, isHidden, isBlueShade } from '../util';

function looksLikeLink(el) {
    const style = window.getComputedStyle(el);

    if (el.matches('a') ||
        el.matches('button') ||
        el.matches('input') ||
        el.matches('select') ||
        el.matches('textarea') ||
        (style.cursor === 'pointer') ||
        (el.getAttribute('onclick') !== null)) {
        return;
    }

    if (style.textDecoration === 'underline' || isBlueShade(style.color))  {
        return true;
    }
}

export default function () {
    const elems = [];

    for (const el of document.body.getElementsByTagName('*')) {
        if (isDescendant(elems, el) || isHidden(el)) {
            continue;
        }

        if (looksLikeLink(el)) {
            elems.push(el);
        }
    }

    const hints = elems.length;

    if (hints) {
        return {
            recognizableLinks: {
                hints,
                code: elems.map(el => htmlentities(el.outerHTML)),
            }
        };
    }
}
