import { pushHTMLHints } from '../markup-hints';
import { isDescendant, isHidden } from '../util';

function isUppercase(el) {
    const hasTransformUppercase = window.getComputedStyle(el).textTransform === 'uppercase';

    for (const { nodeType, nodeValue = '' } of el.childNodes) {
        if (nodeType === 3) {
            const found = nodeValue
                .replace(/\s+/g, ' ')
                .replace(/[^a-zA-Z\s]+/g, '')
                .split(/\s/gi)
                .filter(Boolean)
                .reduce((acc, value) => {
                    if (acc > 3) {
                        return acc;
                    }

                    if (hasTransformUppercase || value === value.toUpperCase()) {
                        return acc + 1;
                    }

                    return 0;
                }, 0);

            if (found > 3) {
                return true;
            }
        }
    }
}

export default function () {
    const elems = [];

    for (const el of [document.body, ...document.body.getElementsByTagName('*')]) {
        if (isDescendant(elems, el) || isHidden(el)) {
            continue;
        }

        if (isUppercase(el)) {
            elems.push(el);
        }
    }

    pushHTMLHints({
        name: 'uppercaseLetters',
        title: 'Avoid uppercase letters in prose text',
        success: `No uppercase letters issue was found on this page.`,
        fix: `Use all uppercase letters sparingly or not at all as a formatting style. All uppercase words are not as easy to read as mixed case words, and they can make the page look busy and loud. For example, "PSYCHOLOGY OF WORDS" is not as readable as "Psychology of Words."`,
        resources: [
            `https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/`,
        ],
        elems,
    });
}
