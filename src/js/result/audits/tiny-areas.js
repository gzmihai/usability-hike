import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, code = [] } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Avoid tiny clickable areas',
            success: `All clickable areas have more than 35px in size vertically and horizontally.`,
            fix: `Links, form controls and buttons can all be made easier to click on if their size is increased. According to Fitt’s Law, we need more time to click on something with a pointing device, the further away it is and/or smaller it is. Alternatively, it's also possible to keep the visual element looking as is, but instead only increasing its hotspot or clickable area with padding. Usability Hike reports all areas that have less than 35px in size vertically and horizontally.`,
            resources: [
                `https://www.smashingmagazine.com/2009/02/9-common-usability-blunders/#1-tiny-clickable-areas`,
                `https://signalvnoise.com/posts/1048-padded-link-targets-for-better-mousing`,
            ],
            code,
        }, url),
    }
}
