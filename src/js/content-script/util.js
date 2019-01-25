function htmlentities(str) {
    return str.slice(0, 800).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function isDescendant(elems, child) {
    return elems.some(parent => {
        let node = child.parentNode;

        while (node != null) {
            if (node === parent) {
                return true;
            }

            node = node.parentNode;
        }
    });
}

// @todo - https://github.com/github/accessibilityjs/blob/master/index.js#L137
// function elementIsHidden(element) {
//     return element.closest('[aria-hidden="true"], [hidden], [style*="display: none"]') != null
//   }


function isHidden(elem) {
    const { width, height, left, top } = elem.getBoundingClientRect();
    const { display, visibility, opacity } = window.getComputedStyle(elem);

    if (width <= 1 || height <= 1 || left < 0 || left > window.innerWidth || top < 0 || display === 'none' || visibility === 'hidden' || opacity === '0') {
        return true;
    }
}

// https://www.compuphase.com/cmetric.htm
function differentColors(background, foreground) {
    const [r1 = 0, g1 = 0, b1 = 0, a1 = 1] = background.replace(/[^\d,.]/g, '').split(',').map(parseFloat);
    const [r2 = 0, g2 = 0, b2 = 0, a2 = 1] = foreground.replace(/[^\d,.]/g, '').split(',').map(parseFloat);

    if (a2 === 0 || Math.abs(a1 - a2) > 0.1) {
        return;
    }

    const rTilda = (r1 + r2) / 2;

    const deltaR = r1 - r2;
    const deltaG = g1 - g2;
    const deltaB = b1 - b2;

    // if difference is over 10000 the colors are pretty different (my opinion)
    return (2 + rTilda / 256) * deltaR * deltaR + 4 * deltaG * deltaG + (2 + (255 - rTilda) / 256) * deltaB * deltaB > 10000;
}

// https://stackoverflow.com/questions/6400383/how-can-i-tell-a-rgb-color-is-basically-blue-in-c-sharp
function isBlueShade(color) {
    const [r = 0, g = 0, b = 0, a = 1] = color.replace(/[^\d,.]/g, '').split(',').map(parseFloat);

    const { h, s, v } = rgb2hsv(r, g, b);

    // made this aproximations by me in photoshop
    return h > 192 && h < 250 && s > 50 && v > 65;
}

function rgb2hsv() {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function (c) {
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff === 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        } else if (g === v) {
            h = (1 / 3) + rr - bb;
        } else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

export {
    htmlentities,
    isDescendant,
    isHidden,
    differentColors,
    isBlueShade,
}
