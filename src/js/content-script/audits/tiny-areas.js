import { htmlentities, differentColors, isHidden } from '../util';

function hasElementsAsChildren(node) {
    return node.querySelectorAll('img, svg').length || node.innerText.replace(/\s/g, '').length < 2;
}

export default function () {
    const elems = [];

    for (const node of document.body.querySelectorAll('button, a, input, textarea, select, label')) {
        const parent = node.parentElement;

        // avoid inputs with a label as parent
        if (parent.nodeName === 'LABEL' || isHidden(node)) {
            continue;
        }

        // avoid links without href
        if (node.nodeName === 'A' && !node.href) {
            continue;
        }

        const { backgroundColor, display } = window.getComputedStyle(node);

        // check if different background colors. I supose is something that looks like a button
        // check if has children non text
        if (differentColors(window.getComputedStyle(parent).backgroundColor, backgroundColor) || hasElementsAsChildren(node)) {
            if (display === 'inline') {
                const initialStyle = node.style;
                node.style += '; display: inline-block !important;';

                const { width, height } = node.getBoundingClientRect();

                if (width < 35 && height < 35) {
                    elems.push(node);
                }

                node.style = initialStyle;
            } else {
                const { width, height } = node.getBoundingClientRect();

                if (width < 35 && height < 35) {
                    elems.push(node);
                }
            }
        }
    }

    const hints = elems.length;

    if (hints) {
        return {
            tinyAreas: {
                hints,
                code: elems.map(el => htmlentities(el.outerHTML)),
            }
        }
    }
}
