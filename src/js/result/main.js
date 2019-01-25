import './highlight.pack';
import printURL from './print-url';
import printDate from './print-date';
import downloadButton from './download-button';
import sortAndAddAudits from './sort-and-add-audits';
import { printTotalHints } from './calculate-hints';
import pageTitle from './audits/page-title';
import contactPage from './audits/contact-page';
import aboutUsPage from './audits/about-us-page';
import labelFor from './audits/label-for';
import error404Page from './audits/error-404-page';
import uppercaseLetters from './audits/uppercase-letters';
import horizontalScrollbar from './audits/horizontal-scrollbar';
import descriptiveLink from './audits/descriptive-link';
import lineLength from './audits/line-length';
import validHtml from './audits/valid-html';
import privacyPolicyPage from './audits/privacy-policy-page';
import searchInput from './audits/search-input';
import mobile from './audits/mobile';
import tinyAreas from './audits/tiny-areas';
import fontSize from './audits/font-size';
import recognizableLinks from './audits/recognizable-links';

const href = new URL(window.location.href);
const url = decodeURI(atob(href.searchParams.get('url')));
const timestamp = href.searchParams.get('timestamp');

chrome.storage.local.get(url, function(result) {
    console.log('Usability Hike: from storage', result);
    const storage = result[url][timestamp];

    printURL(url);

    sortAndAddAudits([
        pageTitle(storage.pageTitle, url),
        contactPage(storage.contactPage, url),
        aboutUsPage(storage.aboutUsPage, url),
        labelFor(storage.labelFor, url),
        error404Page(storage.error404Page, url),
        uppercaseLetters(storage.uppercaseLetters, url),
        horizontalScrollbar(storage.horizontalScrollbar, url),
        descriptiveLink(storage.descriptiveLink, url),
        lineLength(storage.lineLength, url),
        validHtml(storage.validHtml, url),
        privacyPolicyPage(storage.privacyPolicyPage, url),
        searchInput(storage.searchInput, url),
        mobile(storage.mobile, url),
        tinyAreas(storage.tinyAreas, url),
        fontSize(storage.fontSize, url),
        recognizableLinks(storage.recognizableLinks, url),
    ]);

    printTotalHints();

    hljs.initHighlighting();

    const dateStr = printDate(timestamp);

    downloadButton(dateStr);
});
