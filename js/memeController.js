'use strict'
// console.log('memeController.js connected')
var gIsTextSelected = null
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

function debugMe() {
    console.log('gIsTextSelected:', gIsTextSelected)
    console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx)
    console.log('gMeme:', gMeme)
}

function onAddText(x = false) {
    // if (gText.text === '' && x === false) return
    if (gMeme.lines.length === 3 && gText.text !== '') {
        alert('maximum 3 lines of text (clear text field)')
        return
    }
    var elTextInput = document.querySelector('.add-text')
    // if (elTextInput.value === '' && x === false) return
    var idx = gMeme.selectedLineIdx
    if (idx > gMeme.lines.length) {
        return
    }
    gMeme.selectedLineIdx = idx + 1
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
    } else if (idx === 2) {
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

    // if(gMeme.lines[idx]==='') return

    var elTextInput = document.querySelector('.add-text')
    elTextInput.value = ''
    elTextInput.placeholder = ''
    if (gMeme.selectedLineIdx > 2) {
        gMeme.selectedLineIdx = 0
    }
    // gMeme.selectedLineIdx = idx + 1
}
function onRemoveText() {
    if(gIsTextSelected===null)return
    // gMeme.
    
    
    // clearText()
    // gText.text = ''
    // gMeme.lines = []
    // resetgMemePos()
}

function resetgMemePos() {
    createMeme()
}
function setFont(fontName) {
    changeFont(fontName)
    reRenderText()
}

function onChangeStroke(color) {
    setStroke(color)
    reRenderText()
}

function onChangeFill(color) {
    setFill(color)
    reRenderText()
    // gMeme.selectedLineIdx = gMeme.lines.length;
}
function renderCanvas() {
    renderImg(gElImg)
    // renderText()
}

// function renderText() {
//     clearText()
//     gMeme.lines.forEach((line) => {
//         gMeme.selectedLineIdx = 0
//         onAddText(true)
//         if (gMeme.selectedLineIdx < 2) {
//             gMeme.selectedLineIdx++
//         } else {
//             gMeme.selectedLineIdx = 0
//         }
//     })
// }

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
    gCtx.font = size + 'px ' + font
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = stroke
    gCtx.lineWidth = 2
    gCtx.strokeText(txt, x, y)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    var elTextInput = document.querySelector('.add-text')
    var newText
    elTextInput.addEventListener('change', (event) => {
        newText = event.target.value
        gText['text'] = newText
    })

    window.addEventListener('resize', () => {
        if (!gIsEditOn) return
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        // createText(center)
        resizeCanvasContainer()
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
    // setTextDrag(true)
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // console.log('test')
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
    console.log('released')
    gText.isDrag = false
    const pos = getEvPos(ev)
    var posStr = 'pos' + gIsTextSelected
    gMeme[posStr].x = pos.x
    gMeme[posStr].y = pos.y
    reRenderText()
}

function reRenderText() {
    clearText()
    gText.text = ''
    gMeme.selectedLineIdx = 0
    clearText()

    if (gIsTextSelected !== 'null') {
        console.log('mark')
    } else {
        console.log('unmark')
    }

    for (var i = 0; i < gMeme.lines.length; i++) {
        onAddText(true)
    }

    // onAddText(true)
    // onAddText(true)
    // onAddText(true)
}

function clearText() {
    clearCanvas()
    renderImg(gElImg)
}

function renderImg(img) {
    var scale = Math.min(
        gElCanvas.width / img.width,
        gElCanvas.height / img.height
    )
    var x = gElCanvas.width / 2 - (img.width / 2) * scale
    var y = gElCanvas.height / 2 - (img.height / 2) * scale
    gCtx.drawImage(img, x, y, img.width * scale, img.height * scale)
}

function getImgPath(id) {
    return `img/${id - 1}.jpg`
}

// function renderMeme() {
// }

function fontUp() {
    if (gIsTextSelected === null) return
    var idx = gIsTextSelected
    gMeme.lines.idx
    var keyStr = 'size' + idx
    console.log(keyStr)
    gMeme[keyStr] = gMeme[keyStr] + 10
    reRenderText()
}

function fontDown() {
    if (gIsTextSelected === null) return
    var idx = gIsTextSelected
    gMeme.lines.idx
    var keyStr = 'size' + idx
    console.log(keyStr)
    gMeme[keyStr] = gMeme[keyStr] - 10
    reRenderText()
}

function drawRect() {
    if (gIsTextSelected === null){
        return
    }
    var keyStr = 'pos' + gIsTextSelected
    console.log('keyStr:', keyStr)
    console.log('gMeme[keyStr].x:', gMeme[keyStr].x)
    console.log('gMeme[keyStr].y:', gMeme[keyStr].y)
    gCtx.clearRect(0,0,gElCanvas.width,gElCanvas.height)
    gCtx.rect(
        gMeme[keyStr].x - 50,
        gMeme[keyStr].y - 25,
        100,
        50
    )
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
}
