import { pushHTMLHints, getHintHTML } from '../markup-hints';
import { getWidget } from '../container';
import { connectPort, disconnectPort, waitResponse } from '../background-fetch';

connectPort();

export default async function () {
    try {
        const url = document.location.href;

        pushHTMLHints({
            name: 'validHtml',
            hints: -1,
            title: 'Use valid HTML',
            loading: `This audit runs in background. The results will appear here after the process is finished.`,
        });

        const { error = null, status = 500, body = {} } = await waitResponse({
            url: `https://validator.w3.org/nu/?out=json&doc=${url}`,
            options: {
                method: 'GET',
                headers: {
                    "Content-type": "text/html, charset=utf-8",
                    'User-Agent': 'Chrome Extension: Usability Hike v1.1.0'
                },
            },
            body: 'json'
        });

        disconnectPort();

        if (error || status >= 400) {
            return getWidget().querySelector('[data-js-hint="validHtml"]').outerHTML = getHintHTML([{
                hints: 1,
                title: 'Use valid HTML',
                fix: `W3 Validator can't send a valid response for <a href="https://validator.w3.org/nu/?doc=${url}" target="_blank">this audit</a>. Pages shouldn't contain any HTML errors. Non-valid HTML can cause problems as pages rely on the browser to auto-correct your code, and each browser does this differently. Also, invalid HTML could affect how search engines may misunderstand the content of a page.`,
                resources: [
                    `https://en.wikipedia.org/wiki/W3C_Markup_Validation_Service`,
                ],
            }]);
        }

        const { messages } = body;

        if (messages && messages.length) {
            for (const { type } of messages) {
                if (type === 'non-document-error') {
                    return getWidget().querySelector('[data-js-hint="validHtml"]').outerHTML = getHintHTML([{
                        hints: 1,
                        title: 'Use valid HTML',
                        fix: `W3 Validator refused to validate HTML. Please try again later. Pages shouldn't contain any HTML errors. Non-valid HTML can cause problems as pages rely on the browser to auto-correct your code, and each browser does this differently. Also, invalid HTML could affect how search engines may misunderstand the content of a page.`,
                        resources: [
                            `https://en.wikipedia.org/wiki/W3C_Markup_Validation_Service`,
                        ],
                    }]);
                } else if (type === 'error') {
                    return getWidget().querySelector('[data-js-hint="validHtml"]').outerHTML = getHintHTML([{
                        hints: 1,
                        title: 'Use valid HTML',
                        fix: `This page' markup has multiple errors and warnings. For more info check <a href="https://validator.w3.org/nu/?doc=${url}" target="_blank">the full report</a> on the W3 Markup Validator website. Pages shouldn't contain any HTML errors. Non-valid HTML can cause problems as pages rely on the browser to auto-correct your code, and each browser does this differently. Also, invalid HTML could affect how search engines may misunderstand the content of a page.`,
                        resources: [
                            `https://en.wikipedia.org/wiki/W3C_Markup_Validation_Service`,
                        ],
                    }]);
                }
            }
        }

        getWidget().querySelector('[data-js-hint="validHtml"]').outerHTML = getHintHTML([{
            hints: 0,
            title: 'Use valid HTML',
            success: `This page doesn't have any errors or warnings related to the HTML code.`,
            resources: [
                `https://en.wikipedia.org/wiki/W3C_Markup_Validation_Service`,
            ],
        }]);
    } catch (error) {
        console.error(error);
    }
}
