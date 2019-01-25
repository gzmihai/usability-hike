import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, code = [] } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Use legible font sizes',
            success: `No illegible font sizes were found on this page.`,
            fix: `Font sizes smaller than 12px are often difficult to read and may require users to zoom the text at a comfortable reading size. The smaller the font, the greater the eyestrain. Many times, people will skip over hard-to-read font sizes, ignoring the information.`,
            resources: [
                `https://developers.google.com/web/tools/lighthouse/audits/font-sizes`,
            ],
            code,
        }, url),
    }
}
