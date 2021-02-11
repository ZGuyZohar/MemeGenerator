var gElCanvas;
var gCtx;
var gCurrMeme;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];


function createMeme(text) {
    const newMeme =  {
        pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 },
        size: 60,
        isDragging: false,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        text
    };
    if (gMeme.selectedLineIdx === 0) {
        newMeme.pos.x = 252;
        newMeme.pos.y = 50;
    } else if (gMeme.selectedLineIdx === 1) {
        newMeme.pos.x = 252;
        newMeme.pos.y = 370;
    } else {
        newMeme.pos.x = 252;
        newMeme.pos.y = 210;
    }
    gMeme.lines[gMeme.selectedLineIdx] = newMeme;
    return newMeme;
}


function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderCanvas();
    });
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);

    gElCanvas.addEventListener('mousedown', onDown);

    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove);

    gElCanvas.addEventListener('touchstart', onDown);

    gElCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isCirlceClicked(pos)) return;
    gCurrMeme.isDragging = true;
    gStartPos = pos;
    document.querySelector('.canvas-container').style.cursor = 'grabbing';
}

function onMove(ev) {
    if(!gCurrMeme) return;
    if (gCurrMeme.isDragging) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;

        gCurrMeme.pos.x += dx;
        gCurrMeme.pos.y += dy;

        gStartPos = pos;
        renderCanvas();
        renderText();
    }
}

function onUp() {
    gCurrMeme.isDragging = false;
    document.querySelector('.canvas-container').style.cursor = 'grab';
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    };
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        };
    }
    return pos;
}

function isCirlceClicked(clickedPos) {
    const { pos } = gCurrMeme;
    const distance = Math.sqrt(
        (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
    );
    return distance <= gCurrMeme.size;
}

function drawText(x, y) {
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = `${gCurrMeme.size}px Impact`;
    gCtx.textAlign = 'center';
    gCtx.fillText(gCurrMeme.text, x, y);
    gCtx.strokeText(gCurrMeme.text, x, y);
}

function drawAllTexts(idx) {
    let {text, pos, size} = gMeme.lines[idx]
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = `${size}px Impact`;
    gCtx.textAlign = 'center';
    gCtx.fillText(text, pos.x, pos.y);
    gCtx.strokeText(text, pos.x, pos.y);
}


function drawArc(x, y, size = 60, color = 'blue') {
    gCtx.beginPath();
    gCtx.lineWidth = '6';
    gCtx.arc(x, y, size, 0, 2 * Math.PI);
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
    gCtx.fillStyle = color;
    gCtx.fill();
}

function renderCanvas() {
    drawImgFromlocal()
}


function setImg(idx){
    gMeme.selectedImgId = idx;
    gMeme.lines = [];
    gMeme.selectedLineIdx = -1;
    gCurrMeme = gMeme.lines[0];
    return drawImgFromlocal();
}

function renderText(idx) {
    drawAllTexts(idx)
}

function drawImgFromlocal() {
    const img = new Image();
    img.src = gImgs[gMeme.selectedImgId].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        gMeme.lines.forEach((line, lineIdx) => {
            renderText(lineIdx);
        })
    };
}
