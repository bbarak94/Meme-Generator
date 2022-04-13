'use strict'
console.log('meme.service.js connected')
var gElCanvas
var gCtx
var gCurrId
var gElImg
var gFontSize = '30px'
var gFontName = 'impact'
var gStrokeColor = '#000000'
var gFillColor = '#ffffff'
var gText
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gIsEditOn = false

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'First Line',
            size: 20,
            align: 'left',
            color: 'red',
        },
        {
            txt: 'Second Line',
            size: 10,
            align: 'left',
            color: 'red',
        },
        {
            txt: 'Third Line',
            size: 15,
            align: 'left',
            color: 'red',
        },
    ],
}

function serviceInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    createText(center)
    addListeners()
    // renderMeme()
    resizeCanvas()
    renderCanvas()

    setTimeout(() => {
        renderCanvas()
    },200)

    //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    // createText(center)
    // resizeCanvas()
    // renderCanvas()
}

function setEditOn() {
    gIsEditOn = true
}
function setEditOff() {
    gIsEditOn = false
}
function renderCanvas() {
    console.log('renderMeme')
    var elImg = document.querySelector('.canvas-meme')
    elImg.src = `img/${gCurrId}.jpg`
    gElImg = elImg

    renderImg(gElImg)
    renderText()

    // renderCircle()
    // gCtx.fillStyle = "black"
    // gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}
function createText(pos) {
    gText = {
        pos,
        size: gFontSize,
        font: gFontName,
        fill: gFillColor,
        stroke: gStrokeColor,
        isDrag: false,
    }
}

function drawText(txt, x, y, size, font, fill, stroke) {
    // x,y are center

    console.log(
        'txt,x,y,size,font,fill,stroke:',
        txt,
        x,
        y,
        size,
        font,
        fill,
        stroke
    )

    gCtx.textBaseline = 'middle'
    gCtx.textAlign = 'center'
    // // gCtx.lineWidth = 2;/////
    gCtx.fillStyle = fill
    gCtx.font = size + ' ' + font
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = stroke
    gCtx.strokeText(txt, x, y)

    // gCtx.beginPath()
    // gCtx.lineWidth = '6'
    // gCtx.arc(x, y, size, 0, 2 * Math.PI)
    // gCtx.strokeStyle = 'white'
    // gCtx.stroke()
    // gCtx.fillStyle = color
    // gCtx.fill()
}

function renderText() {
    console.log('gElImg', gElImg)
    // renderImg(gElImg)
    var first = gMeme.lines[0].txt
    var { size, font, fill, stroke } = gText
    drawText(first, gText.pos.x, 20, size, font, fill, stroke)
    var second = gMeme.lines[1].txt
    var { size, font, fill, stroke } = gText
    drawText(second, gText.pos.x, gText.pos.y, size, font, fill, stroke)
    var third = gMeme.lines[2].txt
    var { size, font, fill, stroke } = gText
    drawText(third, gText.pos.x, gText.pos.y * 2 - 20, size, font, fill, stroke)

    // gMeme.lines.forEach((line) =>{
    //     var { size, font, fill, stroke } = gText
    //     drawText(line, gText.pos.x, gText.pos.y, size, font, fill, stroke)
    // })
}

function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        if (!gIsEditOn) return
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        createText(center)
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {}
function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height/4)
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
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

function createMeme(id) {
    var newMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [],
    }
    return gMeme
}

function renderMeme() {
    console.log('renderMeme')
    var elImg = document.querySelector('.canvas-meme')
    elImg.src = `img/${gCurrId}.jpg`
    gElImg = elImg
    // renderImg(elImg)
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

function renderImg(img) {
    console.log('img:', img)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function getImgPath(id) {
    return `img/${id - 1}.jpg`
}
