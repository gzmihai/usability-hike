import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, code = [] } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Use descriptive link texts',
            success: `No generic instructions for link texts (e.g. "click here", "more...", "more info", "more details") were found on this page.`,
            fix: `Don't use generic instructions, such as "Click Here" or "More..." as a link name. Users should be able to look at each link and learn something about the link's destination. The more decisions that users are required to make concerning links, the more opportunities they have to make a wrong decision. Instead, tell users specifically what they will get more of, such as "More New Fiction" or "Archived Book Reviews.".`,
            resources: [
                `https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text`,
                `https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html`,
                `https://www.smashingmagazine.com/2012/06/links-should-never-say-click-here/`,
            ],
            code,
        }, url),
    }
}
