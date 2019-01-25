import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, w3ServerIssue = false, connectionRefused = false, hasErrors = false } = {}, url) {
    addHints(hints);

    let text = '';

    if (w3ServerIssue) {
        text = `W3 Validator can't send a valid response for <a href="https://validator.w3.org/nu/?doc=${url}" target="_blank">this audit</a>.`;
    } else if (connectionRefused) {
        text = 'W3 Validator refused to validate HTML. Please try again later';
    } else if (hasErrors) {
        text = `This page' markup has multiple errors and warnings. For more info check <a href="https://validator.w3.org/nu/?doc=${url}" target="_blank">the full report</a> on the W3 Markup Validator website.`;
    }

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Use valid HTML',
            success: `This page doesn't have any errors or warnings related to the HTML code.`,
            fix: `Pages shouldn't contain any HTML errors. Non-valid HTML can cause problems as pages rely on the browser to auto-correct your code, and each browser does this differently. Also, invalid HTML could affect how search engines may misunderstand the content of a page.`,
            resources: [
                `https://en.wikipedia.org/wiki/W3C_Markup_Validation_Service`,
            ],
            text,
        }, url),
    }
}
