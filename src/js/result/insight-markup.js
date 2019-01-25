export default function ({ title = '', hints = 0, success = '', fix = '', resources = [], text = '', code = [] }, url) {
    return `
        <section class="block center">
            <h1 class="hint-h1">
                ${title}
                ${hints ?
                    `<div class="hint-status">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 24 24" width="16" height="16" preserveAspectRatio="xMinYMin" class=""><path d="M12.8 1.613l6.701 11.161c.963 1.603.49 3.712-1.057 4.71a3.213 3.213 0 0 1-1.743.516H3.298C1.477 18 0 16.47 0 14.581c0-.639.173-1.264.498-1.807L7.2 1.613C8.162.01 10.196-.481 11.743.517c.428.276.79.651 1.057 1.096zm-2.22.839a1.077 1.077 0 0 0-1.514.365L2.365 13.98a1.17 1.17 0 0 0-.166.602c0 .63.492 1.14 1.1 1.14H16.7c.206 0 .407-.06.581-.172a1.164 1.164 0 0 0 .353-1.57L10.933 2.817a1.12 1.12 0 0 0-.352-.365zM10 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z"></path></svg>
                        ${hints} HINT${hints !== 1 ? 'S' : ''}
                    </div>`
                    : ''
                }
            </h1>
            <div class="hint">
                <div class="hint-result">
                    <p>${hints ? fix : success}</p>
                    <h4 class="hint-info-fix">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="20" height="20" preserveAspectRatio="xMinYMin"><path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg>
                            Resources
                        </h4>
                    ${resources.map(item => `<a href="${item}" target="_blank">${item}</a>`).join('')}
                    <a href="mailto:gzmihai@gmail.com?subject=Usability Hike - Report Audit&body=hi, I have found an issue for '${title}' on ${url}" class="report-audit" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 -2.5 24 24" width="15" height="15" preserveAspectRatio="xMinYMin"><path d="M9.808 12.971l.076-1.064.927-.529A11.644 11.644 0 0 0 13.243 9.5c2.64-2.641 3.446-5.746 2.475-6.718-.972-.97-4.077-.166-6.718 2.475-.76.76-1.397 1.59-1.878 2.432l-.53.927-1.063.076a3.973 3.973 0 0 0-2.355.988 10.984 10.984 0 0 1 3.351 2.295c.98.98 1.752 2.117 2.295 3.351a3.973 3.973 0 0 0 .988-2.355zM6.835 15.8a6.687 6.687 0 0 1-.663.771C5 17.743 3.232 18.096.868 17.631c-.464-2.363-.11-4.131 1.06-5.303.248-.246.506-.468.772-.663a8.975 8.975 0 0 0-2.598-.81 5.974 5.974 0 0 1 1.473-2.416 5.977 5.977 0 0 1 3.81-1.741 13.637 13.637 0 0 1 2.2-2.855c3.32-3.32 7.594-4.427 9.547-2.475 1.952 1.953.844 6.227-2.475 9.546a13.637 13.637 0 0 1-2.855 2.2 5.977 5.977 0 0 1-1.741 3.81 5.955 5.955 0 0 1-2.416 1.474 8.975 8.975 0 0 0-.81-2.598zM5.11 13.39a2.6 2.6 0 0 0-.54-.415c-.432.15-.94.48-1.405.944-.219.22-.487.959-.49 1.905.946-.003 1.688-.274 1.905-.49.465-.466.795-.973.944-1.405a2.6 2.6 0 0 0-.414-.54zm7.778-7.78a1 1 0 1 1 1.414-1.413A1 1 0 0 1 12.89 5.61z"></path></svg>
                        report audit
                    </a>
                </div>
                ${!hints ?
                    `<div class="hint-result-success">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -2 24 24" width="70" height="70" preserveAspectRatio="xMinYMin"><path d="M2 4.386V8a9.02 9.02 0 0 0 3.08 6.787L8 17.342l2.92-2.555A9.019 9.019 0 0 0 14 8V4.386l-6-2.25-6 2.25zM.649 2.756L8 0l7.351 2.757a1 1 0 0 1 .649.936V8c0 3.177-1.372 6.2-3.763 8.293L8 20l-4.237-3.707A11.019 11.019 0 0 1 0 8V3.693a1 1 0 0 1 .649-.936zm6.29 7.512l3.536-3.536a1 1 0 0 1 1.414 1.414L7.646 12.39a1 1 0 0 1-1.414 0l-2.121-2.121a1 1 0 0 1 1.414-1.414l1.414 1.414z"></path></svg>
                        AUDIT PASSED
                    </div>`
                    : ''
                }
                ${text ? `<div class="hint-result-text">${text}</div>` : ''}
                ${code.length ?
                    `<div>
                        ${code.map((item, index) =>
                            `<div class="hint-result-code">
                                <h6 class="hint-h6">#${index + 1}</h6>
                                <pre><code class="html">${item}</code></pre>
                            </div>`).join('')
                        }
                    </div>`
                    : ''
                }
            </div>
        </section>
    `;
}
