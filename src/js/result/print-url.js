export default function (url) {
    const link = document.body.querySelector('[data-js="addURL"]');

    link.href = url;
    link.innerHTML = url;

    document.title += ` ${url}`;
}
