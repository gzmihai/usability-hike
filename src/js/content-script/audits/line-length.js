import { htmlentities, isHidden } from '../util';

const pixel = document.createElement('pixel-position');
pixel.setAttribute('style', ' display: inline-flex; vertical-align: top;');
const LINE_WIDTH = 120;
let position;
let initialTopPosition;

function isLinetoWide(child, nodeType, text) {
    const textLength = text.length;
    const parentNode = child.parentNode;

    position += textLength;

    if (initialTopPosition === null) {
        parentNode.insertBefore(pixel, child);
        initialTopPosition = pixel.offsetTop;
        pixel.remove();
    }

    if (position <= LINE_WIDTH) {
        return;
    }

    let pixelPosition;

    if (nodeType === 3) {
        const startNode = document.createTextNode(text.slice(0, LINE_WIDTH - position + textLength));
        const endNode = document.createTextNode(text.slice(LINE_WIDTH - position + textLength));

        parentNode.insertBefore(startNode, child);
        parentNode.insertBefore(pixel, child);
        parentNode.insertBefore(endNode, child);
        child.remove();

        pixelPosition = pixel.offsetTop;
        parentNode.insertBefore(child, startNode);
        startNode.remove();
        endNode.remove();
    } else { // nodeType === 1
        child.insertAdjacentElement('afterend', pixel);

        pixelPosition = pixel.offsetTop;
    }

    pixel.remove();

    if (initialTopPosition === pixelPosition) {
        return true;
    }
}

function lineLength(elem) {
    position = 0;
    initialTopPosition = null;

    // used when I have an element that has only other elements inside (e.g only links like a navigation)
    let hasTextNode = false;

    for (const child of elem.childNodes) {
        if (position > LINE_WIDTH) {
            break;
        }

        if (child.nodeType === 3) {
            const text = child.nodeValue.replace(/\s\s+/g, ' ');

            if (text.match(/[a-zA-Z]+/g)) {
                hasTextNode = true;
            }

            if (isLinetoWide(child, 3, text)) {
                return true;
            }
        } else if (child.nodeType === 1 && window.getComputedStyle(child).display === 'inline' && child.offsetWidth && child.innerText) {
            const text = child.innerText.replace(/\s\s+/g, ' ');

            if (isLinetoWide(child, 1, text)) {
                if (hasTextNode) {
                    return true;
                }
            }
        }
    }
}

export default function() {
    const elems = [];

    for (const el of [document.body, ...document.body.getElementsByTagName('*')]) {
        if (isHidden(el)) {
            continue;
        }

        if (lineLength(el)) {
            elems.push(el);
        }
    }

    const hints = elems.length;

    if (hints) {
        return {
            lineLength: {
                hints,
                code: elems.map(el => htmlentities(el.outerHTML)),
            }
        }
    }
}
