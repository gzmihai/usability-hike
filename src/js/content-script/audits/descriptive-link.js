import { htmlentities } from '../util';

export default function () {
    const elems = [];

    for (const el of document.body.getElementsByTagName('a')) {
        const text = el.innerText;

        if (text && text.replace(/\s+/g, '').toLocaleLowerCase().match(/(^clickhere$)|(^more\.\.\.$)|(^moreinfo$)|(^moredetails$)/gi)) {
            elems.push(el);
        }
    }

    const hints = elems.length;

    if (hints) {
        return {
            descriptiveLink: {
                hints,
                code: elems.map(el => htmlentities(el.outerHTML)),
            }
        }
    }
}
