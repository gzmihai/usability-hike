const container = document.createElement('div');
container.setAttribute('style', 'width: 100%; height: 100%; position: fixed; top: 0; left: 0; background-color: rgba(0, 0, 0, .7); display: grid; place-content: center; font-size: 20px; color: #fff; z-index: 2147483647;');
container.innerText = `Usability Hike checks your page...`;

document.body.appendChild(container);

function removeLoading() {
    container.remove();
}

export {
    removeLoading,
    container,
};
