'use strict'

function onInit(){
    setEditOff()
    document.querySelector('.editor-container').classList.add('hidden');
    document.querySelector('.gallery').classList.remove('hidden');
    renderGallery();
 }

function renderGallery() {
    var images = getImages()
    var strHTMLs = `<section class="gallery flex"> `
    images.forEach((img) => {
        var strHTML = ` <img onmouseover="getRealImgSize(this)" class="img-${img.id}" src="img/${img.id}.jpg" alt="${img.kewords}" onclick="onClickImg(${img.id})"/> `
        strHTMLs += strHTML
    })
    document.querySelector('.gallery').innerHTML = strHTMLs + ` </section>`
}

function onClickImg(id) {
    setEditOn()
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.editor-container').classList.remove('hidden')
    updateCurrId(id)
    serviceInit()
}

