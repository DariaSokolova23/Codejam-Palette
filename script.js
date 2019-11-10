let canvas = document.getElementById("plotter");
let context = canvas.getContext('2d');
let color = '#333333';
context.beginPath();

function drawHandler(event){    
    context.lineTo(event.layerX,event.layerY);
   // context.moveTo(event.layerX, event.layerY);
    context.stroke();   
};
document.addEventListener('mousedown',function(event){
    canvas.addEventListener('mousemove', drawHandler )

})
document.addEventListener('mouseup', function(ev){
    canvas.removeEventListener('mousemove',drawHandler )
})

