'use strict'
// console.log('gallery-controller.js connected')

function renderGallery(){
   var images = getImages()
   var strHTMLs = `<section class="gallery flex"> `
   images.forEach((img) =>{
      var strHTML = ` <img src="img/${img.id}.jpg" alt="${img.kewords}" onclick="onClickImg(${img.id})"/> `
      strHTMLs += strHTML
   })
   document.querySelector('.gallery').innerHTML=strHTMLs+` </section>`;
}

function onClickImg(id){
   setEditOn()
   console.log('onClickImg,id:',id)
   document.querySelector('.gallery').classList.add('hidden');
   var meme = getMeme()
   console.log('meme:',meme)
   meme.selectedImgId = id;
   console.log('meme.selectedImgId:',meme.selectedImgId)
   document.querySelector('.editor-container').classList.remove('hidden');
   // createMeme(id)
   updateCurrId(id)
   serviceInit()
   // renderMeme()
   // resizeCanvas()
   // const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
   // createText(center)
   // renderCanvas()

}
