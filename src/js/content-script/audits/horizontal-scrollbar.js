export default function () {
    if (window.innerHeight !== document.documentElement.clientHeight) {
        return {
            horizontalScrollbar: {
                hints: 1,
            }
        }
    }
}
