// Math

function inSet(cr, ci) {
    zr = cr
    zi = ci

    // colors dont work properly yet

    for (let i = 1; i < 200 ; i++) { // loads very slow, i love it :|
        z_mag = Math.sqrt(zr**2 + zi**2)
        
        if (Math.abs(z_mag) >= 2) { return [false, 13*i] } 
        
        _zr = zr**2 - zi**2 + cr
        zi = 2*zr*zi + ci
        // NOTE 1: MAN ARE YOU JOKING THAT IS SOME JAVASCRIPT BS, I HAD THE MATH RIGHT BUT FOR SOME REASON THIS SYNTAX MADE THE DIFFERENCE??????? (max level cope, im sure theres a good reason for this)
        // NOTE 2: im stupid
        zr = _zr
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
    scale = 1.4 // value of 2 sets edges of canvas to 2 (on coord plane)
    translationX = -0.35 // 0 centers at origin (on coord plane)
    translationY = 0 // 0 centers at origin (on coord plane)
    // eventually add UI on page to control these, hopefully with mouse or kbm

    halfPlaneWidth = 2*halfWidth/scale

    scaler = scale/halfWidth
    translatorX = translationX*halfPlaneWidth
    translatorY = translationY*halfPlaneWidth

    for (let x = -halfWidth; x < halfWidth; x++) {
        for (let y = -halfWidth; y < halfWidth; y++) {
            setFunc = inSet(scaler*(x+translatorX), -scaler*((y-translatorY)))
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
    ctx.fillStyle = 'white';
    ctx.font = '25px Verdana';
    ctx.fillText("colors dont work properly yet", 40, 50);
}

// Initial setup
resizeCanvas();