import { fetchURL } from './util';

// @todo - make it persistent: false in manifest.json

chrome.runtime.onConnect.addListener(port => {
    if (port.name === 'fetch') {
        let portActive = true;

        port.onMessage.addListener(request => {
            fetchURL(request).then(response => {
                if (!portActive) {
                    return;
                }

                port.postMessage(response);
            });
        });

        port.onDisconnect.addListener(() => portActive = false);
    }
});

chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({
        active: true,
        currentWindow: true,
    }, tabs => {
        const tabId = tabs[0].id;

        chrome.tabs.sendMessage(tabId, { cmd: 'tabActive' }, isActive => {
            if (!isActive) {
                chrome.tabs.executeScript(tabId, { file: 'js/report/main.js' });
            }
        });
    });
});
