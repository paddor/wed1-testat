'use strict';
window.addEventListener('load', function () {
  var fontSlider = document.getElementById('font-slider');
  document.getElementById('font-size-form').addEventListener('change', function () {
    // get desired size
    var fontSize = (fontSlider.valueOf().value)/10;

    // change font size on root element
    document.getElementsByTagName("html")[0].style.fontSize = fontSize + 'rem';

    // show new value
    document.getElementById('font-size').innerHTML = fontSize;
  });
});
