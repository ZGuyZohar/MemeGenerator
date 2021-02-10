var gCanvas;
var gCtx;

function drawImgFromlocal(imgIdx) {
    const img = new Image();
    img.src = gImgs[imgIdx].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    };
}

function drawText(text, x, y) {
    const {strokeColor, color, size, align} = gMeme.lines[0];
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

