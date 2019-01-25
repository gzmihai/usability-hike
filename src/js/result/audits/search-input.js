import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, code = [] } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Use wide enough search input boxes',
            success: `Check if all search inputs boxes are large enough to show the entered data.`,
            fix: `Search input should be wide enough for users to see all the entered data in that box. One study found that this entry field should be at least 35-40 characters long to accommodate ninety-five percent of search terms being used.`,
            resources: [
                `https://webstandards.hhs.gov/guidelines/133`,
            ],
            code,
        }, url),
    }
}
