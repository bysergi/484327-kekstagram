'use strict';

window.picPage = (function () {
  var picturePageClose = document.querySelector('.gallery-overlay-close');
  var picturePage = document.querySelector('.gallery-overlay');

  var onPicPageClose = function () {
    picturePage.classList.add('hidden');
  };
  var onPicPageEscPress = function (event) {
    if (event.keyCode === window.utils.KEYCODES.ESC) {
      window.preview.closePicPage();
    }
  };
  var onPicPageEnterPress = function (event) {
    if (event.keyCode === window.utils.KEYCODES.ENTER) {
      window.picPage.closePicPage();
    }
  };

  return {

    openPicPage: function () {
      picturePage.classList.remove('hidden');
      picturePageClose.setAttribute('tabindex', 0);
      picturePageClose.addEventListener('click', onPicPageClose);
      document.addEventListener('keydown', onPicPageEscPress);
      picturePageClose.addEventListener('keydown', onPicPageEnterPress);
    },
    closePicPage: function () {
      picturePage.classList.add('hidden');
      picturePageClose.removeEventListener('click', onPicPageClose);
      document.removeEventListener('keydown', onPicPageEscPress);
      picturePageClose.removeEventListener('keydown', onPicPageEnterPress);
    },
    onPicPreviewClick: function (event) {
      event.preventDefault();
      var picturePageData = window.data.getPicturePreviewData(event);
      window.data.fillPicturePage(picturePageData);
      window.picPage.openPicPage();
    },
    onPicPreviewEnterPress: function (event) {
      if (event.keyCode === window.utils.KEYCODES.ENTER) {
        window.picPage.openPicPage();
      }
    }

  };
})();
