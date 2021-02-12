let gIsDelete = false;

function onInit() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    addListeners();
    gAlignList = [gElCanvas.width / 4, gElCanvas.width / 2, gElCanvas.width / 1.5];
    // gCurrMeme = createMeme('');
}

function reset(idx){
    gMeme.selectedImgId = idx;
    gMeme.selectedLineIdx = 0;
    createMeme('')
    gCurrMeme = null;
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

function onDrawText(elInput) {
    if(gMeme.selectedLineIdx === -1) {
        gMeme.selectedLineIdx = 0;
        createMeme('')
    }
    gMeme.lines[gMeme.selectedLineIdx].text = elInput;
    gCurrMeme = gMeme.lines[gMeme.selectedLineIdx];
    renderCanvas()
}

function onAddText(){
    if(!gMeme.lines[gMeme.selectedLineIdx].text) return;
    document.querySelector('input[name="meme-text"]').value = '';
    gMeme.selectedLineIdx = gMeme.lines.length;
    createMeme();
    renderCanvas();
}

function onShowCanvas(idx){
    if (gMeme.selectedImgId === null) {
        const elMemeContent = document.querySelector('.meme-container');
        elMemeContent.style.display = 'flex';
         if (window.matchMedia('(max-width: 555px)').matches) {
            document.getElementById('canvas').width = 339;
            document.getElementById('canvas').height = 350;
         }
        setTimeout(() => {
            elMemeContent.classList.add('meme-toggle');
        }, 1);
    }
    setImg(idx);
}

function onLrcAlign(idx){
    gMeme.lines[gMeme.selectedLineIdx].pos.x = gAlignList[idx]
    renderCanvas();
}

function onFontSizeChange(boolean) {
    if (gCurrMeme === undefined) return;
    if (boolean) {
        gCurrMeme.size += 10;
        renderCanvas()
    } else {
        gCurrMeme.size -= 10;
        renderCanvas()
    }
}

function onFontStyle(elInput){
    gMeme.lines[gMeme.selectedLineIdx].fontStyle = elInput.value;
    renderCanvas()
}

function onFontColor(color){
    gFontColor = color;
    gCurrMeme.color = gFontColor;
    renderCanvas()
}

function onChangeLine(){
    changeLine()
    renderCanvas()
}

function toggleMenu() {
    gMeme.selectedImgId = null;
    document.body.classList.toggle('menu-open');
    document.querySelector('.meme-container').classList.remove('meme-toggle');
    setTimeout(() => {
        document.querySelector('.meme-container').style.display = 'none'
    }, 500);
}

function onDeleteMeme(){
    if(gMeme.selectedLineIdx === -1) {
        gMeme.selectedLineIdx = gMeme.lines.length-1;
        return renderCanvas()
    }
    deleteMeme()
    gIsDelete = true;
    setTimeout(() => {
        gIsDelete = false;
        renderCanvas()
    }, 10);
    renderCanvas()
}


// function onMemeDirection(boolean) {
//     if(gCurrMeme === undefined) return
//     if (boolean) {
//         gCurrMeme.pos.y += 10;
//         renderCanvas();
//     } else {
//         gCurrMeme.pos.y -= 10;
//         renderCanvas();
//     }
// }