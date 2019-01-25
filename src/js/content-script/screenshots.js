export default async function () {
    const captures = [];

    const totalHeight = document.documentElement.scrollHeight;
    const viewportHeight = Number.parseInt(window.innerHeight * 0.7); // to have space for horizontal scrollbar and floating menus
    const pagesToScroll = Math.ceil(totalHeight / viewportHeight);

    for (let i = 0; i < pagesToScroll; i++) {
        window.scrollTo(0, i * viewportHeight);

        console.log(i * viewportHeight);

        const data = await new Promise(resolve => setTimeout(() => {
            chrome.runtime.sendMessage({ cmd: 'captureVisibleTab', }, resolve);
        }, 150));

        captures.push({
            width: window.innerWidth,
            height: window.innerHeight,
            data: data,
            // data: 'data:image/png;base64,' + data.data,
        });
    }

    window.scrollTo(0, 0);

    return captures;
}
