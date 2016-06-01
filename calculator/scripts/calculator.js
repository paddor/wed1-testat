"use strict";
/**
 * core
 */

// Calculates and returns the result of the numbers a and b using the operator
// op. For invalid calculations, an Error is raised.
//
// Supported operators: + - * /
// Returns the result.
function calc(a, b, op) {
  var result;
  a = parseFloat(a);
  b = parseFloat(b);

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
    throw new Error("Invalid calculation");

  return result;
}



/**
 * UI
 */

(function() {
  // registers
  var _in = "";
  var out = "Welcome"; // greeting
  var op = "";

  // Redraws the display.
  function display() {
    document.getElementById("output").innerHTML = out + " " + op;
    document.getElementById("input").innerHTML = _in;
  }

  // Appends the number pressed.
  function number_pressed(ev) {
    _in += ev.target.value;
  }

  // Registers the operator pressed.
  function operator_pressed(ev) {
    op = ev.target.value;

    // If this was the first number, move it to the first line of the display.
    if (out === "") {
      out = _in;
      _in = "";
    }
  }

  // Clears the display.
  function clear() {
    _in = "";
    out = "";
    op = "";
  }

  // Calculates result using the registers and saves it back into the registers
  // to be shown.
  function equal_pressed() {
    // without an operator, this is a no-op
    if (op === "") return;

    try {
      _in = calc(out, _in, op);
      out = "";
    } catch(ex) {
      out = ex.message;
    } finally {
      op = "";
    }
  }

  // Removes the greeting.
  function remove_greeting() {
    // unsubscribe to reduce cycles wasted
    var i, buttons;
    buttons = document.querySelectorAll("button");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].removeEventListener("click", remove_greeting);
    }

    // remove greeting
    out = "";
  }

  document.addEventListener("DOMContentLoaded", function() {
    var i, buttons;
    display(); // show greeting

    /*
     * NOTE: This relies on DOM Level 3 Events, namely the correct order of
     * firing them, which is well supported in common browsers.
     */

    // remove greeting on any button clicked
    buttons = document.querySelectorAll("button");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", remove_greeting);
    }

    // subscribe to events for numbers clicked
    buttons = document.querySelectorAll("button.number");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", number_pressed);
    }

    // subscribe to events for operators clicked
    buttons = document.querySelectorAll("button.operator");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", operator_pressed);
    }

    // subscribe to events for commands clicked
    document.getElementById("key-c").addEventListener("click", clear);
    document.getElementById("key-=").addEventListener("click", equal_pressed);

    // redraw the display on any button clicked
    buttons = document.querySelectorAll("button");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", display);
    }
  });
})();
