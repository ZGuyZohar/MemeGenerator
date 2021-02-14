let gIsDelete = false;
let gDeleteBtn = false;
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
    gMeme.isFromStorage = false;
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
    gMeme.selectedLineIdx = gMeme.lines.length;
    createMeme();
    if(!gMeme.lines[gMeme.selectedLineIdx].text ) return;
    document.querySelector('input[name="meme-text"]').value = '';
    renderCanvas();
}

function onShowCanvas(idx, isStorage){
    if (gMeme.selectedImgId === null || isStorage) {
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
    renderDeleteBtn();
    setImg(idx, isStorage);
    document.querySelector('.meme-text input').focus();
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

function hideCanvas(){
    reset();   
    document.querySelector('.meme-container').classList.remove('meme-toggle');
    setTimeout(() => {
        document.querySelector('.meme-container').style.display = 'none'
    }, 500);
    gMeme.selectedImgId = null; 
}

function showMemesPage(){
    const elMemePage = document.querySelector('.meme-page');
    elMemePage.style.display = 'block';
    const elContainer = document.querySelector('.container');
    elContainer.style.display = 'none';
    gMeme.selectedImgId = null;
    toggleMenu();
    hideCanvas();
}

function unshowMemesPage(){
    const elMemePage = document.querySelector('.meme-page');
    elMemePage.style.display = 'none';
    const elContainer = document.querySelector('.container');
    elContainer.style.display = 'block';
    gMeme.selectedImgId = null; 
    onFilterBy('all');
    toggleMenu();
    hideCanvas();
}

function renderMemesPage(){
    var strHtmls = gSavedMemes.map(function (meme, idx) {
            return `
    <div class="image-border" onclick="onShowSavedMeme(${idx}, ${meme.imgId})">
       <img class="gallery-image" src="${meme.displayImg}">
    </div>
    `;
        });
        document.querySelector('.meme-page-gallery').innerHTML = strHtmls.join('');
}


function renderDeleteBtn(){
    const elDeleteMeme = document.querySelector('.delete-meme')
    const elControls = document.querySelector('.controls');
    let elBtn = `<button class="submit-btn delete-meme" onclick="onDeleteSavedMeme()">Delete</button>`;
    if(gDeleteBtn) elDeleteMeme.style.display = 'none';
    if(gMeme.isFromStorage && gDeleteBtn) elDeleteMeme.style.display = 'block';
    if(gMeme.isFromStorage && !gDeleteBtn) {
        elControls.innerHTML += elBtn;
        gDeleteBtn = true;
    }
}

function onShowSavedMeme(idx, imgId) {
    gMeme.selectedImgId = gSavedMemes[idx].imgId;
    gMeme.lines = gSavedMemes[idx].lines;
    gMeme.isFromStorage = true;
    gCurrImg = idx;
    onShowCanvas(imgId, true)
}

function onDeleteSavedMeme() {
    deleteSavedMeme();
    hideCanvas();
}

function onFilterBy(elValue){
    filterBy(elValue)
}

function renderKeywords(){
    var strHtmls = ['Politics', 'Animal', 'Cute', 'Funny', 'Movie', 'Happy'].map((key) => {
        return `
    <li><a onclick="onClickFilterTag('${key}', this)" class="filter-text">${key}</a></li>
    `;
    });
    document.querySelector('.search-container ul').innerHTML = strHtmls.join('');
}

function onClickFilterTag(tagVal, elTag) {
    const filterVal = tagVal.toLowerCase();
    let fontSize = parseInt(elTag.style.fontSize.slice(0,2))
    if(fontSize >= 38 ) {
        document.querySelector('.search-container ul').style.gridTemplateColumns = 'repeat(auto-fill, 10rem)';
        return filterBy(tagVal);
    }
    clickFilterTag(filterVal);
    elTag.style.fontSize = 12 + gKeywords[filterVal] * 1.5 + 'px'
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