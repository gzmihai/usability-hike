export default async function () {
    try {
        const response = await fetch(`${document.location.origin}/404-page-not-found-test`, {
            method: 'GET',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            },
        });

        if (response.status !== 404) {
            return {
                error404Page: {
                    hints: 1,
                    response404: true,
                }
            };
        }
        const text = await response.text();
        const links = text.match(/<a[^>]* href=/gi);

        if (!links) {
            return {
                error404Page: {
                    hints: 1,
                    noLink: true,
                }
            };
        }
    } catch (error) {
        console.error('error-404-page', error);
    }
}
