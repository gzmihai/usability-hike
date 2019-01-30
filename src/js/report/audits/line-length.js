import { pushHTMLHints } from '../markup-hints';
import { isHidden, isDescendant, getDirectText } from '../util';

const pixel = document.createElement('pixel-position');
pixel.setAttribute('style', ' display: inline-flex; vertical-align: top;');
const LINE_WIDTH = 100;
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
            const text = child.nodeValue.replace(/\s+/g, ' ');

            if (text.match(/[a-zA-Z]+/gm)) {
                hasTextNode = true;
            }

            if (isLinetoWide(child, 3, text)) {
                return true;
            }
        } else if (child.nodeType === 1 && window.getComputedStyle(child).display === 'inline' && child.offsetWidth && child.innerText) {
            if (!hasTextNode) {
                continue;
            }

            let innerText = '';

            for (const child2 of child.childNodes) {
                if (child2.nodeType === 3) {
                    innerText += child2.nodeValue.replace(/\s+/g, ' ').trim();
                } else if (child2.offsetWidth > 1) {
                    innerText += getDirectText(child2).trim();
                }
            }

            if (innerText && isLinetoWide(child, 1, innerText)) {
                return true;
            }
        }
    }
}

export default function() {
    const elems = [];

    for (const el of [document.body, ...document.body.getElementsByTagName('*')]) {
        if (isDescendant(elems, el) || isHidden(el)) {
            continue;
        }

        if (lineLength(el)) {
            elems.push(el);
        }
    }

    pushHTMLHints({
        name: 'lineLength',
        title: 'Use appropriate line lengths',
        success: `According to classic typographic books, the optimal number of characters per line is between 55 and 75, but between 75 and 100 characters per line is more popular in practice. Usability Hike didn't found any line lengths greater than 100 characters`,
        fix: `According to classic typographic books, the optimal number of characters per line is between 55 and 75, but between 75 and 100 characters per line is more popular in practice. Usability Hike reports all line lengths greater than 100 characters.`,
        resources: [
            `https://webstandards.hhs.gov/guidelines/65`,
        ],
        elems,
    });
}
