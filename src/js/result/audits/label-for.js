import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, code = [] } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Associate text labels with form controls',
            success: `All text label elements are associated with form controls.`,
            fix: `A label is attached to a specific form control through the use of the 'for' attribute that must be the same as the 'id' of that control. A benefit of this technique is a larger clickable area for the control, since clicking on the label or the control will activate the control.`,
            resources: [
                `https://www.w3.org/TR/WCAG20-TECHS/H44.html`,
            ],
            code,
        }, url),
    }
}
