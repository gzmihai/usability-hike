const port = chrome.runtime.connect({ name: 'fetch' });
const subscribe = [];
let isPortActive = true;
let connectionsAvailable = 0;

port.onMessage.addListener(function (response) {
    for (let i = 0; i < subscribe.length; i++) {
        const { url, resolve } = subscribe[i];

        if (url === response.url) {
            resolve(response);
            subscribe.splice(i, 1);
            break;
        }

    }
});

function connectPort() {
    connectionsAvailable++;
}

function disconnectPort() {
    connectionsAvailable--;

    if (connectionsAvailable < 1) {
        isPortActive = false;
        port.disconnect();
    }
}

async function waitResponse(msg) {
    return new Promise((resolve, reject) => {
        if (!isPortActive) {
            return reject('fetch port is closed');
        }

        port.postMessage(msg);

        subscribe.push({
            url: msg.url,
            resolve,
        })
    });
}

export {
    connectPort,
    disconnectPort,
    waitResponse,
}
