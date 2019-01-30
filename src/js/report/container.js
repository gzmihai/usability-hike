import { getHints } from './show-hints';
import { printHTMLHints } from './markup-hints';
import { tabIsActive } from './util';

// send to background that this tab is active
chrome.runtime.onMessage.addListener(tabIsActive);

const shadow = document.createElement('div');
const container = shadow.attachShadow({
    mode: 'closed'
});
container.innerHTML = `<style> @import "${chrome.runtime.getURL('style/report/main.css')}"; </style>`;

const loading = document.createElement('div');
loading.setAttribute('class', 'loading');
loading.innerText = `Usability Hike checks your page...`;
container.appendChild(loading);

const widget = document.createElement('div');
widget.setAttribute('class', 'widget');
widget.innerHTML = `
    <header class="header">
        <a href="https://getulmo.com/usability-hike" target="_blank">
            <span class="header-logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 24 24" width="24" height="24" preserveAspectRatio="xMinYMin">
                    <path d="M7.116 10.749L6 1.948l-1.116 8.8H1c-.552 0-1-.437-1-.976a.99.99 0 0 1 1-.978h2.116l.9-7.086C4.15.636 5.15-.124 6.245.008c.91.11 1.626.81 1.739 1.7l.899 7.086h1.974L12 16.04l1.142-7.245H19c.552 0 1 .438 1 .978s-.448.977-1 .977h-4.142l-.881 5.587a1.978 1.978 0 0 1-1.672 1.634c-1.092.165-2.113-.567-2.282-1.634l-.88-5.587H7.115z"></path>
                </svg>
                Usability Hike
            </span>
            <span class="header-by-ulmo">by getulmo.com</span>
        </a>
        <div class="header-controls">
            <div data-js-action="minimizeWidget" class="header-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -5 24 24" width="26" height="26" preserveAspectRatio="xMinYMin"><path d="M2.757 7l4.95 4.95a1 1 0 1 1-1.414 1.414L.636 7.707a1 1 0 0 1 0-1.414L6.293.636A1 1 0 0 1 7.707 2.05L2.757 7z"></path></svg>
            </div>
            <div data-js-action="close" class="header-close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 24 24" width="26" height="26" preserveAspectRatio="xMinYMin"><path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z" style=""></path></svg>
            </div>
        </div>
    </header>
    <main data-js-hints-container class="main"></main>
    <section class="try-ulmo">
        <p>Want to further improve your usability?</p>
        <a href="https://getulmo.com/?source=usability-hike-try" target="_blank">TRY ULMO</a>
    </section>
    <footer class="footer">
        <div class="footer-links">
            <a href="mailto:gzmihai@gmail.com?subject=Usability Hike Hello" target="_blank" class="footer-send-feedback">Send feedback</a>
            <a href="https://getulmo.us17.list-manage.com/subscribe/post?u=48302d72140d82ba84a0182c4&id=eab842d381" target="_blank">Subscribe for updates</a>
            <!-- @todo <a href="https://twitter.com/intent/tweet?text=Check%20out%20my%20Website%20Usability%20Report&url=https%3A%2F%2Fgetulmo.com/usability-hike&hashtags=UsabilityHike" target="_blank" class="footer-social-twitter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="28" height="28" preserveAspectRatio="xMinYMin"><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path><path d="M15 6.947c-.368.16-.763.27-1.178.318.424-.25.748-.646.902-1.117-.398.231-.836.4-1.304.49A2.06 2.06 0 0 0 11.923 6c-1.133 0-2.051.905-2.051 2.02 0 .158.018.312.053.46a5.854 5.854 0 0 1-4.228-2.11 1.982 1.982 0 0 0-.278 1.015c0 .7.363 1.32.913 1.681a2.076 2.076 0 0 1-.93-.253v.025a2.03 2.03 0 0 0 1.646 1.98 2.108 2.108 0 0 1-.927.034 2.049 2.049 0 0 0 1.916 1.403 4.156 4.156 0 0 1-2.548.864c-.165 0-.328-.01-.489-.028A5.863 5.863 0 0 0 8.144 14c3.774 0 5.837-3.078 5.837-5.748l-.007-.262A4.063 4.063 0 0 0 15 6.947z"></path></svg>
            </a>
            <a href="http://www.facebook.com/share.php?title=Check%20out%20my%20Website%20Usability%20Report&u=https%3A%2F%2Fgetulmo.com/usability-hike" target="_blank" class="footer-social-fb">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="28" height="28" preserveAspectRatio="xMinYMin"><path d="M8.695 6.937v1.377H7.687v1.683h1.008V15h2.072V9.997h1.39s.131-.807.194-1.69h-1.576v-1.15c0-.173.226-.404.45-.404h1.128V5h-1.535C8.644 5 8.695 6.685 8.695 6.937z"></path><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg>
            </a>
            <a href="https://www.linkedin.com/shareArticle?title=Check%20out%20my%20Website%20Usability%20Report&url=https%3A%2F%2Fgetulmo.com/usability-hike&summary=Check%20out%20my%20Website%20Usability%20Report" target="_blank" class="footer-social-linkedin">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="28" height="28" preserveAspectRatio="xMinYMin"><path d="M15 11.13v3.697h-2.143v-3.45c0-.866-.31-1.457-1.086-1.457-.592 0-.945.398-1.1.784-.056.138-.071.33-.071.522v3.601H8.456s.029-5.842 0-6.447H10.6v.913l-.014.021h.014v-.02c.285-.44.793-1.066 1.932-1.066 1.41 0 2.468.922 2.468 2.902zM6.213 5.271C5.48 5.271 5 5.753 5 6.385c0 .62.466 1.115 1.185 1.115h.014c.748 0 1.213-.496 1.213-1.115-.014-.632-.465-1.114-1.199-1.114zm-1.086 9.556h2.144V8.38H5.127v6.447z"></path><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg>
            </a>
            -->
        </div>
        <div class="footer-copy">All Rights Reserved © 2019 Ulmo Analytics.</div>
    </footer>
`;

