import { updateProcent } from '../loading';

const blacklist = [
    'googleleads.g.doubleclick.net',
    'doubleclick.net',
    'googleadservices.com',
    'www.googleadservices.com',
    'googlesyndication.com',
    'adservices.google.com',
    'appliedsemantics.com',
];

export default async function () {
    try {
        const elems = [];
        const allLinks = document.body.getElementsByTagName('a');
        const allLinksLen = allLinks.length;

        for (let i = 0; i < allLinksLen; i++) {
            const href = allLinks[i].href;

            if (!href || !href.startsWith('http') || blacklist.includes((new URL(href)).hostname)) {
                continue;
            }

            const { error, status } = await new Promise((resolve) => {
                setTimeout(() => {
                    chrome.runtime.sendMessage({
                        cmd: 'fetchURL',
                        url: href,
                        options: {
                            method: 'HEAD',
                            headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
                            },
                        },
                    }, resolve);
                }, 200);
            });

            if ((error || status >= 400) && !elems.includes(href)) {
                console.log(href);
                elems.push(href);
            }

            updateProcent(Number.parseInt(i * 100 / allLinksLen));
        }

        const hints = elems.length;

        if (hints) {
            return {
                brokenLinks: {
                    hints,
                    code: elems,
                }
            }
        }
    } catch (error) {
        console.error('error-404-page', error);
    }
}
