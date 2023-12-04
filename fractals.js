const vicsek = document.querySelector('.vicsek-button');
const newton = document.querySelector('.newton-button');
const myCanvas = document.getElementById('fractal-canvas');

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
const ctx = canvas.getContext('2d');

let container = document.createElement('div');
let isVicsekActive = false;

// ----------------------------------------------------------------------------


function drawVicsekX(x, y, size, depth) {
    if (depth === 0) {
        ctx.fillRect(x, y, size, size); // Draw a square
    } else {
        const thirdSize = size / 3;
        const twoThirdsSize = 2 * thirdSize;

        // Draw the outer square
        drawVicsekX(x, y, thirdSize, depth - 1); // Top-left
        drawVicsekX(x + twoThirdsSize, y, thirdSize, depth - 1); // Top-right
        drawVicsekX(x, y + twoThirdsSize, thirdSize, depth - 1); // Bottom-left
        drawVicsekX(x + twoThirdsSize, y + twoThirdsSize, thirdSize, depth - 1); // Bottom-right
        
        // Draw the inner square (center)
        drawVicsekX(x + thirdSize, y + thirdSize, thirdSize, depth - 1);
    }
}
vicsek.addEventListener('click', function(event) {

    isVicsekActive = true;
    vicsek.style.boxShadow = "0 0 20px #5B20D9FF";
    newton.style.boxShadow = "";

    const remove = document.querySelector('.iter-container');
    if(remove != null) remove.remove();

    container.className = 'input-container';
    container.innerHTML = `
    <div class="i-container">
        <div class="iter-text">Iterations:</div>
        <select class="iter-dropdown">
            <option class="iter-num" value="1">1</option>
            <option class="iter-num" value="2">2</option>
            <option class="iter-num" value="3">3</option>
            <option class="iter-num" value="4">4</option>
            <option class="iter-num" value="5">5</option>
        </select>
    </div>
    <button type="button" class="myButton" id="buildButton">Build Vicsek X</button>
    `
    document.body.appendChild(container);
    let button = document.createElement("button");
    button.textContent = "Save";
    button.id = "saveButton";
    button.className = "myButton";
    button.style = "margin-top: 0.5%;";
    container.appendChild(button);

    const buildButton = document.getElementById('buildButton');
    buildButton.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        
        const depth = document.querySelector('.iter-dropdown').value;
        drawVicsekX(50, 50, 300, depth);
        const fractalDataURL = canvas.toDataURL();
        document.getElementById('fractal-canvas').style.backgroundImage = `url(${fractalDataURL})`;
    });
    const saveButton = document.querySelector('#saveButton');
    saveButton.addEventListener('click', function() {

        const anchor = document.createElement("a");
        const fractalDataURL = canvas.toDataURL();
        anchor.href = fractalDataURL;
        anchor.download = "vicsek_fractal.png";
        anchor.click();
        document.body.removeChild(anchor);
        document.body.removeChild(saveButton);
    });
});


// ----------------------------------------------------------------------------


function calculateNewtonFractal(iterations, zoom, c) {

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const TOLERANCE = 1e-6;
    
    const xMin = -2.0 / zoom;
    const xMax = 2.0 / zoom;
    const yMin = -2.0 / zoom;
    const yMax = 2.0 / zoom;

    for (let x = 0; x < WIDTH; x++) {

        for (let y = 0; y < HEIGHT; y++) {

            const real = xMin + ((xMax - xMin) * x) / WIDTH;
            const imaginary = yMin + ((yMax - yMin) * y) / HEIGHT;
            let z = new Complex(real, imaginary);
            let i = 0;

            while (i < iterations) {

                const f = functionF(z, c);
                const fPrime = functionFPrime(z);

                if (fPrime.abs() < TOLERANCE) break;
                
                z = z.subtract(f.divide(fPrime));

                if (f.abs() < TOLERANCE) {

                    const color = getColor(i, iterations);
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, 1, 1);
                    break;
                }

                ++i;
            }
        }
    }
}
class Complex {

