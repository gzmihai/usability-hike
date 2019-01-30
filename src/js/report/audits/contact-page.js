import { pushHTMLHints } from '../markup-hints';
import { isHidden } from '../util';

export default function () {
    const result = {
        name: 'contactPage',
        hints: 0,
        title: 'Provide contact information',
        success: 'Contact information was found on this page.',
        fix: 'No contact information could be found on this page. Users should be able to easily find and access help (email, chat or telephone). Include a "Contact Us" link on the homepage that goes to a page with all contact information for your company.  Quickly answering people’s questions and fixing their problems doesn’t just mean that you have good customer service – it means you care, and your customers and visitors will appreciate it.',
        resources: [
            `https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/`,
        ],
    };

    // if these are available we have a chat
    if (document.querySelector('script[src*="js.driftt.com"]') ||
        document.querySelector('script[src*="widget.intercom.io"]') ||
        document.querySelector('script[src*="client.crisp.chat"]') ||
        document.querySelector('script[src*="wchat.freshchat.com"]') ||
        document.querySelector('script[src*="widget.helpcrunch.com"]') ||
        document.querySelector('script[src*="embed.tawk.to"]')) {
        return pushHTMLHints(result);
    }

    if (document.body.innerText.match(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi)) {
        return pushHTMLHints(result);
    }

    for (const el of document.body.getElementsByTagName('a')) {
        if (isHidden(el)) {
            continue;
        }

        const { href = '', innerText = '' } = el;

        if (href.match(/(^mailto:)|contact|help|support/i) || innerText.match(/^contact/i)) {
            return pushHTMLHints(result);
        }
    }

    result.hints = 1;
    pushHTMLHints(result);
}
