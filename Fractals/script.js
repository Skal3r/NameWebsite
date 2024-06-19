window.addEventListener('load', function()
{
const canvas = this.document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = this.window.innerWidth;
canvas.height = window.innerHeight;
//canvas settings
ctx.fillStyle = 'green';
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.shadowColor = 'rgba(0,0,0,0.7)'
ctx.shadowOffsetX = 10;
ctx.shadowOffsety = 5;
ctx.shadowblur = 10;



//effect settings
let size = canvas.width < canvas.height? canvas.width * 0.3: canvas.height * 0.3;
const maxlevel = 4;
const branches = 2;

let sides =6;
let scale = 0.5;
let spread = 0.5;
let color = 'hsl('+ Math.random()*360+', 100%, 50%)'

//Controls
const randomizeButton = this.document.getElementById('randomizeButton');
const resetButton = this.document.getElementById('resetButton');
const slider_spread = this.document.getElementById('spread');
const label_spread = this.document.querySelector('[for="spread"]');
const slider_sides = this.document.getElementById('sides');
const label_sides = this.document.querySelector('[for="sides"]');



function drawBranch(level)
{
    if (level>maxlevel) return;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(size,0);
    ctx.stroke();
    for(let i=0;i<branches;i++)
    {
        ctx.save();
        ctx.translate(size - (size/branches)*i, 0);
        ctx.scale(scale,scale);

        ctx.save();
        ctx.rotate(spread);
        drawBranch(level+1);
        ctx.restore();

        ctx.save();
        ctx.rotate(-spread);
        drawBranch(level+1);
        ctx.restore();

        ctx.restore();
    }
    
}
function drawFractal()
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.save()
    ctx.strokeStyle = color;

    ctx.translate(canvas.width/2, canvas.height/2);

    for(let i =0; i<sides;i++){

        ctx.rotate((Math.PI*2)/sides);
        drawBranch(0);
    }
ctx.restore();
updateSliders();
}

function randomizeFractal()
{
    sides = Math.floor(Math.random()*7 + 2);
    scale = Math.random() * 0.2 +0.4;
    spread = Math.random() * 2.9 +0.1;
    color = 'hsl('+ Math.random()*360+', 100%, 50%)';
}
function resetFractal()
{
    sides = 5;
    scale =0.5;
    spread = 0.7;
    color = 'hsl(290, 100%, 50%)';
}
randomizeButton.addEventListener('click', function()
{
    randomizeFractal();
    drawFractal();
});


resetButton.addEventListener('click', function()
{
    resetFractal();
    drawFractal();
});

slider_sides.addEventListener('change', function(e)
{
    sides = e.target.value;
    updateSliders();
    drawFractal();
});


slider_spread.addEventListener('change', function(e)
{
    spread = e.target.value;
    drawFractal();
});
function updateSliders()
{
    slider_spread.value = spread;
    label_spread.innerText = 'Spread: ' +Number(spread).toFixed(2);
    slider_sides.value = sides;
    label_sides.innerText = 'Side: ' +Number(sides).toFixed(0);
}
resetFractal();
drawFractal();


});