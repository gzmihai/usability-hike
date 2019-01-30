import { pushHTMLHints, getHintHTML } from '../markup-hints';
import { getWidget } from '../container';
import { pushHints } from '../show-hints';
import { isHidden, htmlentities, getTargetSelector } from '../util';
import { updateHints } from '../container';
import { connectPort, disconnectPort, waitResponse } from '../background-fetch';

const blacklist = [
    'googleleads.g.doubleclick.net',
    'doubleclick.net',
    'googleadservices.com',
    'www.googleadservices.com',
    'googlesyndication.com',
    'adservices.google.com',
    'appliedsemantics.com',
    'www.googletagmanager.com',
    'googletagmanager.com',
];

connectPort();

// @todo improve broken links response: https://validator.w3.org/checklink?uri=https%3A%2F%2Fcanny.io%2F&hide_type=all&depth=&check=Check#d1code_-1
export default async function () {
    try {
        const elems = [];
        const allLinks = [];
        const urlDuplicates = [];

        for (const el of document.body.getElementsByTagName('a')) {
            const url = el.href;
            const urlAttribute = el.getAttribute('href');

            if (!url || !urlAttribute || urlAttribute.match(/^(javascript|#|tel|mailto)/gi) || blacklist.includes((new URL(url)).hostname) || isHidden(el)) {
                continue;
            }

            if (!urlDuplicates.includes(url)) {
                allLinks.push(el);
                urlDuplicates.push(url);
            }

        }

        const allLinksLen = allLinks.length;

        pushHTMLHints({
            name: 'brokenLinks',
            hints: -1,
            title: 'Broken Links',
            loading: `This audit runs in background. <strong><span data-js-broken-links-checked>0</span> of ${allLinksLen}</strong> links were checked. The results will appear here after the process is finished.`,
        });

        for (let i = 0; i < allLinksLen; i++) {
            const link = allLinks[i];

            await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 1000));

            const { error, status } = await waitResponse({
                url: link.href,
                options: {
                    method: 'HEAD',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
                    },
                },
            });

            if (error || status >= 400) {
                elems.push(link);
            }

            getWidget().querySelector('[data-js-broken-links-checked]').innerText = i + 1;
        }

        disconnectPort();

        const obj = {
            name: 'brokenLinks',
            title: 'Broken Links',
            success: `No broken links were found on this page.`,
            fix: `The following links could not be checked by Usability Hike or the server returned an error. Please check them manually.`,
            resources: [
                `https://www.nngroup.com/articles/link-promise/`,
            ],
            elems,
        };

        if (elems.length) {
            obj.hints = elems.length;
            obj.code = elems.map(el => {
                pushHints(obj.name, getTargetSelector(el));

                return htmlentities(el.outerHTML)
            });
        }

        const hintElem = getWidget().querySelector('[data-js-hint="brokenLinks"]');
        const isActive = hintElem.classList.contains('hint--open');
        hintElem.outerHTML = getHintHTML([obj], isActive);

        const newHintInDom = getWidget().querySelector('[data-js-hint="brokenLinks"]');

        if (isActive) {
            newHintInDom.classList.add('hint--open');
            updateHints();
        }

        if (elems.length) {
            for (const block of newHintInDom.querySelectorAll('pre code')) {
                hljs.highlightBlock(block);
            }
        }
    } catch (error) {
        console.error('error-404-page', error);
    }
}
