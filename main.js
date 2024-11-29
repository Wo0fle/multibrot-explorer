// Math

function inSet(cr, ci) {

    // apperently this is wrong
    // also colors are not working

    zr = cr
    zi = ci

    for (let i = 1; i < 16; i++) {
        z_mag = Math.sqrt(zr**2 + zi**2)
        
        if (Math.abs(z_mag) >= 2) { return [false, 17*i] } 
        
        zr = cr + zr**2 - zi**2
        zi = 2*zr*zi + ci
    }

    z_mag = Math.sqrt(zr**2 + zi**2)

    if (Math.abs(z_mag) >= 2) { return [false, 17*i] } 

    return [true, 0]
}

////////////////////////////////////////////////////////////////////////////////////

// Rendering

const canvas = document.getElementById('multibrotCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    if (window.innerHeight < window.innerWidth) {
        canvas.width = 0.9*window.innerHeight;
        canvas.height = canvas.width;
    } else {
        canvas.height = 0.9*window.innerWidth;
        canvas.width = canvas.height;
    }

    centerCoord = canvas.width/2
    halfWidth = Math.round(centerCoord)

    draw();
}

// Event listener for window resize
window.addEventListener('resize', resizeCanvas);

function draw() {
    ctx.translate(centerCoord, centerCoord);
    scale=2/halfWidth

    for (let x = -halfWidth; x < halfWidth; x++) {
        for (let y = -halfWidth; y < halfWidth; y++) {
            setFunc = inSet(scale*x, -scale*y)
            isIn = setFunc[0]
            whatColor = setFunc[1]
            if (isIn) {
                ctx.fillStyle = "black"
            } else {
                ctx.fillStyle = "rgb(30,"+whatColor+",200)";
            }
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    ctx.beginPath();
    ctx.fillStyle = "red"
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);

    ctx.arc(halfWidth/2, 0, 5, 0, 2 * Math.PI);
    ctx.arc(halfWidth, 0, 5, 0, 2 * Math.PI);
    ctx.arc(-halfWidth/2, 0, 5, 0, 2 * Math.PI);
    ctx.arc(-halfWidth, 0, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, halfWidth/2, 5, 0, 2 * Math.PI);
    ctx.arc(0, halfWidth, 5, 0, 2 * Math.PI);
    ctx.arc(0, -halfWidth/2, 5, 0, 2 * Math.PI);
    ctx.arc(0, -halfWidth, 5, 0, 2 * Math.PI);
    ctx.fill();
//     ctx.fillStyle = 'blue';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = 'white';
    // ctx.font = '30px Arial';
    // ctx.fillText(canvas.width/2, 50, 50);
}

// Initial setup
resizeCanvas();