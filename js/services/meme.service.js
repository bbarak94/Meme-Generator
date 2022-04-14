'use strict'
console.log('meme.service.js connected')

var gFontSize = '50px'
var gFontName = 'impact'
var gStrokeColor = '#000000'
var gFillColor = '#ffffff'
var gIsEditOn = false
var gImgW
var gImgH
var gAspectRatio
var gStartPos

var gMeme
// var gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             txt: 'First Line',
//             size: 20,
//             align: 'left',
//             color: 'red',
//         },
//         {
//             txt: 'Second Line',
//             size: 10,
//             align: 'left',
//             color: 'red',
//         },
//         {
//             txt: 'Third Line',
//             size: 15,
//             align: 'left',
//             color: 'red',
//         },
//     ],
// }

function serviceInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    var elImg = document.querySelector('.canvas-meme')
    elImg.src = `img/${gCurrId}.jpg`
    gElImg = elImg
    
    // resizeCanvasContainer()
    resizeCanvas()
    // if(!gMeme){
        var meme = createMeme()
    // }
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    createText(center)
    addListeners()


    resizeCanvas()

    // resizeCanvasContainer()
    renderMeme()
    renderCanvas()

    setTimeout(() => {
        renderCanvas()
    }, 200)

    //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    // createText(center)
    // resizeCanvas()
    // renderCanvas()
}

function getRealImgSize(ev){
    var height = ev.naturalHeight
    var width = ev.naturalWidth
    console.log('Height:',height)
    console.log('Width:',width)
    gAspectRatio = width/height
    setCanvasSize(width,height)
    console.log('gMeme:',gMeme)
    
}

function setCanvasSize(w,h){
    document.querySelector('#my-canvas').setAttribute("width",w)
    document.querySelector('#my-canvas').setAttribute("height",h)
    gImgW = w
    gImgH = h
}

function setEditOn() {
    gIsEditOn = true
}
function setEditOff() {
    gIsEditOn = false
}



function getText() {
    return gText
}

function onMove() {
    const text = getText()
    if (!text.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    gStartPos = pos
    renderCanvas()
}

function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'grab'
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height/4)
}

function resizeCanvasContainer() {
    var elContainer = document.querySelector('.canvas-container')
    
    elContainer.width = gImgW
    elContainer.height = gImgH
    
    // gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = gElCanvas.width/gAspectRatio
    // gElCanvas.height = elContainer.offsetHeight
}

function changeFont(fontName) {
    gFontName = fontName
    console.log('gFontName:', gFontName)
}

function setStroke(color) {
    gStrokeColor = color
    console.log('gStrokeColor:', gStrokeColor)
}

function setFill(color) {
    gFillColor = color
    console.log('gFillColor:', gFillColor)
}

function updateCurrId(id) {
    gCurrId = id
}
function getCurrId() {
    return gCurrId
}

function getMeme() {
    var meme = gMeme
    return meme
}

function createMeme() {
    console.log(gElImg)
    var newMeme = {
        selectedImgId: gCurrId,
        selectedLineIdx: 0,
        lines: [],
        size0:50,
        size1:50,
        size2:50,
        pos0:{x:gElCanvas.width/2,y:30},
        pos1:{x:gElCanvas.width/2,y:gElCanvas.height-30},
        pos2:{x:gElCanvas.width/2,y:gElCanvas.height/2}
    }
    gMeme = newMeme
    return gMeme
}

function setLineText() {
    renderMeme()
}

/////////////////////

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    reader.onload = (event) => {
        console.log('onload')
        var img = new Image()
        // Render on canvas
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    console.log('after')
    reader.readAsDataURL(ev.target.files[0])
}
