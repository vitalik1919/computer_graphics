const fractalsTab   =   document.getElementById('fractals');
const colorsTab     =   document.getElementById('colors');
const movingTab     =   document.getElementById('moving');

const title         =   document.querySelector('.title');
const text          =   document.querySelector('.text-container');
const image         =   document.querySelector('.image-container');


window.addEventListener('load', function() {

    FractalLoad();
});

function FractalLoad() {

    fractalsTab.style.color = "white";
    colorsTab.style.color = "rgba(255, 255, 255, 0.28)";
    movingTab.style.color = "rgba(255, 255, 255, 0.28)";

    const fractalText = "Fractals are complex geometric shapes that exhibit self-similarity at different scales, meaning that they have a repeating pattern regardless of how closely you examine them." + 
    " They are a fascinating and beautiful concept in mathematics and have applications in various fields, including art, science, and computer graphics.";
    title.textContent = "Fractals";
    text.textContent = fractalText;

    image.innerHTML = ``;
    image.style = `
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15%;
    width: 100vh;
    height: 50vh;
    max-height: 80%;
    background-size: cover;
    background-image: url('/resources/fractals_learning.gif');
    `;
}
function ColorsLoad() {

    fractalsTab.style.color = "rgba(255, 255, 255, 0.28)";
    colorsTab.style.color = "white";
    movingTab.style.color = "rgba(255, 255, 255, 0.28)";

    const colorText = "CMYK. The four primary colours (Cyan, Magenta, Yellow and BlacK) are used to produce 10 million possible colours." + 
    " It's called subtractive as all the colours work to make black. HSL - Hue, Saturation, Lightness. These are alternative representations to RGB." + 
    " It\'s a cylindrical model, where all the different hues (pure colours, not tones or shades) are seamlessly blended together. Saturation, then, represents the diameter of our cylinder.";
    title.textContent = "Color Schemes";

    text.textContent = colorText;
    image.style = `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-left: -5%;
    margin-top: -1%;
    width: 70vw;
    height: 40vh;
    max-height: 80%;
    `
    let cmyk = document.createElement('div');
    let hsl = document.createElement('div');
    cmyk.style = `
    background-size: 100% 100%;
    background-image: url('/resources/cmyk.png');
    width: 100vw;
    height: 20vw;
    margin-right: 5%;
    margin-top: 5%;
    `
    hsl.style = `
    background-size: 100% 100%;
    background-image: url('/resources/hsl.png');
    width: 75vw;
    height: 20vw;
    margin-top: 5%;
    `
    image.appendChild(cmyk);
    image.appendChild(hsl);
}
function MovingLoad() {

    fractalsTab.style.color = "rgba(255, 255, 255, 0.28)";
    colorsTab.style.color = "rgba(255, 255, 255, 0.28)";
    movingTab.style.color = "white";

    const movingText = "In many imaging systems, detected images are subject to geometric distortion introduced" + 
    " by perspective irregularities wherein the position of the camera(s) with respect to the scene alters the apparent dimensions of the scene geometry." + 
    " Applying an affine transformation to a uniformly distorted image can correct for a range of perspective distortions by transforming the measurements from the ideal coordinates to those actually used." + 
    " An affine transformation is an important class of linear 2-D geometric transformations which maps variables into new variables by applying a linear combination of translation, rotation, scaling and/or shearing operations.";
    title.textContent = "Moving Images";
    text.textContent = movingText;

    image.innerHTML = ``;
    image.style = `
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 25%;
    margin-top: -1%;
    width: 80vh;
    height: 40vh;
    max-height: 80%;
    background-size: 100% 100%;
    background-image: url('/resources/affine_moves.png');
    `;
}

fractalsTab.addEventListener('click', FractalLoad);
colorsTab.addEventListener('click', ColorsLoad);
movingTab.addEventListener('click', MovingLoad);