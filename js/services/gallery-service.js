'use strict'
// console.log('gallery-service.js connected')

var gKeywordSearchCountMap = {
   funny: 0,
   animal: 0,
   cute: 0,
   laugh: 0,
   sweet: 0,
   ridiculous: 0,
}

var gImages = [
   { id: 1, url: 'img/1.jpg', keywords: ['funny', 'ridiculous'] },
   { id: 2, url: 'img/2.jpg', keywords: ['animal', 'cute'] },
   { id: 3, url: 'img/3.jpg', keywords: ['animal', 'cute'] },
   { id: 4, url: 'img/4.jpg', keywords: ['animal', 'cute'] },
   { id: 5, url: 'img/5.jpg', keywords: ['funny', 'ridiculous'] },
   { id: 6, url: 'img/6.jpg', keywords: ['funny', 'ridiculous'] },
   { id: 7, url: 'img/7.jpg', keywords: ['sweet', 'ridiculous'] },
   { id: 8, url: 'img/8.jpg', keywords: ['sweet', 'laugh'] },
   { id: 9, url: 'img/9.jpg', keywords: ['laugh', 'funny', 'ridiculous'] },
   { id: 10, url: 'img/10.jpg', keywords: ['funny', 'ridiculous'] },
   { id: 11, url: 'img/11.jpg', keywords: ['ridiculous'] },
   { id: 12, url: 'img/12.jpg', keywords: ['funny', 'ridiculous'] },
]

function getImages(){
   var images = gImages
   return images
}

