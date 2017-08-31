'use strict';

var pictures = [];
var COMMENTS = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

var picturePage = document.querySelector('.gallery-overlay'); 
var pictureTemplate = document.querySelector('#picture-template');

var getTrueOrFalse = function () {
  var TrueOrFalse = Math.random() >= 0.5;
  return TrueOrFalse;
}
var addComments = function () { // Создание массива комментов к фотографии
  var randomBoolean = getTrueOrFalse();
  var randomComments = [];
  if (randomBoolean == true) {  // Если тру, то добавляем два коммента
    for (var i = 0; i < 2; i++) {
      var index = Math.floor(Math.random() * (5 - i)) + i;
      if (i === 1) {
        COMMENTS[index] = ' ' + COMMENTS[index];
      }
      randomComments.push(COMMENTS[index]);
    }
    return randomComments;
  }
  else {                        // Если фолс, то добавляем один коммент
    var index = Math.floor(Math.random() * 5);
    randomComments.push(COMMENTS[index]);
    return randomComments;
  }
}

var getPictureData = function () { // Функция для создания данных к фотографиям
  for (i = 1; i < 27; i++) {
    var pictureData = {
      url: 'photos/' + i + '.jpg',
      likes: Math.floor((Math.random() * 185) + 15),
      comments: addComments()        // Массив из 1 или 2 строк
    }
    pictures.push(pictureData);
  }
}
getPictureData();

var fragment = document.createDocumentFragment(); // Создаем фрагмент, в который будем класть элементы
for (var i = 0; i < pictures.length; i++) {
  var picture = pictureTemplate.content.cloneNode(true);
  picture.querySelector('img').src = pictures[i].url;
  picture.querySelector('.picture-likes').textContent = pictures[i].likes;
  picture.querySelector('.picture-comments').textContent = pictures[i].comments;
  fragment.appendChild(picture);
}

var fillPicturePage = function (pictureIndex) { // Функция заполенния данными страницы фотографии
  picturePage.querySelector('.gallery-overlay-image').src = pictureIndex.url;
  picturePage.querySelector('.likes-count').textContent = pictureIndex.likes;
  picturePage.querySelector('.comments-count').textContent = pictureIndex.comments;
}

document.querySelector('.pictures').appendChild(fragment);
document.querySelector('.upload-ovelay').classList.add('hidden');
picturePage.classList.remove('hidden');      
fillPicturePage(pictures[0]);
