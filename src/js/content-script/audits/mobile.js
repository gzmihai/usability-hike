import { htmlentities } from '../util';

export default function () {
    const meta = document.querySelector('head meta[name="viewport"]');

    if (!meta || !meta.content) {
        return {
            mobile: {
                hints: 1,
                code: [htmlentities(document.querySelector('head').outerHTML)]
            }
        };
    }

    const content = meta.content.replace(/\s/gi, '').split(',').reduce((acc, item) => {
        const [key, value] = item.split('=');
        acc[key] = value;

        return acc;
    }, {});

    if (Object.keys(content).length !== 2 || content.width !== 'device-width' || Number.parseInt(content['initial-scale']) !== 1) {
        return {
            mobile: {
                hints: 1,
                code: [htmlentities(meta.outerHTML)]
            }
        };
    }
}
