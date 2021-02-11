function onInit() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    addListeners();
    gCurrMeme = createMeme('');
}


function renderGallery() {
    var imgs = getImgs();
    var strHtmls = imgs.map(function (img, idx) {
        return `
    <div class="image-border" onclick="onShowCanvas(${idx})">
       <img class="gallery-image" src="styles/imgs/meme-imgs/${idx}.jpg">
    </div>
    `;
    });
    document.querySelector('.gallery').innerHTML = strHtmls.join('');
}

function onDrawText(elInput, ev) {
    ev.preventDefault();
    let text = elInput.querySelector('input').value;
    if(!text) return;
    elInput.querySelector('input').value = '';
    gMeme.selectedLineIdx++;
    createMeme(text);
    renderCanvas()
    gCurrMeme = gMeme.lines[gMeme.selectedLineIdx];
}

function onShowCanvas(idx){
    if (gMeme.selectedImgId === null) {
        const elMemeContent = document.querySelector('.meme-container');
        elMemeContent.style.display = 'grid';
        setTimeout(() => {
            elMemeContent.classList.add('meme-toggle');
        }, 1);
    }
    setImg(idx);
}


function onFontSizeChange(boolean) {
    if (boolean) {
        gCurrMeme.size += 10;
        drawImgFromlocal();
    } else {
        gCurrMeme.size -= 10;
        drawImgFromlocal();
    }
}

function onMemeDirection(boolean) {
    if (boolean) {
        gCurrMeme.pos.y += 10;
        drawImgFromlocal();
    } else {
        gCurrMeme.pos.y -= 10;
        drawImgFromlocal();
    }
}

function changeLine(){
    gMeme.selectedLineIdx++
    if(gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
    gCurrMeme = gMeme.lines[gMeme.selectedLineIdx];
}
