import { pushHTMLHints } from '../markup-hints';
import { isHidden } from '../util';

export default function () {
    const elems = [];

    for (const el of document.body.getElementsByTagName('label')) {
        if (isHidden(el)) {
            continue;
        }

        if (!el.getAttribute('for') && !el.querySelector('input')) {
            elems.push(el);
        }
    }

    pushHTMLHints({
        name: 'labelFor',
        title: 'Associate text labels with form controls',
        success: `All text label elements are associated with form controls.`,
        fix: `A label is attached to a specific form control through the use of the 'for' attribute that must be the same as the 'id' of that control. A benefit of this technique is a larger clickable area for the control, since clicking on the label or the control will activate the control.`,
        resources: [
            `https://www.w3.org/TR/WCAG20-TECHS/H44.html`,
        ],
        elems,
    });
}
