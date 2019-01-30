import { showWidget } from './container';
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
import brokenLinks from './audits/broken-links';

function startAudits() {
    // use requestIdleCallback to first add loading screen to viewport.
    // Then process in the next frame the operations from audits
    requestIdleCallback(() => {
        recognizableLinks();
        brokenLinks();
        error404Page();
        descriptiveLink();
        lineLength();
        uppercaseLetters();
        tinyAreas();
        fontSize();
        labelFor();
        searchInput();
        contactPage();
        aboutUsPage();
        privacyPolicyPage();
        validHtml();
        mobile();
        pageTitle();
        horizontalScrollbar();

        showWidget();
    }, { timeout: 0 });
}

if (document.readyState === 'complete') {
    startAudits();
} else {
    window.onload = startAudits;
}
