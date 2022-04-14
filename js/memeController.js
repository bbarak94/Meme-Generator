'use strict'
// console.log('memeController.js connected')
var gIsTextSelected = false
var gElCanvas
var gCtx
var gCurrId
var gElImg
var gText
var gStartPos
var gLineSelected

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function isTextClicked(clickedPos) {
    var { pos0 } = gMeme
    var distance = Math.sqrt(
        (pos0.x - clickedPos.x) ** 2 + (pos0.y - clickedPos.y) ** 2
    )
    if (distance * 2 <= parseInt(gText.size)) {
        gIsTextSelected = 0
        console.log('Clicked: 0')
        gText.isDrag = true
        return
    }
    var { pos1 } = gMeme
    var distance = Math.sqrt(
        (pos1.x - clickedPos.x) ** 2 + (pos1.y - clickedPos.y) ** 2
    )
    if (distance * 2 <= parseInt(gText.size)) {
        gIsTextSelected = 1
        console.log('Clicked: 1')
        gText.isDrag = true

        return
    }
    var { pos2 } = gMeme
    var distance = Math.sqrt(
        (pos2.x - clickedPos.x) ** 2 + (pos2.y - clickedPos.y) ** 2
    )
    if (distance * 2 <= parseInt(gText.size)) {
        gIsTextSelected = 2
        console.log('Clicked: 2')
        gText.isDrag = true

        return
    } else {
        gIsTextSelected = null
        console.log('Clicked: Nothing')
        return
    }
}

function setTextDrag(isDrag) {
    gText.isDrag = isDrag
    console.log('textDragged')
}

function moveText(dx, dy) {
    gText.pos.x += dx
    gText.pos.y += dy
}

function onSwitchText() {
    console.log('Switch')
}
function onAddText(x = false) {
    if (gText.text === '' && x === false) return
    // console.log(gText.text)
    // console.log(gMeme)
    var idx = gMeme.selectedLineIdx
    if (!gMeme.lines[idx]) {
        gMeme.lines[idx] = gText.text
    }
    gText.text === ''
    if (idx === 0) {
        drawText(
            gMeme.lines[idx],
            gMeme.pos0.x,
            gMeme.pos0.y,
            gMeme.size0,
            gFontName,
            gFillColor,
            gStrokeColor
        )
        clearText()
        setTimeout(() => {
            drawText(
                gMeme.lines[idx],
                gMeme.pos0.x,
                gMeme.pos0.y,
                gMeme.size0,
                gFontName,
                gFillColor,
                gStrokeColor
            )
        }, 300)
    } else if (idx === 1) {
        drawText(
            gMeme.lines[idx],
            gMeme.pos1.x,
            gMeme.pos1.y,
            gMeme.size1,
            gFontName,
            gFillColor,
            gStrokeColor
        )
    } else if(idx===2) {
        drawText(
            gMeme.lines[idx],
            gMeme.pos2.x,
            gMeme.pos2.y,
            gMeme.size2,
            gFontName,
            gFillColor,
            gStrokeColor
        )
    }
    var elTextInput = document.querySelector('.add-text')
    // elTextInput.focus()
    elTextInput.value = ''
    elTextInput.placeholder = ''
    // console.log('Added')
    if(gMeme.selectedLineIdx>2){
        gMeme.selectedLineIdx=-1
    }
    // console.log('idx:',idx)
    // console.log('gMeme.selectedLineIdx before: ',gMeme.selectedLineIdx)
    gMeme.selectedLineIdx = idx + 1
    // console.log('gMeme.selectedLineIdx after: ',gMeme.selectedLineIdx)
}
function onRemoveText() {
    clearText()
    gText.text = ''
    gMeme.lines = []
    resetgMemePos()
    // console.log('Remove')
}

function resetgMemePos() {
    createMeme()
}
function setFont(fontName) {
    changeFont(fontName)
    reRenderText()
}

function onChangeStroke(color) {
    // console.log('Stroke:', color)
    setStroke(color)
    reRenderText()
}

function onChangeFill(color) {
    // console.log('Fill:', color)
    setFill(color)
    reRenderText()
}
function renderCanvas() {
    // var elImg = document.querySelector('.canvas-meme')
    // elImg.src = `img/${gCurrId}.jpg`
    // gElImg = elImg
    renderImg(gElImg)
    renderText()
}

