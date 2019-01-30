import { pushHTMLHints } from '../markup-hints';
import { differentColors, isHidden } from '../util';

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

        // avoid inputs with id and for from a label
        if (node.nodeName === 'INPUT') {
            const id = node.id;

            if (id && document.body.querySelector(`label[for=${id}]`)) {
                continue;
            }
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

    pushHTMLHints({
        name: 'tinyAreas',
        title: 'Avoid tiny clickable areas',
        success: `All clickable areas have more than 35px in size vertically and horizontally.`,
        fix: `Links, form controls and buttons can all be made easier to click on if their size is increased. According to Fitt’s Law, we need more time to click on something with a pointing device, the further away it is and/or smaller it is. Alternatively, it's also possible to keep the visual element looking as is, but instead only increasing its hotspot or clickable area with padding. Usability Hike reports all areas that have less than 35px in size vertically and horizontally.`,
        resources: [
            `https://www.smashingmagazine.com/2009/02/9-common-usability-blunders/#1-tiny-clickable-areas`,
            `https://signalvnoise.com/posts/1048-padded-link-targets-for-better-mousing`,
        ],
        elems,
    });
}
