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
var STEP = 25;
var MIN_SIZE = 25;
var MAX_SIZE = 100;
var MAX_TAGS = 5;
var MAX_TAG_LENGTH = 21;
var MAX_COMMENTS_LENGTH = 100;

var picturePage = document.querySelector('.gallery-overlay');
var pictureTemplate = document.querySelector('#picture-template');
var picturePageClose = document.querySelector('.gallery-overlay-close');
var cropFormPage = document.querySelector('.upload-overlay');
var uploadElem = document.querySelector('#upload-select-image');
var uploadFile = uploadElem.querySelector('#upload-file');
var uploadForm = uploadElem.querySelector('.upload-image');
var cropFormCancel = document.querySelector('.upload-form-cancel');
var buttonSubmit = document.querySelector('#upload-submit');
var formComments = document.querySelector('.upload-form-description');
var formTags = document.querySelector('.upload-form-hashtags');
var resizeValue = document.querySelector('.upload-resize-controls-value');
var decImageSize = document.querySelector('.upload-resize-controls-button-dec');
var incImageSize = document.querySelector('.upload-resize-controls-button-inc');
var imageSize = document.querySelector('.effect-image-preview');
var effectControls = document.querySelector('.upload-effect-controls');
var uploadSelectImageForm = document.querySelector('#upload-select-image');
var uploadFormDescription = document.querySelector('.upload-form-description');

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

var openCropFrom = function () {
  cropFormPage.classList.remove('hidden');
  uploadForm.classList.add('hidden');
  cropFormCancel.addEventListener('click', onCropFormCancel);
  document.addEventListener('keydown', onCropFormEscPress);
  cropFormCancel.addEventListener('keydown', onCloseCropFormEnterPress);
  uploadFormDescription.addEventListener('focus', checkDescriptionFocus);
  uploadFormDescription.addEventListener('blur', checkDescriptionFocus);
};
var closeCropForm = function () {
  cropFormPage.classList.add('hidden');
  uploadForm.classList.remove('hidden');
  cropFormCancel.removeEventListener('click', onCropFormCancel);
  document.removeEventListener('keydown', onCropFormEscPress);
  cropFormCancel.removeEventListener('keydown', onCloseCropFormEnterPress);
  uploadFormDescription.removeEventListener('focus', checkDescriptionFocus);
  uploadFormDescription.removeEventListener('blur', checkDescriptionFocus);
};


var checkDescriptionFocus = function () {
  descriptionIsFocused = descriptionIsFocused ? descriptionIsFocused = false : descriptionIsFocused = true;
  return descriptionIsFocused;
};

var onUploadFile = function (event) {
  event.target.value = '';
  openCropFrom();
};
var onCropFormCancel = function () {
  closeCropForm();
};
var onCropFormEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    if (!descriptionIsFocused) {
      closeCropForm();
    }
  }
};
var onCloseCropFormEnterPress = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closeCropForm();
  }
};

var setFormSubmit = function () {
  uploadSelectImageForm.setAttribute('action', 'https://1510.dump.academy/kekstagram');
  uploadSelectImageForm.setAttribute('method', 'post');
  uploadSelectImageForm.setAttribute('enctype', 'multipart/form-data');
};
var setFormComments = function () {
  formComments.setAttribute('maxlength', MAX_COMMENTS_LENGTH);
};
var changeImageSize = function (direction) {
  var newSize = parseInt(resizeValue.value, 10) + STEP * direction;
  if (newSize >= MIN_SIZE && newSize <= MAX_SIZE) {
    resizeValue.value = newSize + '%';
    imageSize.style.transform = 'scale(' + newSize / 100 + ')';
  }
};

var changeImageEffect = function (effect) {
  imageSize.classList.remove(currentEffect);
  currentEffect = 'effect-' + effect.value;
  imageSize.classList.add(currentEffect);
};
var onEffectControlsClick = function () {
  var target = event.target;
  if (target.tagName.toLowerCase() === 'input') {
    changeImageEffect(target);
  }
};

var checkComments = function () {
  turnFormToNormal(formComments);
};
var checkTags = function () {
  turnFormToNormal(formTags);
  formTags.setCustomValidity('');
  if (formTags.value.length === 0) {
    return;
  }
  checkNumberSign();
};
var checkUnicTags = function (tagsList, j) {
  for (var i = 0; i < tagsList.length; i++) {
    if (tagsList[i] === tagsList[j] && i !== j) {
      formTags.setCustomValidity('Теги не должны повторяться');
      break;
    }
  }
};
var checkNumberSign = function () {
  var tagsList = formTags.value.match(/\#[a-zA-Zа-яА-Я0-9\-]+/g);
  if (tagsList === null) {
    formTags.setCustomValidity('Первый символ должен быть «#»');
  } else {
    if (tagsList.length > MAX_TAGS) {
      formTags.setCustomValidity('Максимум 5 тегов');
    }
    for (i = 0; i < tagsList.length; i++) {
      if (tagsList[i].length > MAX_TAG_LENGTH) {
        formTags.setCustomValidity('Максимум 20 символов в одном теге');
        return;
      }
      if (tagsList.length > 1) {
        checkUnicTags(tagsList, i);
      }
    }
  }
};

var turnFormToError = function (elem) {
  elem.style.border = '4px solid red';
};
var turnFormToNormal = function (elem) {
  elem.style.border = elem.styleBorderOrigin;
};

var onSubmitForm = function (event) {
  if (formComments.checkValidity() === false) {
    turnFormToError(formComments);
  }
  if (formTags.checkValidity() === false) {
    turnFormToError(formTags);
  }
};

var onFormSubmit = function () {
  resizeValue.value = 100 + '%';
  currentEffect = null;
  formTags.value = '';
  uploadFormDescription.value = '';
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

var descriptionIsFocused = false;
uploadFile.addEventListener('change', onUploadFile);
cropFormCancel.style.left = '90%'; // подвинул, чтобы кнопка влезала в экран
setFormComments();
effectControls.addEventListener('click', onEffectControlsClick);

var currentEffect = null;
resizeValue.value = 100 + '%';
decImageSize.addEventListener('click', function () {
  changeImageSize(-1);
});
incImageSize.addEventListener('click', function () {
  changeImageSize(1);
});

formTags.addEventListener('input', checkTags);
formComments.addEventListener('input', checkComments);
setFormSubmit();

formComments.styleBorderOrigin = formComments.style.border;
formTags.styleBorderOrigin = formTags.style.border;
buttonSubmit.addEventListener('click', onSubmitForm);

uploadSelectImageForm.addEventListener('submit', onFormSubmit);
