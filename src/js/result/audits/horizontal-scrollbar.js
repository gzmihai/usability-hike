import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0 } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Avoid horizontal scrollbar',
            success: `There is no horizontal scrollbar on this page.`,
            fix: `Horizontal scrolling is a slow and tedious way to view an entire screen. It invariably causes usability issues - the biggest being that users don't notice the scrollbar and miss seeing content that is scrolled off of the screen. Use an appropriate page layout to eliminate the need for users to scroll horizontally.`,
            resources: [
                `https://guidelines.usability.gov/guidelines/print_this_page?id=79`,
            ],
            text: hints ? `There is a horizontal scrollbar on this page.` : ``,
        }, url),
    }
}
