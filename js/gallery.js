'use strict';

window.gallery = (function () {
  var PHOTOS_SUM = 26;
  var pictures = window.data.getPicturesData(PHOTOS_SUM);

  document.querySelector('.pictures').appendChild(window.picPreview.createPicturesGrid(pictures));

  var createdPicPreviews = document.querySelectorAll('.picture');
  for (var i = 0; i < createdPicPreviews.length; i++) {
    createdPicPreviews[i].setAttribute('tabindex', 0);
    createdPicPreviews[i].addEventListener('click', window.picPage.onPicPreviewClick);
    createdPicPreviews[i].addEventListener('keydown', window.picPage.onPicPreviewEnterPress);
  }
})();
