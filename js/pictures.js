'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PHOTOS_SUM = 26;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var picturePage = document.querySelector('.gallery-overlay');
var pictureTemplate = document.querySelector('#picture-template');
var picturePageClose = document.querySelector('.gallery-overlay-close');

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

// Наполяняем страницу фотками
var createPicturesGrid = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    var template = pictureTemplate.content.cloneNode(true);
    template.querySelector('img').src = pictures[i].url;
    template.querySelector('.picture-likes').textContent = pictures[i].likes;
    template.querySelector('.picture-comments').textContent = pictures[i].comments;
    fragment.appendChild(template);
  }
  return fragment;
};

// Заполняем страницу фото данными из первью
var fillPicturePage = function (picturePreview) {
  picturePage.querySelector('.gallery-overlay-image').src = picturePreview.url;
  picturePage.querySelector('.likes-count').textContent = picturePreview.likes;
  picturePage.querySelector('.comments-count').textContent = picturePreview.comments.length;
};

// Берем данные на из превью
var getPicturePreviewData = function (event) {
  var PicturePreviewData = {
    url: event.currentTarget.children[0].getAttribute('src'),
    likes: event.currentTarget.querySelector('.picture-likes').textContent,
    comments: event.currentTarget.querySelector('.picture-comments').textContent
  };
  return PicturePreviewData;
};

// Добавление и удаление обработчиков
var openPicPage = function () {
  picturePage.classList.remove('hidden');
  picturePageClose.setAttribute('tabindex', 0);
  picturePageClose.addEventListener('click', onPicPageClose);
  document.addEventListener('keydown', onPicPageEscPress);
  picturePageClose.addEventListener('keydown', onPicPageEnterPress);
};
var closePicPage = function () {
  picturePage.classList.add('hidden');
  picturePageClose.removeEventListener('click', onPicPageClose);
  document.removeEventListener('keydown', onPicPageEscPress);
  picturePageClose.removeEventListener('keydown', onPicPageEnterPress);
};

// Обработчики
var onPicPageClose = function () {
  picturePage.classList.add('hidden');
};
var onPicPageEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closePicPage();
  }
};
var onPicPageEnterPress = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closePicPage();
  }
};
var onPicPreviewClick = function (event) {
  event.preventDefault();
  var picturePageData = getPicturePreviewData(event);
  fillPicturePage(picturePageData);
  openPicPage();
};
var onPicPreviewEnterPress = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    openPicPage();
  }
};

var pictures = getPicturesData(PHOTOS_SUM);
var picturesGrid = createPicturesGrid(pictures);
document.querySelector('.pictures').appendChild(picturesGrid);
document.querySelector('.upload-overlay').classList.add('hidden');
// picturePage.classList.remove('hidden');
// fillPicturePage(pictures[0]);
var createdPicPreviews = document.querySelectorAll('.picture');
for (var i = 0; i < createdPicPreviews.length; i++) {
  createdPicPreviews[i].setAttribute('tabindex', 0);
  createdPicPreviews[i].addEventListener('click', onPicPreviewClick);
  createdPicPreviews[i].addEventListener('keydown', onPicPreviewEnterPress);
}

