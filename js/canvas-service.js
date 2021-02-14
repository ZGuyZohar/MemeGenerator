var gElCanvas;
var gCtx;
var gCurrMeme = null;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];


function createMeme(text = ' ') {
    const newMeme =  {
        pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 },
        size: 60,
        isDragging: false,
        align: 'center',
        color: 'white',
        fontStyle: 'Impact',
        strokeColor: 'black',
        text
    };
    if (gMeme.selectedLineIdx === 0) {
        newMeme.pos.x = gElCanvas.width / 2;
        newMeme.pos.y = gElCanvas.height / 2 - 110; 
    } else if (gMeme.selectedLineIdx === 1) {
        newMeme.pos.x = gElCanvas.width / 2;
        newMeme.pos.y = gElCanvas.height / 2 + 130; 
    } else {
        newMeme.pos.x = gElCanvas.width / 2;
        newMeme.pos.y = gElCanvas.height / 2 
    }
    gMeme.lines[gMeme.selectedLineIdx] = newMeme;
    return newMeme;
}


function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        if (window.matchMedia('(max-width: 555px)').matches) {
            if(document.body.classList.contains('small')) return;
            document.getElementById('canvas').width = 339;
            document.getElementById('canvas').height = 350;
            document.body.classList.remove('big')
            document.body.classList.add('small')
            gAlignList = [gElCanvas.width / 4, gElCanvas.width / 2, gElCanvas.width / 1.5];
            updatePos()
        } else {
            if (document.body.classList.contains('big')) return;
            document.getElementById('canvas').width = 486;
            document.getElementById('canvas').height = 406;
            document.body.classList.remove('small');
            document.body.classList.add('big');
            gAlignList = [gElCanvas.width / 4, gElCanvas.width / 2, gElCanvas.width / 1.5];
            updatePos()
        }
        renderCanvas();
    });
}

function updatePos(){
    gMeme.lines.forEach((line, idx) => {
        if (idx === 0) {
            line.pos.x = gElCanvas.width / 2;
            line.pos.y = gElCanvas.height / 2 - 110;
        } else if (idx === 1) {
            line.pos.x = gElCanvas.width / 2;
            line.pos.y = gElCanvas.height / 2 + 130;
        } else {
            line.pos.x = gElCanvas.width / 2;
            line.pos.y = gElCanvas.height / 2;
        }   
    })
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
    if (!gCurrMeme) return;
    isMemeClickedCurr(pos)
    if (!isMemeClicked(pos)) {
        gMeme.selectedLineIdx = -1;
        return renderCanvas()
    }
    gCurrMeme.isDragging = true;
    gStartPos = pos;
    document.querySelector('.canvas-container').style.cursor = 'grabbing';
    renderCanvas()
    
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
    }
}

function onUp() {
    if (!gCurrMeme) return;
    gCurrMeme.isDragging = false;
    document.querySelector('.canvas-container').style.cursor = 'grab';
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container');
//     gElCanvas.width = elContainer.offsetWidth;
//     gElCanvas.height = elContainer.offsetHeight;
// }

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

function isMemeClicked(clickedPos) {
    const { pos } = gCurrMeme;
    const distance = Math.sqrt(
        (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
    );
    return distance <= gCurrMeme.size;
}

function drawAllTexts(idx) {
    if(idx === undefined) return
    let {text, pos, size, color, fontStyle} = gMeme.lines[idx]
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px ${fontStyle}`;
    gCtx.textAlign = 'center';
    gCtx.setLineDash([]);
    gCtx.fillText(text, pos.x, pos.y);
    gCtx.strokeText(text, pos.x, pos.y);
    if(idx === gMeme.selectedLineIdx && gMeme.selectedLineIdx !== -1 && !gIsDelete) {
        drawSelectedRect()
        document.querySelector('.meme-text input').focus();
    }
}

function renderCanvas() {
    drawImgFromlocal()
}


function setImg(idx, isStorage){
    if(!isStorage) reset(idx);
    gMeme.selectedImgId = idx;
    return drawImgFromlocal();
}

function renderText(idx) {
    drawAllTexts(idx)
}

function drawImgFromlocal() {
    // debugger
    if(gMeme.selectedImgId === null) return;
    const img = new Image();
    img.src = gImgs[gMeme.selectedImgId].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        gMeme.lines.forEach((line, lineIdx) => {
            renderText(lineIdx);
        })
    };
}

// SELECTION FUNCTIONS

function isMemeClickedCurr(clickedPos) {
    gMeme.lines.forEach((line, idx) => {
        const { pos } = line;
        const distance = Math.sqrt(
            (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
        );
        if(distance <= line.size) {
            gCurrMeme = line;
            gMeme.selectedLineIdx = idx
        } 
    })
    document.querySelector('input[name="meme-text"]').value = gMeme.lines[gMeme.selectedLineIdx].text;
}

function drawSelectedRect(isEmpty){
    if(isEmpty){
        gMeme.selectedLineIdx = -1;
        return renderCanvas();
     }
   if(gCurrMeme === null) return;
   gCtx.beginPath();
        gCtx.rect(
          gCurrMeme.pos.x - gElCanvas.width / 2 + 30,
          gCurrMeme.pos.y - gCurrMeme.size,
          gElCanvas.width + gCurrMeme.size - 120,
          gCurrMeme.size + 40
       
      );
   gCtx.strokeStyle = 'white';
   gCtx.setLineDash([6]);
   gCtx.stroke();
}

function deleteMeme(){
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if(gMeme.selectedLineIdx === 0 && gMeme.lines.length) gMeme.selectedLineIdx++
    gMeme.selectedLineIdx--;
    gCurrMeme = gMeme.lines[gMeme.selectedLineIdx]
}

// DOWNLOAD AND SHARE

function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function uploadImg(elForm, ev) {
    ev.preventDefault();
    gMeme.selectedLineIdx = -1;
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <button class="submit-btn share" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
            Share   
        </button>`
    }

doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (res) {
        return res.text()
    })
    .then(onSuccess)
    .catch(function (err) {
        console.error(err)
    })
}


