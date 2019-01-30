import { pushHTMLHints } from '../markup-hints';

export default function () {
    pushHTMLHints({
        name: 'horizontalScrollbar',
        hints: Math.min(document.documentElement.clientHeight, document.body.clientHeight) < window.innerHeight ? 1 : 0,
        title: 'Avoid horizontal scrollbar',
        success: `There is no horizontal scrollbar on this page.`,
        fix: `There is a horizontal scrollbar on this page. Horizontal scrolling is a slow and tedious way to view an entire screen. It invariably causes usability issues - the biggest being that users don't notice the scrollbar and miss seeing content that is scrolled off of the screen. Use an appropriate page layout to eliminate the need for users to scroll horizontally.`,
        resources: [
            `https://guidelines.usability.gov/guidelines/print_this_page?id=79`,
        ],
    });
}
