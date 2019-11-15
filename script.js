let canvas = document.getElementById("plotter");
const context = canvas.getContext('2d');
//Pencil
context.strokeStyle = '#000000';
context.lineJoin = 'round';
context.lineCup = 'round';

let isPenCheck = true;
let isFillCheck = false;
let isPickCheck = false;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

let elemPen = document.getElementById('pen');
elemPen.addEventListener('change', function(e){
    isPenCheck = true;
    isFillCheck = false;
    isPickCheck = false;
})
let elemFill = document.getElementById('fill');
elemFill.addEventListener('change', function(e){
    isPenCheck = false;
    isFillCheck = true;
    isPickCheck = false;

})
let elemPick = document.getElementById('pick');
elemPick.addEventListener('change', function(e){
    isPenCheck = false;
    isFillCheck = false;
    isPickCheck = true;
})

function draw(event){
    if (!isDrawing) return;
    if(!isPenCheck)return;    
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
canvas.addEventListener('click',function(event){
    if (isPenCheck) return;
    let c = getColorIndicesForCoord(event.offsetX, event.offsetY, 512);
    let objectImageData = context.getImageData(0,0,512,512);    
    let imageData = objectImageData.data;
    let red = imageData[c[0]];
    let green = imageData[c[1]];
    let blue = imageData[c[2]];    
    if (isPickCheck){
        context.strokeStyle ='rgb('+red+', '+green+', '+blue+')';
        return
    }
    //заливка если не пипетка
    for (let x = 0; x < 512; x++){
        for(let y = 0; y < 512; y++){
            
            let nowColor = getColorIndicesForCoord(x ,y, 512);
            let r1 = imageData[nowColor[0]];
            let g1 = imageData[nowColor[1]];
            let b1 = imageData[nowColor[2]];
            if ((r1==red)&&(g1==green)&&(b1==blue)){                
                let currentColor = context.strokeStyle;
                let r = parseInt(currentColor.substring(1, 3), 16);//не обрабатываем #
                let g = parseInt(currentColor.substring(3, 5), 16);
                let b = parseInt(currentColor.substring(5, 7), 16);
                let a = 255;
                imageData[nowColor[0]]=r;
                imageData[nowColor[1]]=g;
                imageData[nowColor[2]]=b;
                imageData[nowColor[3]]=255;
            }
        }
    }
    context.putImageData(objectImageData, 0, 0);
    
    
})

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
//функция возвращает цвета и прозрачность //каждый пиксель 8 байт
const getColorIndicesForCoord = (x, y, width) => {
    const red = y*(width*4) + x*4;
    return [red, red + 1, red + 2, red + 3];
};



