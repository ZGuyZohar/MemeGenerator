
function onInit(){
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    addListeners();
    // drawImgFromlocal();
    // drawText(gMeme.lines[0].txt, 100, 100)
}

function renderGallery(){
    var imgs = getImgs()
    var strHtmls = imgs.map(function (img, idx) {
        return `
    <div class="image-border" onclick="drawImgFromlocal(${idx})">
        <img class="gallery-image" src="styles/imgs/meme-imgs/${idx}.jpg">
    </div>
    `;
    });
    document.querySelector('.gallery').innerHTML = strHtmls.join('');
}

function onDrawText(text){
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    drawText(
        text,
        gMeme.lines[gMeme.selectedLineIdx].posX,
        gMeme.lines[gMeme.selectedLineIdx].posY
    );
    onAddText()
}

function onFontSizeChange(boolean){
    if(boolean){
        gMeme.lines[gMeme.selectedLineIdx].size += 10;
        drawImgFromlocal(
            gMeme.selectedImgId,
            gMeme.lines[gMeme.selectedLineIdx].txt
        );
    } else {
    gMeme.lines[gMeme.selectedLineIdx].size -= 10;
    drawImgFromlocal(
        gMeme.selectedImgId,
        gMeme.lines[gMeme.selectedLineIdx].txt
    );        
    }
}


function onMemeDirection(boolean){
    if(boolean){
        gMeme.lines[gMeme.selectedLineIdx].posY += 10;
        drawImgFromlocal(gMeme.selectedImgId, gMeme.lines[gMeme.selectedLineIdx].txt);
    } else {
        gMeme.lines[gMeme.selectedLineIdx].posY -= 10;
        drawImgFromlocal(gMeme.selectedImgId, gMeme.lines[gMeme.selectedLineIdx].txt);        
    }
}

function onChangeLine(){
    changeLine()
}

function onAddText(){
    gMeme.selectedLineIdx++
    createTextLine()
}

function addListeners() {
    // addMouseListeners();
    // addTouchListeners();
    window.addEventListener('resize', () => {
        resizeCanvas();
        console.log('heyehy');
        // renderCanvas();
    });
}