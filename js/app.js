let gIsDelete = false;

function onInit() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    renderKeywords();
    gSavedMemes = getSavedMemes()
    renderMemesPage();
    addListeners();
    gAlignList = [gElCanvas.width / 4, gElCanvas.width / 2, gElCanvas.width / 1.5];
    // gCurrMeme = createMeme('');
}

function reset(idx){
    gMeme.lines = []
    gMeme.selectedImgId = idx;
    gMeme.selectedLineIdx = 0;
    createMeme('')
    gCurrMeme = null;
    const elInput = document.querySelector('input[name="meme-text"]');
    elInput.value = '';
}


function renderGallery(isFilter) {
    var imgs = getImgs();
    if(isFilter) imgs = isFilter;
    var strHtmls = imgs.map(function (img, idx) {
        return `
    <div class="image-border" onclick="onShowCanvas(${idx})">
       <img class="gallery-image" src="${img.url}">
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
    if(!gMeme.lines[gMeme.selectedLineIdx].text ) return;
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
    hideCanvas()
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

function showMemesPage(){
    const elMemePage = document.querySelector('.meme-page');
    elMemePage.hidden = false;
    gMeme.selectedImgId = null;
    hideCanvas()
}

function hideCanvas(){
        document.querySelector('.meme-container').classList.remove('meme-toggle');
    setTimeout(() => {
        document.querySelector('.meme-container').style.display = 'none'
    }, 500);    
}

function unshowMemesPage(){
    const elMemePage = document.querySelector('.meme-page');
    elMemePage.hidden = true;
    onCloseModalBtn()
    onFilterBy('all')
    hideCanvas();
}

function renderMemesPage(){
    var strHtmls = gSavedMemes.map(function (meme, idx) {
            return `
    <div class="image-border" onclick="onShowModalSavedMeme(${idx})">
       <img class="gallery-image" src="${meme}">
    </div>
    `;
        });
        document.querySelector('.meme-page-gallery').innerHTML = strHtmls.join('');
}


function onShowModalSavedMeme(idx) {
    const elMemeModal = document.querySelector('.saved-meme');
    elMemeModal.style.display = 'flex'
    const elMemeImg = document.querySelector('.show-meme');
    elMemeImg.src = gSavedMemes[idx]
    gCurrImg = idx;
}

function onCloseModalBtn() {
    const elMemeModal = document.querySelector('.saved-meme');
    elMemeModal.style.display = 'none';    
}


function onDeleteSavedMeme() {
    deleteSavedMeme()
}

function onFilterBy(elValue){
    filterBy(elValue)
}

function renderKeywords(){
    var strHtmls = ['Politics', 'Animal', 'Cute', 'Funny', 'Movie', 'Happy'].map((key) => {
        return `
    <li><a onclick="onClickFilterTag('${key.toLowerCase()}', this)" class="filter-text">${key}</a></li>
    `;
    });
    document.querySelector('.search-container ul').innerHTML = strHtmls.join('');
}

function onClickFilterTag(tagVal, elTag) {
    let fontSize = parseInt(elTag.style.fontSize.slice(0,2))
    if(fontSize >= 46 ) {
        document.querySelector('.search-container ul').style.gridTemplateColumns = 'repeat(auto-fill, 10rem)';
        return;
    }
    clickFilterTag(tagVal);
    elTag.style.fontSize = 12 + gKeywords[tagVal] * 1.5 + 'px'
    filterBy(tagVal);
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