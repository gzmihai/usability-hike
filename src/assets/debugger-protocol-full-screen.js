if (request.cmd == 'fullScreenshot') {
    (async () => {
        const tabId = sender.tab.id;

        const viewportWidth = request.viewportWidth;
        const height = request.height - 1;

        // Set up viewport resolution, etc.
        const deviceMetrics = {
            width: viewportWidth,
            height: height,
            deviceScaleFactor: 0,
            mobile: false,
            fitWindow: true,
            dontSetVisibleSize: false,
        };

        await new Promise(resolve => chrome.debugger.attach({ tabId }, '1.1', resolve));

        await new Promise(resolve => chrome.debugger.sendCommand({ tabId }, 'Emulation.setVisibleSize', {width: viewportWidth, height: height}, resolve));
        await new Promise(resolve => chrome.debugger.sendCommand({ tabId }, 'Emulation.setDeviceMetricsOverride', deviceMetrics, resolve));
        await new Promise(resolve => chrome.debugger.sendCommand({ tabId }, 'Emulation.setPageScaleFactor', { pageScaleFactor: 1 }, resolve));

        setTimeout(async function() {
            sendResponse(await new Promise(resolve => chrome.debugger.sendCommand({ tabId }, 'Page.captureScreenshot', { format: 'png'}, resolve)));

            await new Promise(resolve => chrome.debugger.detach({ tabId }, resolve));
          }, 2000);
    })();

    return true;
}
