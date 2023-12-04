const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawCartesian() {
    
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);

    for(let i = 10; i < 480; i += 10) {
        ctx.moveTo(centerX - 5, i);
        ctx.lineTo(centerX + 5, i);
    }
    for(let i = 10; i < 480; i += 10) {
        ctx.moveTo(i, centerY - 5);
        ctx.lineTo(i, centerY + 5);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(180, 180, 180, 0.5)';
    for (let i = 10; i < canvas.width; i += 10) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = 10; i < canvas.height; i += 10) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    ctx.stroke();

}
function drawLine(a, b) {

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    ctx.beginPath();

    let x1 = -canvas.width / 2;
    let y1 = a * x1 + b;
    let x2 = canvas.width / 2;
    let y2 = a * x2 + b;

    x1 += centerX;
    y1 = -y1 + centerY;
    x2 += centerX;
    y2 = -y2 + centerY;

    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
}
function drawParallelogram() {

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    let canvasCoordinates = [
        {x: coordinates[0].x, y: coordinates[0].y},
        {x: coordinates[1].x, y: coordinates[1].y},
        {x: coordinates[2].x, y: coordinates[2].y},
        {x: coordinates[3].x, y: coordinates[3].y},
    ]
    for (var i = 0; i < canvasCoordinates.length; i++) {
        canvasCoordinates[i].x += centerX;
        canvasCoordinates[i].y = -canvasCoordinates[i].y + centerY;
    }
    
    ctx.strokeStyle = "rgba(144, 184, 212, 1)";
    ctx.lineWidth = 2;
    ctx.beginPath(); 
    ctx.moveTo(canvasCoordinates[0].x, canvasCoordinates[0].y);
    for (var i = 1; i < canvasCoordinates.length; i++) {
        ctx.lineTo(canvasCoordinates[i].x, canvasCoordinates[i].y); 
    }
    ctx.closePath(); 
    ctx.stroke(); 
    ctx.fillStyle = "rgba(155, 201, 232, 1)";
    ctx.fill();
}
function transformParallelogram(canvas, a, b, offsetX, offsetY) {

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const angle = Math.atan(a);
    const cosTheta = Math.cos(angle);
    const sinTheta = Math.sin(angle);

    const reflectionMatrix = [
        [cosTheta * cosTheta - sinTheta * sinTheta, 2 * cosTheta * sinTheta, 0], 
        [2 * cosTheta * sinTheta, sinTheta * sinTheta - cosTheta * cosTheta, 0], 
        [0, 0, 1]
    ];

    let offsetB = 0;
    if(a > 0) {
        offsetB = 2*b;
    }
    else {
        offsetB = -2*b;
        offsetX = -offsetX;
        offsetY = -offsetY;
    }

    const translationMatrix = [
        [1, 0, offsetX + offsetB],
        [0, 1, offsetY],
        [0, 0, 1]
    ];
    
    const transformationMatrix = multiplyMatrices(reflectionMatrix, translationMatrix);
    const newCoordinates = coordinates.map(point => ({
        x: transformationMatrix[0][0] * point.x + transformationMatrix[1][0] * point.y + transformationMatrix[0][2],
        y: transformationMatrix[0][1] * point.x + transformationMatrix[1][1] * point.y + transformationMatrix[1][2]
    }));
    let canvasCoordinates = [
        {x: newCoordinates[0].x, y: newCoordinates[0].y},
        {x: newCoordinates[1].x, y: newCoordinates[1].y},
        {x: newCoordinates[2].x, y: newCoordinates[2].y},
        {x: newCoordinates[3].x, y: newCoordinates[3].y},
    ]
    for (var i = 0; i < newCoordinates.length; i++) {
        canvasCoordinates[i].x += centerX;
        canvasCoordinates[i].y = -canvasCoordinates[i].y + centerY;
    }

    ctx.beginPath();
    ctx.strokeStyle = "rgba(238, 149, 143, 1)";
    ctx.moveTo(canvasCoordinates[0].x, canvasCoordinates[0].y);
    for (const point of canvasCoordinates) {
        ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(253, 160, 153, 1)';
    ctx.fill();
    ctx.stroke();
}
function multiplyMatrices(matrix1, matrix2) {
    return matrix1.map((row, i) =>
        row.map((val, j) =>
            matrix1[i].reduce((sum, elm, k) =>
                sum + elm * matrix2[k][j], 0)
        )
    );
}

drawCartesian();
let coordinates = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
];

const buildButton = document.getElementById('build-button');
buildButton.addEventListener('click', () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    drawCartesian();
    const valuesList = document.getElementsByClassName('enter-value');
    for (let i = 0; i < 3; ++i) {
        const values = valuesList[i].value.split(", "); 

        if(values.length > 2 || values.length < 2) {
            alert("Enter two coordinates divided by a coma !");
            return;
        }
        const regex = /^-?\d+(?:\s*,\s*-?\d+)?$/;
        if(!regex.test(values[0]) || !regex.test(values[1])) {
            alert("Enter two coordinates divided by a coma !");
            return;
        }

        coordinates[i].x = parseInt(values[0]) || 0;
        coordinates[i].y = parseInt(values[1]) || 0;
    }
    coordinates[3].x = coordinates[2].x - (coordinates[1].x - coordinates[0].x);
    coordinates[3].y = coordinates[0].y;

    const a = parseInt(valuesList[3].value);
    const b = parseInt(valuesList[4].value);
    const offsetX = parseInt(valuesList[5].value);
    const offsetY = parseInt(valuesList[6].value);

    drawLine(a, b); 
    drawParallelogram(); 
    transformParallelogram(canvas, a, b, offsetY, offsetX);
});