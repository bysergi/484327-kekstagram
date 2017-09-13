'use strict';

window.picPreview = (function () {
  var pictureTemplate = document.querySelector('#picture-template');

  return {
    createPicturesGrid: function (pictures) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pictures.length; i++) {
        var template = pictureTemplate.content.cloneNode(true);
        template.querySelector('img').src = pictures[i].url;
        template.querySelector('.picture-likes').textContent = pictures[i].likes;
        template.querySelector('.picture-comments').textContent = pictures[i].comments;
        fragment.appendChild(template);
      }
      return fragment;
    }
  };
})();
