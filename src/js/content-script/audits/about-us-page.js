export default function () {
    for (const { href = '', innerText = '' } of document.body.getElementsByTagName('a')) {
        if (href.match(/about/gi) || innerText.match(/^about/i))  {
            return;
        }
    }

    return {
        aboutUsPage: {
            hints: 1,
        }
    };
}