function renderText() {
    // console.log('gElImg', gElImg)
    // console.log('gText:',gText)
    // console.log('gText:',gText)
    // console.log('gMeme:',gMeme)
    // console.log('test')
    clearText()
    // const {pos,color,size}

    gMeme.lines.forEach((line) => {
        gMeme.selectedLineIdx = 0
        onAddText(true)
        if(gMeme.selectedLineIdx<2){
            gMeme.selectedLineIdx++
        }else{
            gMeme.selectedLineIdx=0
        }
    })

    // renderImg(gElImg)
    // var first = gMeme.lines[0].txt
    // var { size, font, fill, stroke } = gText
    // drawText(first, gText.pos.x, 20, size, font, fill, stroke)
    // var second = gMeme.lines[1].txt
    // var { size, font, fill, stroke } = gText
    // drawText(second, gText.pos.x, gText.pos.y, size, font, fill, stroke)
    // var third = gMeme.lines[2].txt
    // var { size, font, fill, stroke } = gText
    // drawText(third, gText.pos.x, gText.pos.y * 2 - 20, size, font, fill, stroke)
}

function createText(pos) {
    gText = {
        text: '',
        pos,
        size: gFontSize,
        font: gFontName,
        fill: gFillColor,
        stroke: gStrokeColor,
        isDrag: false,
    }
}

function drawText(txt, x, y, size, font, fill, stroke) {
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = 'center'
    gCtx.fillStyle = fill
    // var fontStr = size + ' ' + font
    // console.log('fontStr:',fontStr)

    gCtx.font = size + 'px ' + font
    // console.log(gCtx.font)
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = stroke
    gCtx.lineWidth = 2.5
    gCtx.strokeText(txt, x, y)
    // console.log('gCtx:', gCtx)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    var elTextInput = document.querySelector('.add-text')
    var newText
    elTextInput.addEventListener('change', (event) => {
        newText = event.target.value
        gText['text'] = newText
        // console.log('gText:', gText)
    })

    window.addEventListener('resize', () => {
        if (!gIsEditOn) return
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

        // createText(center)
        resizeCanvasContainer()
        // renderCanvas()
        // renderText()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}
function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop,
        }
    }
    return pos
}

function onDown(ev) {
    const pos = getEvPos(ev)
    gStartPos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    console.log('gStartPos:', gStartPos)
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const text = gText
    if (!text.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    gStartPos = pos
    renderCanvas()
}

function onUp(ev) {
    console.log('onUp')
    // if(!gIsTextSelected)return
    console.log('released')
    gText.isDrag = false
    const pos = getEvPos(ev)
    var posStr = 'pos' + gIsTextSelected
    gMeme[posStr].x = pos.x
    gMeme[posStr].y = pos.y
    reRenderText()
    // renderText()
}

function reRenderText() {
    clearText()
    gText.text = ''
    gMeme.selectedLineIdx = 0
    // setTimeout(() => {
    clearText()
    // }, 400);
    // setTimeout(() => {
    onAddText(true)
    onAddText(true)
    onAddText(true)
    // }, 400);
}

function clearText() {
    clearCanvas()
    renderImg(gElImg)
}

function renderImg(img) {
    // get the scale
    var scale = Math.min(
        gElCanvas.width / img.width,
        gElCanvas.height / img.height
    )
    // get the top left position of the image
    var x = gElCanvas.width / 2 - (img.width / 2) * scale
    var y = gElCanvas.height / 2 - (img.height / 2) * scale
    gCtx.drawImage(img, x, y, img.width * scale, img.height * scale)
}

function getImgPath(id) {
    return `img/${id - 1}.jpg`
}

function renderMeme() {
    console.log('renderMeme')
}

function fontUp() {
    if (gIsTextSelected===null) return
    var idx = gIsTextSelected
    gMeme.lines.idx
    var keyStr = 'size' + idx
    console.log(keyStr)
    gMeme[keyStr] = gMeme[keyStr] + 10
    reRenderText()
}

function fontDown() {
    if (gIsTextSelected===null) return
    var idx = gIsTextSelected
    gMeme.lines.idx
    var keyStr = 'size' + idx
    console.log(keyStr)
    gMeme[keyStr] = gMeme[keyStr] - 10
    reRenderText()
}

// onmousedown="onCanvasClick(event)"
//  onmouseup="onMouseUp()"
//   onmousemove="onDrag(event)"
// ontouchmove="event.preventDefault()"
//  ontouchend="onMouseUp()"
