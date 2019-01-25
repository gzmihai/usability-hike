import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, code = [] } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Avoid uppercase letters in prose text',
            success: `No uppercase letters issue was found on this page.`,
            fix: `Use all uppercase letters sparingly or not at all as a formatting style. All uppercase words are not as easy to read as mixed case words, and they can make the page look busy and loud. For example, "PSYCHOLOGY OF WORDS" is not as readable as "Psychology of Words."`,
            resources: [
                `https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/`,
            ],
            code,
        }, url),
    }
}
