// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

export const lightenColor = (col, amt) => {
    col = col.replace(/^#/, "");
    if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

    let [r, g, b] = col.match(/.{2}/g);
    [r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt];

    r = Math.max(Math.min(255, r), 0).toString(16);
    g = Math.max(Math.min(255, g), 0).toString(16);
    b = Math.max(Math.min(255, b), 0).toString(16);

    const rr = (r.length < 2 ? "0" : "") + r;
    const gg = (g.length < 2 ? "0" : "") + g;
    const bb = (b.length < 2 ? "0" : "") + b;

    return `#${rr}${gg}${bb}`;
};

export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        b: parseInt(result[3], 16),
        g: parseInt(result[2], 16),
        r: parseInt(result[1], 16)
    } : null;
}

export const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('')

export const getContrast = (hexcolor) => {
    // Convert to RGB value.
    const rgb = hexToRgb(hexcolor);
    if (!rgb) return "text-gray-50";

    // Get YIQ ratio.
    const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;

    // Check contrast.
    return (yiq >= 128) ? "text-gray-800" : "text-gray-50";
}

export const getAverageColor = async (imgSrc) => {
    const img = new Image();
    img.src = imgSrc;
    img.setAttribute('crossOrigin', '');
    await img.decode();

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    const imageData = context.getImageData(0, 0, img.width, img.height);
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
        r += imageData.data[i];
        g += imageData.data[i + 1];
        b += imageData.data[i + 2];
    }
    r /= (imageData.data.length / 4);
    g /= (imageData.data.length / 4);
    b /= (imageData.data.length / 4);

    return [Math.round(r), Math.round(g), Math.round(b)];
}
