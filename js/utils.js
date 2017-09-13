'use strict';

window.utils = (function () {
  return {
    KEYCODES: {
      ESCAPE: 27,
      ENTER: 13
    },
    getRandomBoolean: function () {
      return Math.random() >= 0.5;
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
