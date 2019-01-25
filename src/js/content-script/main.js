import { removeLoading } from './loading';
import validHtml from './audits/valid-html';
import lineLength from './audits/line-length';
import pageTitle from './audits/page-title';
import descriptiveLink from './audits/descriptive-link';
import uppercaseLetters from './audits/uppercase-letters';
import error404Page from './audits/error-404-page';
import horizontalScrollbar from './audits/horizontal-scrollbar';
import contactPage from './audits/contact-page';
import aboutUsPage from './audits/about-us-page';
import labelFor from './audits/label-for';
import privacyPolicyPage from './audits/privacy-policy-page';
import searchInput from './audits/search-input';
import mobile from './audits/mobile';
import tinyAreas from './audits/tiny-areas';
import fontSize from './audits/font-size';
import recognizableLinks from './audits/recognizable-links';

function startAudits() {
    // use requestIdleCallback to first add loading screen to viewport.
    // Then process in the next frame the operations from audits
    requestIdleCallback(async () => {
        try {
            chrome.runtime.sendMessage({
                cmd: 'openResult',
                url: document.location.href,
                timestamp: Date.now(),
                values: await Promise.all([
                    validHtml(),
                    lineLength(),
                    pageTitle(),
                    descriptiveLink(),
                    uppercaseLetters(),
                    error404Page(),
                    horizontalScrollbar(),
                    contactPage(),
                    aboutUsPage(),
                    labelFor(),
                    privacyPolicyPage(),
                    searchInput(),
                    mobile(),
                    tinyAreas(),
                    fontSize(),
                    recognizableLinks(),
                ]),
            }, () => {
                removeLoading();
            });
        } catch (error) {
            console.error('Usability Hike: error on requestIdleCallback', error);
        }
    }, { timeout: 0 });
}

if (document.readyState === 'complete') {
    startAudits();
} else {
    window.onload = startAudits;
}
