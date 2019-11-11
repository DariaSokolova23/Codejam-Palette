let canvas = document.getElementById("plotter");
const context = canvas.getContext('2d');
//Pencil
context.strokeStyle = '#000000';
context.lineJoin = 'round';
context.lineCup = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(event){
    if (!isDrawing) return;
    console.log(event);
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY];
}

canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
});
canvas.addEventListener('mouseup',() => isDrawing = false);
canvas.addEventListener('mouseout',() => isDrawing = false);

//Color picker
let colors = {
    black: '#000000',
    red: '#ff0000',    
    orange: '#ffa500',
    yellow: '#FFFF00',
    green: '#008000', 
    blue: '#0000FF',  
    purple: '#800080',     
    white: '#FFFFFF',
    gray: '#808080',
};
// добавим выпадающий список цветов
let colorSelect = document.getElementById('color');
for (let i in colors){
    let c = document.createElement('option');
    c.value = colors[i];
    c.innerHTML = i;
    colorSelect.appendChild(c);
}
//меняем цвет на выбранный из списка
colorSelect.addEventListener('change',function(event){
    context.strokeStyle = colorSelect.value;
})
//функция возвращает цвета и прозрачность
const getColorIndicesForCoord = (x, y, width) => {
    const red = y*(width*4) + x*4;
    return [red, red + 1, red + 2, red + 3];
};
//const colorIndices = getColorIndicesForCoord(xCoord, yCoord, canvasWidth);
//const [redIndex, greenIndex, blueIndex, alphaIndex] = colorIndices;

//context.fillStyle = color;//заливка

