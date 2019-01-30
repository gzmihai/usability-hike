import { pushHTMLHints } from '../markup-hints';
import { isHidden } from '../util';

export default function () {
    const result = {
        name: 'privacyPolicyPage',
        hints: 0,
        title: 'Include a privacy policy page',
        success: 'When a page asks for personal information, include a link to a privacy policy page.',
        fix: `No privacy policy link could be found on this page. Take care that the site's privacy policy is easy to find, especially on pages that ask for personal information, and the policy is simple and clear.`,
        resources: [
            `https://www.userfocus.co.uk/resources/taskchecklist.html`,
        ],
    };

    if (!document.body.querySelectorAll('input[type="email"]').length && !document.body.querySelectorAll('input[type="password"]').length) {
        return pushHTMLHints(result);
    }

    for (const el of document.body.getElementsByTagName('a')) {
        if (isHidden(el)) {
            continue;
        }

        const { href = '', innerText = '' } = el;

        if (href.match(/privacy|policy|terms/i) || innerText.match(/^privacy/i)) {
            return pushHTMLHints(result);
        }
    }

    result.hints = 1;
    pushHTMLHints(result);
}
