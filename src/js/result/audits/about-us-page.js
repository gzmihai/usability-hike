import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0 } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Include an About Us page / section',
            success: `An "About Us" page / section have been found on this page.`,
            fix: `Include a link to an "About Us" section / page that gives users an overview about the company and links to any relevant details about your products, services, company values, business proposition, management team, and so forth.`,
            resources: [
                `https://www.nngroup.com/articles/about-us-summaries/`,
            ],
            text: hints ? 'No "About Us" page / section could be found on this page.' : '',
        }, url),
    }
}
