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

}

function randomizeFractal()
{
    sides = Math.random()*7 + 2;
    scale = Math.random() * 0.2 +0.4;
    spread = Math.random() * 2.9 +0.1;
    color = 'hsl('+ Math.random()*360+', 100%, 50%)';
    drawFractal();
}
randomizeButton.addEventListener('click', randomizeFractal);



});