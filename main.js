// Math

function inSet(cr, ci) {
    zr = cr
    zi = ci

    // colors dont work properly

    for (let i = 1; i < 20 ; i++) {
        z_mag = Math.sqrt(zr**2 + zi**2)
        
        if (Math.abs(z_mag) >= 2) { return [false, 13*i] } 
        
        const _zr = zr**2 - zi**2 + cr
        const _zi = 2*zr*zi + ci
        // MAN ARE YOU JOKING THAT IS SOME JAVASCRIPT BS, I HAD THE MATH RIGHT BUT FOR SOME REASON THIS SYNTAX MADE THE DIFFERENCE??????? (max level cope, im sure theres a good reason for this)
        zr = _zr
        zi = _zi
    }

    z_mag = Math.sqrt(zr**2 + zi**2)

    if (Math.abs(z_mag) >= 2) { return [false, 255] } 

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

    centerCoordX = canvas.width/2
    centerCoordY = centerCoordX
    halfWidth = Math.round(centerCoordX)

    draw();
}

// Event listener for window resize
window.addEventListener('resize', resizeCanvas);

function draw() {
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
            ctx.arc(x+centerCoordX, y+centerCoordY, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
//     ctx.fillStyle = 'blue';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = 'white';
    // ctx.font = '30px Arial';
    // ctx.fillText(canvas.width/2, 50, 50);
}

// Initial setup
resizeCanvas();