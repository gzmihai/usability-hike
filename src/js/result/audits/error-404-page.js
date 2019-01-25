import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, response404 = false, noLink = false } = {}, url) {
    addHints(hints);

    let text = '';
    const brokenLink = (new URL(url)).origin + '/404-page-not-found-test';

    if (response404) {
        text = `<a href="${brokenLink}" target="_blank">${brokenLink}</a> page doesn't have a 404 response status code.`;
    } else if (noLink) {
        text = `<a href="${brokenLink}" target="_blank">${brokenLink}</a> page doesn't have any link that can help the user navigate back to your homepage.`;
    }

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Provide a not‐found / 404 error page',
            success: `A not found error page was found on your domain, and its response status is correct (404).`,
            fix: `A 404 error page, is a standard response code in HTTP telling the user that they've clicked on a broken link. Creating a custom 404 page is a great way to let your visitors know what went wrong and also you can re-engage them by providing relevant information or a link back to your homepage.`,
            resources: [
                `https://usabilla.com/blog/6-guidelines-for-designing-404-error-pages-with-a-positive-impact/`,
            ],
            text,
        }, url),
    }
}
