import { pushHTMLHints, getHintHTML } from '../markup-hints';
import { getWidget } from '../container';

export default async function () {
    try {
        pushHTMLHints({
            name: 'error404Page',
            hints: -1,
            title: 'Provide a not‐found / 404 error page',
            loading: `This audit runs in background. The results will appear here after the process is finished.`,
        });

        const brokenLink = `${document.location.origin}/404-page-not-found-test`;

        const response = await fetch(brokenLink, {
            method: 'GET',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            },
        });

        if (response.status !== 404) {
            return getWidget().querySelector('[data-js-hint="error404Page"]').outerHTML = getHintHTML([{
                hints: 1,
                title: 'Provide a not‐found / 404 error page',
                fix: `<a href="${brokenLink}" target="_blank">${brokenLink}</a> page doesn't have a 404 response status code. A 404 error page, is a standard response code in HTTP telling the user that they've clicked on a broken link. Creating a custom 404 page is a great way to let your visitors know what went wrong and also you can re-engage them by providing relevant information or a link back to your homepage.`,
                resources: [
                    `https://usabilla.com/blog/6-guidelines-for-designing-404-error-pages-with-a-positive-impact/`,
                ],
            }]);
        }
        const text = await response.text();
        const links = text.match(/<a[^>]* href=/gi);

        if (!links) {
            return getWidget().querySelector('[data-js-hint="error404Page"]').outerHTML = getHintHTML([{
                hints: 1,
                title: 'Provide a not‐found / 404 error page',
                fix: `<a href="${brokenLink}" target="_blank">${brokenLink}</a> page doesn't have any link that can help the user navigate back to your homepage. A 404 error page, is a standard response code in HTTP telling the user that they've clicked on a broken link. Creating a custom 404 page is a great way to let your visitors know what went wrong and also you can re-engage them by providing relevant information or a link back to your homepage.`,
                resources: [
                    `https://usabilla.com/blog/6-guidelines-for-designing-404-error-pages-with-a-positive-impact/`,
                ],
            }]);
        }

        getWidget().querySelector('[data-js-hint="error404Page"]').outerHTML = getHintHTML([{
            hints: 0,
            title: 'Provide a not‐found / 404 error page',
            success: `A not found error page was found on your domain, and its response status is correct (404).`,
            resources: [
                `https://usabilla.com/blog/6-guidelines-for-designing-404-error-pages-with-a-positive-impact/`,
            ],
        }]);
    } catch (error) {
        console.error('error-404-page', error);
    }
}
