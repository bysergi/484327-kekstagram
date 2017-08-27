'use strict';

var pictures = [];
var comments = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];
var randomComments = [];                                           // Случайны комменты к фотографии
var picturePage = document.querySelector('.gallery-overlay');      // Находим оверлей
var pictureTemplate = document.querySelector('#picture-template'); // Находим темплейт

var addComments = function () { // Создание массива комментов к фотографии
  var randomBoolean = Math.random() >= 0.5
  if (randomBoolean == true) {  // Если тру, то добавляем два коммента
    for (var i = 0; i < 2; i++) {
      var index = Math.floor(Math.random() * (5 - i)) + i;
      randomComments.push(comments[index]);
    }
    return randomComments;
  }
  else {                        // Если фолс, то добавляем один коммент
    var index = Math.floor(Math.random() * 5);
    randomComments.push(comments[index]);
    return randomComments;
  }
}
var createPicData = function (i) { // Функция для создания данных к фотографии
  var picData = {
    url: 'photos/' + i + '.jpg',
    likes: Math.floor((Math.random() * 185) + 15),
    comments: addComments()        // Массив из 1 или 2 строк
  }
}
var fillPicPage = function (picture) { // Функция заполенния данными
  picturePage.querySelector('.gallary-overlay-image').src = pictures.url;
  picturePage.querySelector('.likes-count').textContent = pictures.likes;
  picturePage.querySelector('.comments-count').textContent = pictures.comments;
}

var fragment = document.createDocumentFragment();                  // Создаем фрагмент, в который будем класть элемент
for (var i = 0; i < 25; i++) {
  var picture = pictureTemplate.content.cloneNode(true);
  createPicData(i);
  // picture.querySelector('img').src = picData.url;                  // picData не отдает данные
  // picture.querySelector('.picture-likes').textContent = picData.likes;
  // picture.querySelector('.picture-comments').textContent = picData.comments;
  // pictures.push(picture);                                          // Добавляем данные в массив пикчерс
  fragment.appendChild(picture);
}

document.querySelector('.pictures').appendChild(fragment); // отрисовали в блок пикчерс
document.querySelector('.upload-ovelay').classList.add('hidden');
picturePage.classList.remove('hidden');                    // Показываем оверлей
fillPicPage(picture[0]);                                   // Заполняем данные из первой фотографии
