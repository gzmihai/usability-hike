import insightMarkup from '../insight-markup';
import { addHints } from '../calculate-hints';

export default function ({ hints = 0, code = [] } = {}, url) {
    addHints(hints);

    return {
        hints,
        markup: insightMarkup({
            hints,
            title: 'Mobile scaling',
            success: 'This page defines a viewport property as expected.',
            fix: `The viewport property tells browsers how to adjust the page’s dimension and scaling to suit the screen size. If no viewport is specified mobile devices will try to render with typical desktop width for compatibility which breaks the user experience. When checking for the viewport we expect to see the following: <code>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;</code>.`,
            resources: [
                `https://developers.google.com/web/fundamentals/design-and-ux/responsive/#set-the-viewport`
            ],
            code,
        }, url),
    }
}
