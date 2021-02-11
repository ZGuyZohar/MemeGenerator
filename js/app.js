function onInit() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    addListeners();
    gCurrMeme = createMeme('');
}

function reset(idx){
    var elModalTop = document.querySelector('.modal-top');
    var elModalBot = document.querySelector('.modal-bot');
    elModalTop.style.display = 'none';
    elModalBot.style.display = 'none';
    gMeme.selectedImgId = idx;
    gMeme.lines = [];
    gMeme.selectedLineIdx = -1;
    gCurrMeme = gMeme.lines[0];
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
        elMemeContent.style.display = 'flex';
        //  if (window.matchMedia('(max-width: 975px)').matches) {
        //     elMemeContent.style.display = 'flex';
        //  }
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
        openModal()
    } else {
        gCurrMeme.size -= 10;
        drawImgFromlocal();
        openModal();
    }
}

function onMemeDirection(boolean) {
    if (boolean) {
        gCurrMeme.pos.y += 10;
        drawImgFromlocal();
        openModal();
    } else {
        gCurrMeme.pos.y -= 10;
        drawImgFromlocal();
        openModal();
    }
}

function changeLine(){
    gMeme.selectedLineIdx++
    if(gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
    gCurrMeme = gMeme.lines[gMeme.selectedLineIdx];
}

function toggleMenu() {
    gMeme.selectedImgId = null;
    document.body.classList.toggle('menu-open');
    console.log('hi');
    document.querySelector('.meme-container').classList.remove('meme-toggle');
    setTimeout(() => {
        document.querySelector('.meme-container').style.display = 'none'
    }, 500);
}