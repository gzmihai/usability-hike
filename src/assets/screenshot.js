export default async function () {
    const captures = [];

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    const totalHeight = document.documentElement.scrollHeight;
    const crop = innerHeight * 0.25;
    const viewportHeight = innerHeight * 0.5; // to have space for horizontal scrollbar and floating menus
    const pagesToScroll = Math.ceil((totalHeight - 2 * crop) / viewportHeight);

    const canvas = document.createElement('canvas');
    canvas.width = innerWidth;
    canvas.height = totalHeight;

    let dy = 0;

    for (let i = 0; i < pagesToScroll; i++) {
        window.scrollTo(0, i * viewportHeight);

        let cropTop = crop;
        let cropBottom = crop;

        if (i === 0) {
            cropTop = 0;
        } else if (i === pagesToScroll - 1) {
            cropTop = crop + (i * viewportHeight + innerHeight - totalHeight);
            cropBottom = 0;
        }

        const src = await new Promise(resolve => setTimeout(() => chrome.runtime.sendMessage({ cmd: 'captureVisibleTab', }, resolve), 300));

        await new Promise(resolve => {
            const image = new Image();
            image.onload = () => {
                const dHeight = innerHeight - cropTop - cropBottom;

                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
                canvas.getContext('2d').drawImage(image, 0, cropTop, innerWidth, dHeight, 0, dy, innerWidth, dHeight);

                dy += dHeight;

                resolve();
            }

            image.src = src;
        });
    }

    window.scrollTo(0, 0);

    return `<img src="${canvas.toDataURL()}">`;
}


// background/main.js
else if (request.cmd === 'captureVisibleTab') {
    chrome.tabs.captureVisibleTab(null, {
        format: 'jpeg',
        quality: 40
    }, sendResponse);

    return true;
}



else if (request.cmd === 'openResult') {
    const blob = new Blob([`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Usability Hike - Report for</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                overflow-x: hidden;
            }

            .screenshot {
                position: relative;
            }

            .screenshot:after {
                content: '';
                display: block;
                width: 100%;
                height: 100%;
                z-index: 1;
                position: absolute;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.6);
            }

            img {
                max-width: 100%;
                width: 100%;
            }

            .hint {
                position: absolute;
                border: 3px solid #f31212;
                border-radius: 10px;
                z-index: 2;
            }
        </style>
    </head>
    <body>
        <div class="screenshot">
            ${request.screenshot}
            <div class="hint" style="left: 20%; top: 10%; width: 3%; height: 4%;"></div>
        </div>
        <script>
            const audits = ${request.audits};
        </script>
    </body>
    </html>
    `], { type: 'text/html' });

    chrome.windows.create({
        url: URL.createObjectURL(blob),
        left: 0,
        top: 0,
        width: request.width,
        height: request.height,
     }, sendResponse);

    removeTab(sender.tab.id);

    return true;
}
