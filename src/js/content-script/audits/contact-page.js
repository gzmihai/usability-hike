export default function () {
    // if these are available we have a chat
    if (document.querySelector('script[src*="js.driftt.com"]') ||
        document.querySelector('script[src*="widget.intercom.io"]') ||
        document.querySelector('script[src*="client.crisp.chat"]') ||
        document.querySelector('script[src*="wchat.freshchat.com"]') ||
        document.querySelector('script[src*="widget.helpcrunch.com"]') ||
        document.querySelector('script[src*="embed.tawk.to"]')) {
        return;
    }

    if (document.body.innerText.match(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi)) {
        return;
    }

    for (const { href = '', innerText = '' } of document.body.getElementsByTagName('a')) {
        if (href.match(/(^mailto:)|contact|help|support/i) || innerText.match(/^contact/i)) {
            return;
        }
    }

    return {
        contactPage: {
            hints: 1,
        }
    };
}
