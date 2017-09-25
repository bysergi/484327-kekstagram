'use strict';

(function (elem) {
  window.initScale = function (element, callback) {
    document.querySelector('.upload-resize-controls-button-dec').addEventListener('click', function () {
      callback(element, -1);
    });
    document.querySelector('.upload-resize-controls-button-inc').addEventListener('click', function () {
      callback(element, 1);
    });
  };
})();

