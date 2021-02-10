// const gKeywords = {happy: 12, funny puk: 1}
const gImgs = [
    {id: 0, url: '../styles/imgs/meme-imgs/0.jpg', keywords: ['happy']},
    {id: 1, url: '../styles/imgs/meme-imgs/1.jpg', keywords: ['happy']},
    {id: 2, url: '../styles/imgs/meme-imgs/2.jpg', keywords: ['happy']},
    {id: 3, url: '../styles/imgs/meme-imgs/3.jpg', keywords: ['happy']},
    {id: 4, url: '../styles/imgs/meme-imgs/4.jpg', keywords: ['happy']},
    {id: 5, url: '../styles/imgs/meme-imgs/5.jpg', keywords: ['happy']},
    {id: 6, url: '../styles/imgs/meme-imgs/6.jpg', keywords: ['happy']},
    {id: 7, url: '../styles/imgs/meme-imgs/7.jpg', keywords: ['happy']},
    {id: 8, url: '../styles/imgs/meme-imgs/8.jpg', keywords: ['happy']},
    {id: 9, url: '../styles/imgs/meme-imgs/9.jpg', keywords: ['happy']},
    {id: 10, url: '../styles/imgs/meme-imgs/10.jpg', keywords: ['happy']},
    {id: 11, url: '../styles/imgs/meme-imgs/11.jpg', keywords: ['happy']},
    {id: 12, url: '../styles/imgs/meme-imgs/12.jpg', keywords: ['happy']},
    {id: 13, url: '../styles/imgs/meme-imgs/13.jpg', keywords: ['happy']},
    {id: 14, url: '../styles/imgs/meme-imgs/14.jpg', keywords: ['happy']},
    {id: 15, url: '../styles/imgs/meme-imgs/15.jpg', keywords: ['happy']},
    {id: 16, url: '../styles/imgs/meme-imgs/16.jpg', keywords: ['happy']},
    {id: 17, url: '../styles/imgs/meme-imgs/17.jpg', keywords: ['happy']},
]
const gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
    {
        txt: '',
        size: 30,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        posX: 300,
        posY: 100
    }
    ]
}

function createTextLine(text){
    var newLine = {
        txt: text,
        size: 30,
        align: 'center',
        color: 'white',
        strokeColor: 'black'
    };
    if(gMeme.selectedLineIdx === 0){
        newLine.posX = 300;
        newLine.posY = 100;
    } else if (gMeme.selectedLineIdx === 1) {
        newLine.posX = 300;
        newLine.posY = 400;
    } else {
        newLine.posX = 300;
        newLine.posY = 250;
    }
    return gMeme.lines.push(newLine);
}

function getImgs(){
    return gImgs;
}

function changeLine(){
    gMeme.selectedLineIdx++
    if(gMeme.selectedLineIdx === gMeme.lines.length+1) gMeme.selectedLineIdx = 0;
}