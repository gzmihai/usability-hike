import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0 } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Provide contact information',
            success: 'Contact information was found on this page.',
            fix: 'Users should be able to easily find and access help (email, chat or telephone). Include a "Contact Us" link on the homepage that goes to a page with all contact information for your company.  Quickly answering people’s questions and fixing their problems doesn’t just mean that you have good customer service – it means you care, and your customers and visitors will appreciate it.',
            resources: [
                `https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/`,
            ],
            text: hints ? 'No contact information could be found on this page.' : '',
        }, url),
    }
}
