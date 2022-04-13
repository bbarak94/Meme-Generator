'use strict'
// console.log('main.js connected')

function onInit(){
   setEditOff()
   console.log('onInit')
   document.querySelector('.editor-container').classList.add('hidden');
   document.querySelector('.gallery').classList.remove('hidden');
   renderGallery();
   // setTimeout(() => {
   //    onClickImg(gImages[1].id)      
   // }, 200)
}