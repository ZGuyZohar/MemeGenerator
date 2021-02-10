var gCanvas;
var gCtx;

function drawImgFromlocal(imgIdx, text) {
    const img = new Image();
    img.src = gImgs[imgIdx].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        if(text) drawText(
            text,
            gMeme.lines[gMeme.selectedLineIdx].posX,
            gMeme.lines[gMeme.selectedLineIdx].posY
        );
    };
    gMeme.selectedImgId = imgIdx;
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


function renderCircle() {
    const { pos, color, size } = gCircle;
    drawArc(pos.x, pos.y, size, color);
}

