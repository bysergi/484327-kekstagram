'use strict';

(function () {
  window.initFilters = function (callback) {
    document.querySelector('.upload-effect-controls').addEventListener('click', function () {
      var target = event.target;
      if (target.tagName.toLowerCase() === 'input') {
        callback(target);
      }
    });
  };
})();
