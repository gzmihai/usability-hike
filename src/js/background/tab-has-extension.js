let tabs = [];

function removeTab(tabId) {
    tabs = tabs.filter(id => id !== tabId);
}

function availableTab(tabId) {
    const result = tabs.includes(tabId);

    if (!result) {
        tabs.push(tabId);
    }

    return !result;
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (tabs.includes(tabId) && changeInfo.status === 'loading') {
        removeTab(tabId);
    }
});

chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabs.includes(tabId)) {
        removeTab(tabId);
    }
});

export {
    removeTab,
    availableTab
}
