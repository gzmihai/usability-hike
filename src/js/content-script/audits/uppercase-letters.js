import { htmlentities, isDescendant, isHidden } from '../util';

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

    const hints = elems.length;

    if (hints) {
        return {
            uppercaseLetters: {
                hints,
                // todo - take care to include uppercase letter in the code exported from here
                // keep in mind that I truncate only to first 500 letters
                code: elems.map(el => htmlentities(el.outerHTML)),
            }
        };
    }
}
