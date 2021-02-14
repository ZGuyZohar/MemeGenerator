const gKeywords = {happy: 3, funny: 6, politics: 3, animal: 3, cute: 4, movie: 6}
const KEY = 'memes';
const gImgs = [                                                                     
    {id: 0, url: 'styles/imgs/meme-imgs/0.jpg', keywords: ['politics']},
    {id: 1, url: 'styles/imgs/meme-imgs/1.jpg', keywords: ['animal', 'cute']},
    {id: 2, url: 'styles/imgs/meme-imgs/2.jpg', keywords: ['animal', 'cute']},
    {id: 3, url: 'styles/imgs/meme-imgs/3.jpg', keywords: ['animal']},
    {id: 4, url: 'styles/imgs/meme-imgs/4.jpg', keywords: ['cute']},
    {id: 5, url: 'styles/imgs/meme-imgs/5.jpg', keywords: ['funny', 'happy']},
    {id: 6, url: 'styles/imgs/meme-imgs/6.jpg', keywords: ['cute']},
    {id: 7, url: 'styles/imgs/meme-imgs/7.jpg', keywords: ['funny', 'movie']},
    {id: 8, url: 'styles/imgs/meme-imgs/8.jpg', keywords: ['funny']},
    {id: 9, url: 'styles/imgs/meme-imgs/9.jpg', keywords: ['politics']},
    {id: 10, url: 'styles/imgs/meme-imgs/10.jpg', keywords: ['funny']},
    {id: 11, url: 'styles/imgs/meme-imgs/11.jpg', keywords: ['happy']},
    {id: 12, url: 'styles/imgs/meme-imgs/12.jpg', keywords: ['movie']},
    {id: 13, url: 'styles/imgs/meme-imgs/13.jpg', keywords: ['movie', 'happy']},
    {id: 14, url: 'styles/imgs/meme-imgs/14.jpg', keywords: ['movie']},
    {id: 15, url: 'styles/imgs/meme-imgs/15.jpg', keywords: ['movie', 'funny']},
    {id: 16, url: 'styles/imgs/meme-imgs/16.jpg', keywords: ['politics']},
    {id: 17, url: 'styles/imgs/meme-imgs/17.jpg', keywords: ['movie', 'funny']},
]
let gMeme = {
    selectedImgId: null,
    selectedLineIdx: -1,
    lines: [],
    isFromStorage: false
}
let gPrevMemeImg = null;
let gSavedMemes = [];
let gAlignList;
let gFontColor = '';
let gCurrImg;


function getImgs(){
    return gImgs;
}

function changeLine(){
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
    gCurrMeme = gMeme.lines[gMeme.selectedLineIdx];
}

function getSavedMemes() {
    gSavedMemes = loadFromStorage(KEY);
    if (!gSavedMemes || !gSavedMemes.length) gSavedMemes = [];
    return gSavedMemes;
}

function saveMeme(){
    let displayImg = gElCanvas.toDataURL();
    let newImgId = gImgs[gMeme.selectedImgId].id;
    const newMeme = {
        displayImg,
        imgId: newImgId,
        lines: gMeme.lines
    }
    if (gPrevMemeImg === displayImg) return;
    gSavedMemes.push(newMeme);
    saveToStorage(KEY, gSavedMemes);
    gPrevMemeImg = displayImg;
    renderMemesPage()
}

function deleteSavedMeme(){
    const foundIdx = gSavedMemes.findIndex((meme, idx) => {
        return idx === gCurrImg;
    });
    gSavedMemes.splice(foundIdx, 1);
    saveToStorage(KEY, gSavedMemes);
    renderMemesPage();
    gCurrImg = null;
}

function filterBy(elValue){
    const filterBy = elValue.toLowerCase()
    if(filterBy === 'all' || !filterBy) return renderGallery()
    const filterImgs = [];
    gImgs.forEach((img, idx) => {
        img.keywords.forEach((key, i) => {
            if (key === filterBy){
                filterImgs.push(gImgs[idx])
            } 
        });
    });
    document.querySelector('.search-container input').value = elValue;
    renderGallery(filterImgs);
}

function clickFilterTag(tagVal){
    for(let tag in gKeywords){
        if(tagVal === tag) gKeywords[tag]++
    }
}