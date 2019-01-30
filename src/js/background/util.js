async function fetchURL({ url = '', options = {}, body = null }) {
    try {
        const response = await fetch(url, options);

        return {
            url,
            status: response.status,
            ...(body && { body: await response[body]() }),
        }
    } catch (error) {
        console.log(`Usability Hike: fetchURL error for ${url}`, error);

        return {
            url,
            error: error.message,
        }
    }
}
export {
    fetchURL,
}
