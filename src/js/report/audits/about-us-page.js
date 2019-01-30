import { pushHTMLHints } from '../markup-hints';
import { isHidden } from '../util';

export default function () {
    let hints = 1;

    for (const el of document.body.getElementsByTagName('a')) {
        if (isHidden(el)) {
            continue;
        }

        const { href = '', innerText = '' } = el;

        if (href.match(/about/gi) || innerText.match(/^about/i))  {
            hints = 0;
            break;
        }
    }

    pushHTMLHints({
        name: 'aboutUsPage',
        title: 'Include an About Us page / section',
        success: `An "About Us" page / section have been found on this page.`,
        fix: `No "About Us" page / section could be found on this page. Include a link to an "About Us" section / page that gives users an overview about the company and links to any relevant details about your products, services, company values, business proposition, management team, and so forth.`,
        resources: [
            `https://www.nngroup.com/articles/about-us-summaries/`,
        ],
        hints,
    });
}
