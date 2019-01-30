import { pushHTMLHints } from '../markup-hints';

export default function () {
    const meta = document.querySelector('head meta[name="viewport"]');
    const result = {
        name: 'mobile',
        title: 'Mobile scaling',
        success: 'This page defines a viewport property as expected.',
        fix: `The viewport property tells browsers how to adjust the page’s dimension and scaling to suit the screen size. If no viewport is specified mobile devices will try to render with typical desktop width for compatibility which breaks the user experience. When checking for the viewport we expect to see the following: <code>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;</code>.`,
        resources: [
            `https://developers.google.com/web/fundamentals/design-and-ux/responsive/#set-the-viewport`
        ],
        elems: [],
    };

    if (!meta || !meta.content) {
        result.elems.push(document.querySelector('head'));
        return pushHTMLHints(result);
    }

    const content = meta.content.replace(/\s/gi, '').split(',').reduce((acc, item) => {
        const [key, value] = item.split('=');
        acc[key] = value;

        return acc;
    }, {});

    if (Object.keys(content).length !== 2 || content.width !== 'device-width' || Number.parseInt(content['initial-scale']) !== 1) {
        result.elems.push(meta);
        return pushHTMLHints(result);
    }

    pushHTMLHints(result);
}
