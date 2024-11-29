// Math

function inSet(cr, ci) {
    zr = cr
    zi = ci

    for (let i = 1; i < 200 ; i++) {
        // loads very slow, i love it :|
        // also eventually ill have to add a varaible to control the max amount of iterations
        
        z_mag = Math.sqrt(zr**2 + zi**2)
        
        if (Math.abs(z_mag) >= 2) { return [false, 100*Math.sqrt(i/10)] }
        // sqrt is there to scale up small differences near the start of the loop and scale down large differences near the end...
        // aka to make it look nicer...
        // if you wanna see the "real" escape color use "255*i/200"
        
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

// Interface

let scale = 1.4 // value of 2 sets edges of canvas to 2 (on coord plane)
let translationX = -0.35 // 0 centers at origin (on coord plane)
let translationY = 0 // 0 centers at origin (on coord plane)

function saveSettings() {
    scale = document.getElementById("zoom").value
    // obv a scale of 0 is an issue
    translationX = document.getElementById("xCoord").value
    translationY = document.getElementById("yCoord").value

    draw();
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
    halfPlaneWidth = 2*halfWidth/scale

    scaler = scale/halfWidth
    translatorX = translationX*halfPlaneWidth
    translatorY = translationY*halfPlaneWidth

    for (let x = -halfWidth; x < halfWidth; x++) {
        for (let y = -halfWidth; y < halfWidth; y++) {
            setFunc = inSet(scaler*(x+translatorX), -scaler*(y-translatorY))
            isIn = setFunc[0]
            whatColor = setFunc[1]
            if (isIn) {
                ctx.fillStyle = "black"
            } else {
                ctx.fillStyle = "rgb("+whatColor+","+whatColor+","+whatColor+")";
                // for now, greyscale is the best way to view the escape colors since the differrence between each color is linear (which is easier to see)
            }
            ctx.beginPath();
            ctx.arc(x+centerCoordX, y+centerCoordY, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    // ctx.fillStyle = "rgb(0,73,255)"
    // ctx.beginPath();
    // ctx.arc((0+centerCoordX-translatorX), (0+centerCoordY+translatorY), 2, 0, 2 * Math.PI);
    // ctx.fill();

    // ctx.beginPath();
    // ctx.arc((-halfPlaneWidth/2+centerCoordX-translatorX), (0+centerCoordY+translatorY), 2, 0, 2 * Math.PI);
    // ctx.arc((-halfPlaneWidth+centerCoordX-translatorX), (0+centerCoordY+translatorY), 2, 0, 2 * Math.PI);
    // ctx.arc((halfPlaneWidth/2+centerCoordX-translatorX), (0+centerCoordY+translatorY), 2, 0, 2 * Math.PI);
    // ctx.arc((halfPlaneWidth+centerCoordX-translatorX), (0+centerCoordY+translatorY), 2, 0, 2 * Math.PI);
    // ctx.fill();

    // ctx.beginPath();
    // ctx.arc((0+centerCoordX-translatorX), (-halfPlaneWidth/2+centerCoordY+translatorY), 2, 0, 2 * Math.PI);
    // ctx.arc((0+centerCoordX-translatorX), (-halfPlaneWidth+centerCoordY+translatorY), 2, 0, 2 * Math.PI);
    // ctx.arc((0+centerCoordX-translatorX), (halfPlaneWidth/2+centerCoordY+translatorY), 2, 0, 2 * Math.PI);
    // ctx.arc((0+centerCoordX-translatorX), (halfPlaneWidth+centerCoordY+translatorY), 2, 0, 2 * Math.PI);
    // ctx.fill();
}

// Initial setup
resizeCanvas();