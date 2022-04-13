'use strict'
// console.log('memeController.js connected')

function onSwitchText() {
    console.log('Switch')
}
function onAddText() {
    var currId = getCurrId()
    var meme = createMeme(currId)
    var elTextInput = document.querySelector('.add-text')
    console.log('elTextInput.value:',elTextInput.value)
    var newText = elTextInput.value
    elTextInput.focus()
    elTextInput.value = ''
    elTextInput.placeholder = ''
    console.log('meme:', meme)
    console.log('Add')

   }
function onRemoveText() {
    console.log('Remove')
}

function setFont(fontName) {
    changeFont(fontName)
}

function onChangeStroke(color) {
    console.log('Stroke:', color)
    setStroke(color)
}

function onChangeFill(color) {
    console.log('Fill:', color)
    setFill(color)
}
