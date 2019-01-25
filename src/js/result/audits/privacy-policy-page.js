import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0 } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            title: 'Include a privacy policy page when appropriate',
            hints,
            success: 'When a page asks for personal information, include a link to a privacy policy page.',
            fix: `The site's privacy policy is easy to find, especially on pages that ask for personal information, and the policy is simple and clear.`,
            resources: [
                `https://www.userfocus.co.uk/resources/taskchecklist.html`,
            ],
            text: hints ? 'No privacy policy link could be found on this page.' : '',
        }, url),
    }
}
