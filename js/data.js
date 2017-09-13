'use strict';

window.data = (function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];


  var picturePage = document.querySelector('.gallery-overlay');

  return {
    getComments: function () {
      var randomComments = [];
      var isNeedTwoComment = window.utils.getRandomBoolean();
      randomComments.push(COMMENTS[window.utils.getRandomInt(0, COMMENTS.length)]);
      if (isNeedTwoComment) {
        randomComments.push(COMMENTS[window.utils.getRandomInt(0, COMMENTS.length)]);
      }
      return randomComments;
    },

    getPicturesData: function (num) {
      var pictures = [];
      for (var i = 1; i < num + 1; i++) {
        var pictureData = {
          url: 'photos/' + i + '.jpg',
          likes: window.utils.getRandomInt(15, 200),
          comments: window.data.getComments()
        };
        pictures.push(pictureData);
      }
      return pictures;
    },

    fillPicturePage: function (picturePreview) {
      picturePage.querySelector('.gallery-overlay-image').src = picturePreview.url;
      picturePage.querySelector('.likes-count').textContent = picturePreview.likes;
      picturePage.querySelector('.comments-count').textContent = picturePreview.comments.length;
    },

    getPicturePreviewData: function (event) {
      var PicturePreviewData = {
        url: event.currentTarget.children[0].getAttribute('src'),
        likes: event.currentTarget.querySelector('.picture-likes').textContent,
        comments: event.currentTarget.querySelector('.picture-comments').textContent
      };
      return PicturePreviewData;
    }
  };
})();
