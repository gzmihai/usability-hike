import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, code = [] } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Links are easily recognizable',
            success: `No text items were found on this page with characteristics that may suggest they are clickable.`,
            fix: `Avoid using underline text or blue color for non-clickable text. By default, browsers have all links blue for a reason: the color is familiar to most users, which makes it easy to locate. Ensure that the static items do not have characteristics that may suggest they are clickable.`,
            resources: [
                `https://guidelines.usability.gov/guidelines/print_this_page?id=95`,
            ],
            code,
        }, url),
    }
}
