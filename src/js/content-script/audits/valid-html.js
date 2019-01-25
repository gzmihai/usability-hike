export default async function () {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({
            cmd: 'fetchURL',
            url: `https://validator.w3.org/nu/?out=json&doc=${document.location.href}`,
            options: {
                method: 'GET',
                headers: {
                    "Content-type": "text/html, charset=utf-8",
                    'User-Agent': 'Chrome Extension: Usability Hike v0.0.1'
                },
            },
            body: 'json'
        }, ({ error = null, status = 500, body = {} }) => {
            if (error || status >= 400) {
                return resolve({
                    validHtml: {
                        hints: 1,
                        w3ServerIssue: true,
                    }
                });
            }

            const { messages } = body;

            if (messages && messages.length) {
                for (const { type } of messages) {
                    if (type === 'non-document-error') {
                        return resolve({
                            validHtml: {
                                hints: 1,
                                connectionRefused: true,
                            }
                        });
                    } else if (type === 'error') {
                        return resolve({
                            validHtml: {
                                hints: 1,
                                hasErrors: true,
                            }
                        });
                    }
                }
            }

            resolve();
        });
    })
}
