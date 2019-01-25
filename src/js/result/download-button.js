export default async function (dateStr) {
    try {
        let html = new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML;

        const downloadButton = document.body.querySelector('[data-js-download]');
        downloadButton.removeAttribute('disabled');

        const cssResultText = await (await fetch('style/result/main.css')).text();
        html = html.replace(/<link rel="stylesheet" href="style\/result\/main\.css">/gi, `<style>${cssResultText}</style>`);
        html = html.replace(/<script(.*)<\/script>/gi, '');

        downloadButton.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
        downloadButton.download = `Usability-Hike-${dateStr.replace(/[,:\s]+/gi, '-')}.html`;
    } catch (error) {
        console.error('Usability Hike: download button', error);
    }
}