const hints = document.createElement('div');
hints.setAttribute('class', 'hints');
container.appendChild(hints);

document.body.appendChild(shadow);

container.addEventListener('click', e => {
    const target = e.target;
    const action = target.getAttribute('data-js-action');

    if (action === 'minimizeWidget') {
        widget.classList.toggle('widget--open');
        loading.classList.toggle('loading--open');
    } else if (action === 'close') {
        window.removeEventListener('resize', onResize);

        shadow.remove();

        // send to background that this tab is inactive
        chrome.runtime.onMessage.removeListener(tabIsActive);
    } else if (action === 'openHint') {
        const currentHint = target.closest('[data-js-hint]');

        if (currentHint.classList.contains('hint--open')) {
            currentHint.classList.remove('hint--open')
        } else {
            for (const hint of container.querySelectorAll('[data-js-hint]')) {
                hint.classList.remove('hint--open');
            }

            currentHint.classList.add('hint--open');
        }

        // show hints
        updateHints();
    } else if (action === 'flashHint') {
        const flashIndex = Number.parseInt(target.getAttribute('data-js-flash'));

        const currentHint = target.closest('[data-js-hint]');
        const el = document.querySelector(getHints(currentHint.getAttribute('data-js-hint'))[flashIndex]);

        window.scrollTo(0, el.getBoundingClientRect().top + window.pageYOffset - 300);

        const hint = hints.children[flashIndex];
        hint.classList.add('hints-item--flash');

        setTimeout(() => {
            hint.classList.remove('hints-item--flash');
        }, 1600);
    }
});

window.addEventListener('resize', onResize);

function onResize() {
    // show hints
    updateHints();
}

function showWidget() {
    container.appendChild(widget);

    printHTMLHints(widget);

    requestAnimationFrame(() => {
        loading.innerText = '';
        widget.classList.add('widget--open');

        // show hints
        updateHints();

        widget.addEventListener('transitionend', function () {
            this.style.overflowY = this.classList.contains('widget--open')? 'auto' : 'visible';
        });
    });
}

function updateHints() {
    const hint = container.querySelector('.hint--open[data-js-hint]');

    if (!hint) {
        hints.innerHTML = '';
    } else {
        hints.innerHTML = getHints(hint.getAttribute('data-js-hint')).reduce((acc, selector) => {
            let { left, top, width, height } = document.querySelector(selector).getBoundingClientRect();

            return `${acc}<div class="hints-item" style="left: ${left - 4}px; top: ${window.pageYOffset + top - 4}px; width: ${width + 2}px; height: ${height + 2}px;"></div>`;
        }, '');
    }

}

function getWidget() {
    return widget;
}

export {
    showWidget,
    getWidget,
    updateHints,
}