    constructor(real, imaginary) {

        this.real = real;
        this.imaginary = imaginary;
    }

    add(other) {
        return new Complex(this.real + other.real, this.imaginary + other.imaginary);
    }

    subtract(other) {
        return new Complex(this.real - other.real, this.imaginary - other.imaginary);
    }

    multiply(other) {
        const realPart = this.real * other.real - this.imaginary * other.imaginary;
        const imaginaryPart = this.real * other.imaginary + this.imaginary * other.real;
        return new Complex(realPart, imaginaryPart);
    }

    divide(other) {
        const denominator = other.real * other.real + other.imaginary * other.imaginary;
        const realPart = (this.real * other.real + this.imaginary * other.imaginary) / denominator;
        const imaginaryPart = (this.imaginary * other.real - this.real * other.imaginary) / denominator;
        return new Complex(realPart, imaginaryPart);
    }

    pow(exponent) {
        let result = new Complex(1, 0);
        let base = this;

        for (let i = 0; i < exponent; i++) {
            result = result.multiply(base);
        }

        return result;
    }

    abs() {
        return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
    }
}
function functionF(z, c) {
    return z.pow(4).add(new Complex(c, 0)); 
}
function functionFPrime(z) {
    return z.pow(3).multiply(new Complex(4, 0));
}
function getColor(iteration, maxIteration) {
    const hue = (iteration / maxIteration) * 360;
    return `hsl(${hue}, 100%, 50%)`;
}
newton.addEventListener('click', function(event) {

    isVicsekActive = false;
    newton.style.boxShadow = "0 0 20px #5B20D9FF";
    vicsek.style.boxShadow = "";

    const remove = document.querySelector('.iter-container');
    if(remove != null) remove.remove();

    container.className = 'input-container';
    container.innerHTML = `
    <div class="i-container">
        <div class="iter-text">Iterations:</div>
        <select class="iter-dropdown">
            <option class="iter-num" value="10">10</option>
            <option class="iter-num" value="20">20</option>
            <option class="iter-num" value="50">50</option>
            <option class="iter-num" value="100">100</option>
            <option class="iter-num" value="200">200</option>
        </select>
    </div>
    <div class="z-container">
        <div class="zoom-text">Zoom:</div>
        <select class="zoom-dropdown">
            <option class="zoom-num" value="1.0">100%</option>
            <option class="zoom-num" value="1.5">150%</option>
            <option class="zoom-num" value="2.0">200%</option>
            <option class="zoom-num" value="2.5">250%</option>
            <option class="zoom-num" value="3.0">300%</option>
        </select>
    </div>
    <div class="c-container"><div class="c-text">Constant:</div> <input type="number" class="c-num" id="c-num" value="1"></div>
    <button type="button" class="myButton" id="buildButton">Build  z^4 + c</button>
    `
    document.body.appendChild(container);
    let button = document.createElement("button");
    button.textContent = "Save";
    button.id = "saveButton";
    button.className = "myButton";
    button.style = "margin-top: 0.5%;";
    container.appendChild(button);

    const buildButton = document.getElementById('buildButton');
    buildButton.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const iterations = document.querySelector('.iter-dropdown').value;
        const zoom = document.querySelector('.zoom-dropdown').value;
        const c = document.querySelector('.c-num').value;
        calculateNewtonFractal(iterations, zoom, parseInt(c));
        const fractalDataURL = canvas.toDataURL();
        document.getElementById('fractal-canvas').style.backgroundImage = `url(${fractalDataURL})`;
    });

    const saveButton = document.querySelector('#saveButton');
    saveButton.addEventListener('click', function() {

        const anchor = document.createElement("a");
        const fractalDataURL = canvas.toDataURL();
        anchor.href = fractalDataURL;
        anchor.download = "newton_fractal.png";
        anchor.click();
        document.body.removeChild(anchor);
        document.body.removeChild(saveButton);
    });
});
