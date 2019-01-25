import { fetchURL } from './util';
import {
    removeTab,
    availableTab,
} from './tab-has-extension';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cmd == 'fetchURL') {
        fetchURL(request).then(sendResponse);

        return true;
    } else if (request.cmd == 'openResult') {
        const { url, timestamp, values } = request;

        chrome.storage.local.get(url, function (result) {
            if (!result[url]) {
                result[url] = {};
            }

            result[url][timestamp] = Object.assign({}, ...values);

            chrome.storage.local.set(result, () => {
                sendResponse();

                removeTab(sender.tab.id)

                chrome.tabs.create({
                    url: `result.html?url=${btoa(encodeURI(url))}&timestamp=${timestamp}`,
                });
            });
        });

        return true;
    }
});

chrome.browserAction.onClicked.addListener(function (e) {
    chrome.tabs.query({
        active: true,
        currentWindow: true,
    }, function (tabs) {
        const tabId = tabs[0].id;

        if (availableTab(tabId)) {
            try {
                chrome.tabs.executeScript(tabId, {
                    file: 'js/content-script/main.js'
                });
            } catch (error) {
                console.log(error);
            }
        }
    });
});
