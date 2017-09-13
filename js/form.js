'use strict';

window.form = (function () {
  var STEP = 25;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;
  var MAX_TAGS = 5;
  var MAX_TAG_LENGTH = 21;
  var MAX_COMMENTS_LENGTH = 100;

  var uploadElem = document.querySelector('#upload-select-image');
  var cropFormPage = document.querySelector('.upload-overlay');
  var uploadForm = uploadElem.querySelector('.upload-image');
  var uploadFile = uploadElem.querySelector('#upload-file');
  var cropFormCancel = document.querySelector('.upload-form-cancel');
  var effectControls = document.querySelector('.upload-effect-controls');
  var uploadFormDescription = document.querySelector('.upload-form-description');
  var formTags = document.querySelector('.upload-form-hashtags');
  var buttonSubmit = document.querySelector('#upload-submit');
  var formComments = document.querySelector('.upload-form-description');
  var resizeValue = document.querySelector('.upload-resize-controls-value');
  var decImageSize = document.querySelector('.upload-resize-controls-button-dec');
  var incImageSize = document.querySelector('.upload-resize-controls-button-inc');
  var imageSize = document.querySelector('.effect-image-preview');
  var uploadSelectImageForm = document.querySelector('#upload-select-image');

  formComments.styleBorderOrigin = formComments.style.border;
  formTags.styleBorderOrigin = formTags.style.border;

  // Открытие/закрытие модуля

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


  // Валидация

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
      for (var i = 0; i < tagsList.length; i++) {
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


  // Проверка на фокус

  var checkDescriptionFocus = function () {
    descriptionIsFocused = descriptionIsFocused ? descriptionIsFocused = false : descriptionIsFocused = true;
    return descriptionIsFocused;
  };


  // Изменение фильтра

  var changeImageEffect = function (effect) {
    imageSize.classList.remove(currentEffect);
    currentEffect = 'effect-' + effect.value;
    imageSize.classList.add(currentEffect);
  };


  // Изменение размера

  var changeImageSize = function (direction) {
    var newSize = parseInt(resizeValue.value, 10) + STEP * direction;
    if (newSize >= MIN_SIZE && newSize <= MAX_SIZE) {
      resizeValue.value = newSize + '%';
      imageSize.style.transform = 'scale(' + newSize / 100 + ')';
    }
  };


  // Изменение бордера при ошибке

  var turnFormToError = function (elem) {
    elem.style.border = '4px solid red';
  };
  var turnFormToNormal = function (elem) {
    elem.style.border = elem.styleBorderOrigin;
  };


  // Сброс значений

  var resetForm = function () {
    resizeValue.value = 100 + '%';
    currentEffect = null;
    formTags.value = '';
    uploadFormDescription.value = '';
  };


  // Настройки сервера

  var setFormSubmit = function () {
    uploadSelectImageForm.setAttribute('action', 'https://1510.dump.academy/kekstagram');
    uploadSelectImageForm.setAttribute('method', 'post');
    uploadSelectImageForm.setAttribute('enctype', 'multipart/form-data');
  };


  // Ограничение комментария

  var setFormComments = function () {
    formComments.setAttribute('maxlength', MAX_COMMENTS_LENGTH);
  };


  // Обработчики

  var onUploadFile = function (event) {
    resetForm();
    openCropFrom();
  };
  var onCropFormCancel = function () {
    closeCropForm();
  };
  var onCropFormEscPress = function (event) {
    if (event.keyCode === window.utils.KEY_CODES.ESC) {
      if (!descriptionIsFocused) {
        closeCropForm();
      }
    }
  };
  var onCloseCropFormEnterPress = function (event) {
    if (event.keyCode === window.utils.KEY_CODES.ENTER) {
      closeCropForm();
    }
  };
  var onEffectControlsClick = function () {
    var target = event.target;
    if (target.tagName.toLowerCase() === 'input') {
      changeImageEffect(target);
    }
  };
  var onSubmitForm = function (event) {
    if (formComments.checkValidity() === false) {
      turnFormToError(formComments);
    }
    if (formTags.checkValidity() === false) {
      turnFormToError(formTags);
    }
  };


  // Программа

  var descriptionIsFocused = false;
  var currentEffect = null;

  document.querySelector('.upload-overlay').classList.add('hidden');
  cropFormCancel.style.left = '90%'; // подвинул, чтобы кнопка влезала в экран

  setFormSubmit();
  setFormComments();

  uploadFile.addEventListener('change', onUploadFile);
  effectControls.addEventListener('click', onEffectControlsClick);
  formTags.addEventListener('input', checkTags);
  formComments.addEventListener('input', checkComments);
  buttonSubmit.addEventListener('click', onSubmitForm);
  // uploadSelectImageForm.addEventListener('submit', onFormSubmit);

  resizeValue.value = 100 + '%';
  decImageSize.addEventListener('click', function () {
    changeImageSize(-1);
  });
  incImageSize.addEventListener('click', function () {
    changeImageSize(1);
  });

})();
