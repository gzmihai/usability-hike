export default function () {
    if (!document.body.querySelectorAll('input[type="email"]').length && !document.body.querySelectorAll('input[type="password"]').length) {
        return;
    }

    for (const { href = '', innerText = '' } of document.body.getElementsByTagName('a')) {
        if (href.match(/privacy|policy|terms/i) || innerText.match(/^privacy/i)) {
            return;
        }
    }

    return {
        privacyPolicyPage: {
            hints: 1,
        }
    };
}
