import { pushHTMLHints } from '../markup-hints';

export default function () {
    const result = {
        name: 'pageTitle',
        title: 'Page must have a title',
        success: `A <code>&lt;title&gt;</code> tag element is defined on this page.`,
        fix: `The 'title' refers to the text that is in the browser title bar. Use concise and meaningful titles on all pages to help orient users as they browse a page, bookmark or scan for specific URLs. To avoid confusing users, make the title consistent with the title in the content area of the pages. Page titles are set in HTML by adding a <code>&lt;title&gt;</code> tag such as <code>&lt;title&gt;Unique Page Title&lt;/title&gt;</code> inside the <code>&lt;head&gt;</code> tag of each page.`,
        resources: [
            `https://moz.com/learn/seo/title-tag`
        ],
        elems: [],
    };

    if (!document.title) {
        result.elems.push(document.querySelector('head title') || document.querySelector('head'));
    }

    pushHTMLHints(result);
}
