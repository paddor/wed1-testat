'use strict';
(function() {
  window.addEventListener('DOMContentLoaded', function() {
    var font_slider = document.getElementById('font-slider');
    var font_size_output = document.getElementById('font-size');
    var font_size_form = document.getElementById('font-size-form');

    font_size_form.addEventListener('change', function() {
      // get desired size
      var new_size = font_slider.value / 10;

      // change font size on root element
      document.body.style.fontSize = new_size + 'rem';

      // show new value
      font_size_output.innerHTML = new_size;
    });
  });
})();
