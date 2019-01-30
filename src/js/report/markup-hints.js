import { pushHints } from './show-hints';
import { htmlentities, getTargetSelector } from './util';
import './highlight.pack';

const hints = [];

function pushHTMLHints(hint) {
    const { elems, ...restHint } = hint;

    if (elems) {
        restHint.hints = elems.length;
        restHint.code = elems.map(el => {
            pushHints(restHint.name, getTargetSelector(el));

            return htmlentities(el.outerHTML)
        });
    }

    hints.push(restHint);
}

function printHTMLHints(widget) {
    widget.querySelector('[data-js-hints-container]').innerHTML = getHintHTML(hints);

    for (const block of widget.querySelectorAll('pre code')) {
        hljs.highlightBlock(block);
    }
}

function getHintHTML(hints) {
    return hints.reduce((acc, { name = '', hints = 0, title = '', success = '', fix = '', loading = '', resources = [], code = [] }, index) => {
        return `${acc}
        <div class="hint" data-js-hint="${name}">
            <div class="hint-head" data-js-action="openHint">
                <div class="hint-title">${title}</div>
                    ${hints ?
                        hints === -1 ?
                            `<div class="hint-result hint-result-loading">
                                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="22" height="22" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                                    <path opacity="0.3" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                                    <path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                                        C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(179.647 20 20)">
                                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                                    </path>
                                </svg>
                            </div>`
                            :
                            `<div class="hint-result hint-result-error">
                                ${hints}<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 24 24" width="16" height="16" preserveAspectRatio="xMinYMin"><path d="M12.8 1.613l6.701 11.161c.963 1.603.49 3.712-1.057 4.71a3.213 3.213 0 0 1-1.743.516H3.298C1.477 18 0 16.47 0 14.581c0-.639.173-1.264.498-1.807L7.2 1.613C8.162.01 10.196-.481 11.743.517c.428.276.79.651 1.057 1.096zm-2.22.839a1.077 1.077 0 0 0-1.514.365L2.365 13.98a1.17 1.17 0 0 0-.166.602c0 .63.492 1.14 1.1 1.14H16.7c.206 0 .407-.06.581-.172a1.164 1.164 0 0 0 .353-1.57L10.933 2.817a1.12 1.12 0 0 0-.352-.365zM10 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z"></path></svg>
                            </div>`
                        :
                        `<div class="hint-result hint-result-success">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -7 24 24" width="20" height="20" preserveAspectRatio="xMinYMin"><path d="M5.486 9.73a.997.997 0 0 1-.707-.292L.537 5.195A1 1 0 1 1 1.95 3.78l3.535 3.535L11.85.952a1 1 0 0 1 1.415 1.414L6.193 9.438a.997.997 0 0 1-.707.292z"></path></svg>
                        </div>`
                    }
            </div>
            <div class="hint-body">
                <div class="hint-desc">
                    ${hints ?
                        hints === -1 ?
                            loading
                            :
                            fix
                        :
                        success
                    }
                </div>
                ${code.length ?
                    `${code.reduce((acc, item, index) =>
                        `${acc}<div class="hint-code">
                            <pre><code class="hint-code-value html">${item}</code></pre>
                            ${!['mobile', 'pageTitle'].includes(name) ?
                                `<div class="hint-code-goto" data-js-action="flashHint" data-js-flash="${index}">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -5 24 24" width="24" height="24" preserveAspectRatio="xMinYMin"><path d="M5.314 7.071l-4.95-4.95A1 1 0 0 1 1.778.707l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z"></path></svg>
                                </div>`
                                :
                                ''
                            }
                        </div>`, '')
                    }`
                    :
                    ''
                }
                ${resources.length ?
                    `<div class="hint-resources">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="16" height="16" preserveAspectRatio="xMinYMin"><path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg>
                        Resources
                    </div>
                    ${resources.map(item => `<div><a href="${item}" target="_blank">${item}</a></div>`).join('')}`
                    :
                    ''
                }
                <a href="mailto:gzmihai@gmail.com?subject=Usability Hike - Report Audit&body=hi, I have found an issue for '${title}' on ${document.location.href}" class="report-audit" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 -2.5 24 24" width="15" height="15" preserveAspectRatio="xMinYMin"><path d="M9.808 12.971l.076-1.064.927-.529A11.644 11.644 0 0 0 13.243 9.5c2.64-2.641 3.446-5.746 2.475-6.718-.972-.97-4.077-.166-6.718 2.475-.76.76-1.397 1.59-1.878 2.432l-.53.927-1.063.076a3.973 3.973 0 0 0-2.355.988 10.984 10.984 0 0 1 3.351 2.295c.98.98 1.752 2.117 2.295 3.351a3.973 3.973 0 0 0 .988-2.355zM6.835 15.8a6.687 6.687 0 0 1-.663.771C5 17.743 3.232 18.096.868 17.631c-.464-2.363-.11-4.131 1.06-5.303.248-.246.506-.468.772-.663a8.975 8.975 0 0 0-2.598-.81 5.974 5.974 0 0 1 1.473-2.416 5.977 5.977 0 0 1 3.81-1.741 13.637 13.637 0 0 1 2.2-2.855c3.32-3.32 7.594-4.427 9.547-2.475 1.952 1.953.844 6.227-2.475 9.546a13.637 13.637 0 0 1-2.855 2.2 5.977 5.977 0 0 1-1.741 3.81 5.955 5.955 0 0 1-2.416 1.474 8.975 8.975 0 0 0-.81-2.598zM5.11 13.39a2.6 2.6 0 0 0-.54-.415c-.432.15-.94.48-1.405.944-.219.22-.487.959-.49 1.905.946-.003 1.688-.274 1.905-.49.465-.466.795-.973.944-1.405a2.6 2.6 0 0 0-.414-.54zm7.778-7.78a1 1 0 1 1 1.414-1.413A1 1 0 0 1 12.89 5.61z"></path></svg>
                    report audit
                </a>
            </div>
        </div>`;
    }, '');
}

export {
    pushHTMLHints,
    printHTMLHints,
    getHintHTML,
}
