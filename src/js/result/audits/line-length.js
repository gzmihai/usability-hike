import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, code = [] } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Use appropriate line lengths',
            success: `No line lengths greater than 120 characters were found on this page.`,
            fix: `According to classic typographic books, the optimal number of characters per line is between 55 and 75, but between 75 and 85 characters per line is more popular in practice. Usability Hike reports all line lengths greater than 120 characters.`,
            resources: [
                `https://webstandards.hhs.gov/guidelines/65`,
            ],
            code,
        }, url),
    }
}
