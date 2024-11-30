// Interface

let zr0 = 0
let zi0 = 0
let p = 2 // Mandelbrot set by default

let scale = 2 // value of 2 sets edges of canvas to 2 (on coord plane)
let translationX = 0
let translationY = 0

let maxI = 200 // maximum amount of iterations

function saveSettings() {
    zr0Value = document.getElementById("zr0").value
    zi0Value = document.getElementById("zi0").value
    pValue = document.getElementById("p").value

    if (Number.isFinite(Number(zr0Value)) && zr0Value != "") {
        zr0 = zr0Value
    } else { zr0 = 0 }
    if (Number.isFinite(Number(zi0Value)) && zi0Value != "") {
        zi0 = zi0Value
    } else { zi0 = 0 }
    if (Number.isFinite(Number(pValue)) && pValue != "") {
        p = pValue
    } else { p = 2 }

    zoomValue = document.getElementById("zoom").value
    xCoordValue = document.getElementById("xCoord").value
    yCoordValue = document.getElementById("yCoord").value

    if (Number.isFinite(Number(zoomValue)) && zoomValue != 0) {
        scale = zoomValue
    } else { scale = 2 }
    if (Number.isFinite(Number(xCoordValue)) && xCoordValue != "") {
        translationX = xCoordValue
    } else { translationX = 0 }
    if (Number.isFinite(Number(yCoordValue)) && yCoordValue != "") {
        translationY = yCoordValue
    } else { translationY = 0 }

    maxIterValue = document.getElementById("maxIter").value

    if (Number.isFinite(Number(maxIterValue)) && maxIterValue >= 1) {
        maxI = maxIterValue
    } else { maxI = 200 }

    draw();
}

////////////////////////////////////////////////////////////////////////////////////

// Math

function inSet(cr, ci) {
    _zr = ((zr0**2+zi0**2)**(p/2))*Math.cos(p*Math.atan2(zi0, zr0)) + cr
    zi = ((zr0**2+zi0**2)**(p/2))*Math.sin(p*Math.atan2(zi0, zr0)) + ci
    zr = _zr

    for (let i = 1; i < maxI ; i++) {
        // loads very slow, i love it :|
        // also eventually ill have to add a varaible to control the max amount of iterations
        
        z_mag = Math.sqrt(zr**2 + zi**2)
        
        if (Math.abs(z_mag) >= 2) { return [false, i] }
        // sqrt is there to scale up small differences near the start of the loop and scale down large differences near the end...
        // aka to make it look nicer...
        // if you wanna see the "real" escape color use "255*i/200"
        
        _zr = ((zr**2+zi**2)**(p/2))*Math.cos(p*Math.atan2(zi, zr)) + cr
        zi = ((zr**2+zi**2)**(p/2))*Math.sin(p*Math.atan2(zi, zr)) + ci
        zr = _zr
    }

    z_mag = Math.sqrt(zr**2 + zi**2)

    if (Math.abs(z_mag) >= 2) { return [false, maxI] } 

    return [true, 0]
}

////////////////////////////////////////////////////////////////////////////////////

// Rendering

const canvas = document.getElementById('multibrotCanvas');
const ctx = canvas.getContext('2d');
const colors = ['#365fc9', '#416fcd', '#4d7fd1', '#598fd5', '#649fd9', '#70afde', '#7cbfe2', '#87cfe6', '#93dfea', '#9fefef'] // genned by https://davidjohnstone.net/lch-lab-colour-gradient-picker

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

    let scaler = scale/halfWidth
    let translatorX = translationX*halfPlaneWidth/2
    let translatorY = translationY*halfPlaneWidth/2

    for (let x = -halfWidth; x < halfWidth; x++) {
        for (let y = -halfWidth; y < halfWidth; y++) {
            setFunc = inSet(scaler*(x+translatorX), -scaler*(y-translatorY))
            isIn = setFunc[0]
            whatColor = setFunc[1]
            if (isIn) {
                ctx.fillStyle = "black"
            } else {
                ctx.fillStyle = colors[whatColor % colors.length];
            }
            ctx.beginPath();
            ctx.arc(x+centerCoordX, y+centerCoordY, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    // ctx.fillStyle = "red"
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