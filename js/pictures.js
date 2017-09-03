'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var picturePage = document.querySelector('.gallery-overlay');
var pictureTemplate = document.querySelector('#picture-template');

var getRandomBoolean = function () {
  return Math.random() >= 0.5;
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var getComments = function () {
  var randomComments = [];
  var isNeedTwoComment = getRandomBoolean();

  randomComments.push(COMMENTS[getRandomInt(0, COMMENTS.length)]);
  if (isNeedTwoComment) {
    randomComments.push(COMMENTS[getRandomInt(0, COMMENTS.length)]);
  }
  return randomComments;
};

var getPicturesData = function (num) {
  var pictures = [];
  for (var i = 1; i < num + 1; i++) {
    var pictureData = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomInt(15, 200),
      comments: getComments()
    };
    pictures.push(pictureData);
  }
  return pictures;
};
var createPicturesGrid = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    var picture = pictureTemplate.content.cloneNode(true);
    picture.querySelector('img').src = pictures[i].url;
    picture.querySelector('.picture-likes').textContent = pictures[i].likes;
    picture.querySelector('.picture-comments').textContent = pictures[i].comments;
    fragment.appendChild(picture);
  }
  return fragment;
};
var fillPicturePage = function (picture) { // Функция заполенния данными страницы фотографии
  var fragment = document.createDocumentFragment();
  picturePage.querySelector('.gallery-overlay-image').src = picture.url;
  picturePage.querySelector('.likes-count').textContent = picture.likes;
  picturePage.querySelector('.comments-count').textContent = picture.comments.length;
  fragment.appendChild(picture);
  return fragment;
};

var pictures = getPicturesData(26);
var picturesGrid = createPicturesGrid(pictures);
document.querySelector('.pictures').appendChild(picturesGrid);
// document.querySelector('.upload-ovelay').classList.add('hidden');
picturePage.classList.remove('hidden');
fillPicturePage(pictures[0]);
