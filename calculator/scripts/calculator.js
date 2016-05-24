"use strict";
/**
 * core
 */

function calc(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  var result;

  switch (op) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
    default:
      result = NaN;
  }

  if (!isFinite(result) || isNaN(result))
    return "Invalid calculation";

  return result;
}



/**
 * UI
 */
window.addEventListener("load", function() {

  var _in = "", out = "", op = "";
  var input_elem = document.getElementById("input"),
     output_elem = document.getElementById("output");

  output_elem.innerHTML = "Welcome";

  document.addEventListener("click", function (ev) {
    if (ev.target.tagName.toLowerCase() !== "button") return;
    if (output_elem.innerHTML === "Welcome") output_elem.innerHTML = "";

    switch(ev.target.attributes.getNamedItem("class").value) {
      case "number":
        _in += ev.target.attributes.getNamedItem("value").value;
        break;

      case "operator":
        op = ev.target.attributes.getNamedItem("value").value;
        if (out === "") { out = _in; _in = ""; }
        break;

      case "command":
        var cmd = ev.target.attributes.getNamedItem("name").value;

        if (cmd === "key-c") {
          // clearing
          _in = "", out = "", op = "";
        } else {
          // result wanted
          if (op !== "") {
            // operator present -- calculate result
            _in = calc(out, _in, op), out = "", op = "";
          } else {
            // no operator present -- just show current input as output
            out = _in, _in = "";
          }
        }
        break;
    }

    //display the output
    input_elem.innerHTML = _in;
    output_elem.innerHTML = out + " " + op;
  });
});
