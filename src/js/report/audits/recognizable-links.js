import { pushHTMLHints } from '../markup-hints';
import { isDescendant, isHidden, isBlueShade, getDirectText } from '../util';

function looksLikeLink(el) {
    const style = window.getComputedStyle(el);
    const role = el.getAttribute('role') || '';

    if (el.matches('a') ||
        el.matches('button') ||
        el.matches('input') ||
        el.matches('select') ||
        el.matches('textarea') ||
        ['tab', 'button', 'link'].includes(role) ||
        (style.cursor === 'pointer') ||
        (el.getAttribute('onclick') !== null)) {
        return;
    }

    if (!getDirectText(el).length) {
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

    pushHTMLHints({
        name: 'recognizableLinks',
        title: 'Links are easily recognizable',
        success: `No text items were found on this page with characteristics that may suggest they are clickable.`,
        fix: `Avoid using underline text or blue color for non-clickable text. By default, browsers have all links blue for a reason: the color is familiar to most users, which makes it easy to locate. Ensure that the static items do not have characteristics that may suggest they are clickable.`,
        resources: [
            `https://guidelines.usability.gov/guidelines/print_this_page?id=95`,
        ],
        elems,
    });
}
