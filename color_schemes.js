const image = document.getElementById('color-canvas');
let BaseImageURL = null;
const lightLever = document.getElementById('light-lever');
const satLever = document.getElementById('saturation-lever');
let startYLight = 0;
let startYSat = 0;
let isDraggingLight = false;
let isDraggingSat = false;

lightLever.addEventListener('mousedown', (e) => {

    lightLever.style.transition = 'none';
    startYLight = e.clientY - lightLever.getBoundingClientRect().top;
    isDraggingLight = true;
    e.preventDefault();
});
satLever.addEventListener('mousedown', (e) => {

    satLever.style.transition = 'none';
    startYSat = e.clientY - satLever.getBoundingClientRect().top;
    isDraggingSat = true;
    e.preventDefault();
});
document.addEventListener('mousemove', (e) => {

    if (isDraggingLight) {

        const newPosition = e.clientY - startYLight - lightLever.parentElement.getBoundingClientRect().top;
        const maxHeight = lightLever.parentElement.clientHeight - lightLever.clientHeight - 20;
        lightLever.style.top = Math.max(0, Math.min(newPosition, maxHeight)) + 'px';
    
        const lightnessMultiplier = newPosition / maxHeight;
        const saturationMultiplier = satLever.offsetTop / maxHeight;
        adjustYellowColors(image, 1 - saturationMultiplier, 1 - lightnessMultiplier);
    }
    else if(isDraggingSat) {

        const newPosition = e.clientY - startYSat - satLever.parentElement.getBoundingClientRect().top;
        const maxHeight = satLever.parentElement.clientHeight - satLever.clientHeight - 20;
        satLever.style.top = Math.max(0, Math.min(newPosition, maxHeight)) + 'px';
    
        const saturationMultiplier = newPosition / maxHeight;
        const lightnessMultiplier = lightLever.offsetTop / maxHeight;
        adjustYellowColors(image, 1 - saturationMultiplier, 1 - lightnessMultiplier);
    }

    e.preventDefault();
});
document.addEventListener('mouseup', (e) => {

    if(isDraggingLight) {

        isDraggingLight = false;
        lightLever.style.transition = 'top 0.3s';
    }
    else if(isDraggingSat) {

        isDraggingSat = false;
        satLever.style.transition = 'top 0.3s';
    }

    e.preventDefault();
});

// ------------------------------------------------------------------------------------------------------------------------------

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function adjustYellowColors(targetDiv, satMultiplier, lightMultiplier) {

    const backgroundImage = `url('${BaseImageURL}')`;
    const imageUrl = backgroundImage.replace(/url\(['"]?([^'"]*)['"]?\)/, '$1');  
    const img = new Image();

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
            const red = pixels[i];
            const green = pixels[i + 1];
            const blue = pixels[i + 2];

            // Check if the pixel is yellow
            if (red > 200 && green > 200 && blue < 100) {
                const hsl = rgbToHsl(red, green, blue);
                const newSaturation = hsl[1] * satMultiplier;
                const newLightness = hsl[2] * lightMultiplier;
                const newRgb = hslToRgb(hsl[0], newSaturation, newLightness);

                pixels[i] = newRgb[0];
                pixels[i + 1] = newRgb[1];
                pixels[i + 2] = newRgb[2];
            }
        }

        ctx.putImageData(imageData, 0, 0);
        let imageDataURL = canvas.toDataURL();

        // Set the modified image as the background of the targetDiv
        targetDiv.style.backgroundImage = `url(${imageDataURL})`;
    };

    img.src = imageUrl;
}
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return [h, s, l];
}
function hslToRgb(h, s, l) {

    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        
        const hue2rgb = function (p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}
function rgbToCmyk(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const k = 1 - max;
    if (k === 1) {
        return [0, 0, 0, 1];
    }
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return [c, m, y, k];
}

// ------------------------------------------------------------------------------------------------------------------------------

const pipette = document.getElementById('pipette');
let isPipetteActive = false;

pipette.addEventListener('click', function(e) {

    if(isPipetteActive) {

        isPipetteActive = false;
        image.style.cursor = 'auto';
    }
    else {

        isPipetteActive = true;
        image.style.cursor = `url('resources/pipette.png') 10 10, auto`;
    }
});
image.addEventListener('click', function(e) {

    if(!isPipetteActive) return;

    const xPos = e.offsetX;
    const yPos = e.offsetY;
    canvas.willReadFrequently = true;
    const imageData = ctx.getImageData(xPos, yPos, 1, 1);

    const r = imageData.data[0];
    const g = imageData.data[1];
    const b = imageData.data[2];

    const cmyk = document.getElementById('cmyk');
    const [c, m, y, k] = rgbToCmyk(r, g, b);
    const cmykValues = `CMYK: C=${(c*100).toFixed(0)}%, M=${(m*100).toFixed(0)}%, Y=${(y*100).toFixed(0)}%, K=${(k*100).toFixed(0)}%`;
    cmyk.textContent = cmykValues;

    const hsl = document.getElementById('hsl');
    const [h, s, l] = rgbToHsl(r, g, b);
    const hslValues = `HSL: H=${(h * 360).toFixed(0)}°, S=${(s*100).toFixed(0)}%, L=${(l*100).toFixed(0)}%`;
    hsl.textContent = hslValues;

    pipette.click();
});

// ------------------------------------------------------------------------------------------------------------------------------

const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('upload-button');
const saveButton = document.getElementById('save-button');

uploadButton.addEventListener('click', function () {
    
    fileInput.click();
});
fileInput.addEventListener('change', function (e) {

    const file = e.target.files[0]; 
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        BaseImageURL = e.target.result;
        image.style.backgroundImage = `url('${e.target.result}')`;
        image.style.backgroundSize = 'cover'; 
        image.innerHTML = '';

        const img = new Image();
        img.src = `url('${e.target.result}')`;
        ctx.drawImage(img, 0, 0, image.width, image.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        ctx.putImageData(imageData, 0, 0);
    };

    reader.readAsDataURL(file);
});
saveButton.addEventListener('click', function() {

    const anchor = document.createElement("a");
    const fractalDataURL = canvas.toDataURL();
    anchor.href = fractalDataURL;
    anchor.download = "color-schemes.png";
    anchor.click();
    document.body.removeChild(anchor);
});
