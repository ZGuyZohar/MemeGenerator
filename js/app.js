
function onInit(){
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    // drawImgFromlocal();
    // drawText(gMeme.lines[0].txt, 100, 100)
}


function onDrawText(text){
    gMeme.lines.push(createTextLine(text))
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    drawText(
        gMeme.lines[gMeme.selectedLineIdx].txt,
        gMeme.lines[gMeme.selectedLineIdx].posX,
        gMeme.lines[gMeme.selectedLineIdx].posY
    );
    gMeme.selectedLineIdx++
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