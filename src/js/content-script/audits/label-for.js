import { htmlentities } from '../util';

export default function () {
    const elems = [];

    for (const el of document.body.getElementsByTagName('label')) {
        if (!el.getAttribute('for') && !el.querySelector('input')) {
            elems.push(el);
        }
    }

    const hints = elems.length;

    if (hints) {
        return {
            labelFor: {
                hints,
                code: elems.map(el => htmlentities(el.outerHTML)),
            }
        }
    }
}
