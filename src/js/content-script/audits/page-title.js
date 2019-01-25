import { htmlentities } from '../util';

export default function () {
    if (!document.title) {
        const titleElem = document.querySelector('head title');

        return {
            pageTitle: {
                hints: 1,
                code: titleElem? [htmlentities(titleElem.outerHTML)] : [htmlentities(document.querySelector('head').outerHTML)]
            }
        };
    }
}
