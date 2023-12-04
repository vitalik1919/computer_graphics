const radioButtons = document.querySelectorAll('.option-container');
const innerButtons = document.querySelectorAll('.radio-inner');
const testNumbers = document.querySelectorAll('.number');
let selectedIndex = 4;
let currentTestIndex = 0;
let totalCorrects = 0;
const totalTests = 15;

class TestQuestion {

    constructor(q, a) {

        this.question = q;
        this.answers = a;
    }

    getIndexOfCorrectAnswer() {
        return this.answers.findIndex(answer => answer.correct);
    }
}

const testList = [

    new TestQuestion("What is the main characteristic of fractals?",
    [
        { correct: false,   text: "Discreteness" },
        { correct: false,    text: "Affinity" },
        { correct: true,   text: "Self-similarity" },
        { correct: false,   text: "Monochromaticity" }
    ]),

    new TestQuestion("What type of fractals does the Newton fractal belong to?",
    [
        { correct: true,    text: "Algebraic" },
        { correct: false,   text: "Geometric" },
        { correct: false,   text: "Stochastic" },
        { correct: false,   text: "IFS fractals" }
    ]),

    new TestQuestion("What type of fractals does the Vicsek fractal belong to?",
    [
        { correct: false,   text: "Algebraic" },
        { correct: true,    text: "Geometric" },
        { correct: false,   text: "Stochastic" },
        { correct: false,   text: "IFS fractals" }
    ]),

    new TestQuestion("Who first used the term 'fractal'?",
    [
        { correct: false,   text: "Pierre Bézier" },
        { correct: false,   text: "Eugenia Levus" },
        { correct: false,   text: "Loren Carpenter" },
        { correct: true,    text: "Benoît Mandelbrot" }
    ]),

    new TestQuestion("Which of the listed fractals does not exist?",
    [
        { correct: false,   text: "Koch snowflake" },
        { correct: false,   text: "Mandelbrot fractal" },
        { correct: false,   text: "Julia fractal" },
        { correct: true,    text: "Karpinskyi carpet" }
    ]),

    new TestQuestion("Which color model is additive?",
    [
        { correct: true,    text: "RGB" },
        { correct: false,   text: "CMYK" },
        { correct: false,   text: "HSL" },
        { correct: false,   text: "XYZ" }
    ]),

    new TestQuestion("Which color model is subtractive?",
    [
        { correct: false,   text: "LAB" },
        { correct: true,    text: "CMYK" },
        { correct: false,   text: "XYZ" },
        { correct: false,   text: "HSV" }
    ]),

    new TestQuestion("What option represents color black in CMYK model?",
    [
        { correct: false,   text: "(1, 0, 0, 1)" },
        { correct: false,   text: "(255, 255, 255, 255)" },
        { correct: false,   text: "(255, 255, 255, 0)" },
        { correct: true,    text: "(0, 0, 0, 1)" }
    ]),

    new TestQuestion("What does the letter 'S' stand for in the HSL model?",
    [
        { correct: false,   text: "Shine" },
        { correct: false,   text: "Similarity" },
        { correct: true,    text: "Saturation" },
        { correct: false,   text: "Separation" }
    ]),

    new TestQuestion("Which color corresponds to 60° in the HSL model?",
    [
        { correct: true,    text: "Yellow" },
        { correct: false,   text: "Orange" },
        { correct: false,   text: "Green" },
        { correct: false,   text: "Magenta" }
    ]),

    new TestQuestion("Which of the following is a common use of affine transformations?",
    [
        { correct: false,   text: "Color manipulation" },
        { correct: false,   text: "Creating self-similar objects" },
        { correct: true,    text: "Image transformation" },
        { correct: false,   text: "Calculating BPI" }
    ]),

    new TestQuestion("What effect does translation have in affine transformations?",
    [
        { correct: false,   text: "Rotation" },
        { correct: false,   text: "Size change" },
        { correct: false,   text: "Shearing" },
        { correct: true,    text: "Position change" }
    ]),

    new TestQuestion("What is the primary characteristic of affine transformations?",
    [
        { correct: false,   text: "Self-similarity" },
        { correct: true,    text: "Linearity" },
        { correct: false,   text: "Non-linearity" },
        { correct: false,   text: "Complexity" }
    ]),

    new TestQuestion("Which operation is used for combining multiple affine transformations?",
    [
        { correct: false,   text: "Subtraction" },
        { correct: true,    text: "Multiplication" },
        { correct: false,   text: "Division" },
        { correct: false,   text: "Addition" }
    ]),
    new TestQuestion("Convert the coordinates (2/3, 3/4, 1) to integer homogeneous coordinates.",
    [
        { correct: false,   text: "(2, 3, 1)" },
        { correct: true,    text: "(8, 9, 12, 1)" },
        { correct: false,   text: "(2, 3, 12)" },
        { correct: false,   text: "(8, 9, 1, 1)" }
    ])
];

const question = document.querySelector('.question');
question.textContent = testList[currentTestIndex].question;
const options = document.querySelectorAll('.option-text');
for(let i = 0; i < options.length; ++i) {
    options[i].textContent = testList[currentTestIndex].answers[i].text;
}
testNumbers[currentTestIndex].style.boxShadow = '0 0 20px #5B20D9FF';

radioButtons.forEach(button => {

    button.addEventListener('click', () => {
        
        let optionIndex = Array.from(radioButtons).indexOf(button);
        for(let i = 0; i < innerButtons.length; ++i) {
            if(i == optionIndex) {
                innerButtons[optionIndex].style.visibility = 'visible';
                selectedIndex = i;
            }
            else {
                innerButtons[i].style.visibility = 'hidden';
            }
        }
    });
});

const submit = document.getElementById('submit-button');
submit.addEventListener('click', () => {

    if(selectedIndex === 4) {
        alert('You need to choose an option');
        return;
    }

    let correctIndex = testList[currentTestIndex].getIndexOfCorrectAnswer();

    if(correctIndex == selectedIndex) {
        
        testNumbers[currentTestIndex].style.backgroundColor = '#629D64';
        testNumbers[currentTestIndex].textContent = '✓';
        
        ++totalCorrects;
    }
    else {

        testNumbers[currentTestIndex].style.backgroundColor = '#BE4E4E';
        testNumbers[currentTestIndex].textContent = '✖';
    }

    testNumbers[currentTestIndex].style.color = 'rgb(240, 240, 240)';
    testNumbers[currentTestIndex].style.fontSize = '20px';
    testNumbers[currentTestIndex].style.fontWeight = 'bold'; 
    testNumbers[currentTestIndex].style.boxShadow = '';

    selectedIndex = 4;
    if(currentTestIndex === totalTests - 1) {
        alert('You have finished all tests !\nYour result: ' + totalCorrects + '/' + totalTests + '.');
        return;
    }
    ++currentTestIndex;

    const question = document.querySelector('.question');
    question.textContent = testList[currentTestIndex].question;
    const options = document.querySelectorAll('.option-text');
    for(let i = 0; i < options.length; ++i) {
        options[i].textContent = testList[currentTestIndex].answers[i].text;
    }
    for(let inner of innerButtons) {
        inner.style.visibility = 'hidden';
    }
    testNumbers[currentTestIndex].style.boxShadow = '0 0 20px #5B20D9FF';
})

