"use strict";
/**
 * core
 */


// registers
var a = null;
var b = null;
var op = null;

// Calculates the result of the numbers a and b using the operator
// op. Result is stored back into a. For invalid calculations, an Error is
// raised.
//
//
// Supported operators: + - * /
function calc() {
  var result;

  // check input
  if (a === null || b === null || op === null)
    throw new Error("Invalid calculation");


  // NOTE: Due to moving a number from one register to the other, eventually b
  // is the first number entered, and a is the second.
  switch (op) {
    case "+":
      result = b + a;
      break;
    case "-":
      result = b - a;
      break;
    case "*":
      result = b * a;
      break;
    case "/":
      result = b / a;
      break;
    default:
      result = NaN;
  }

  if (!isFinite(result) || isNaN(result))
    throw new Error("Invalid calculation");

  // update registers
  a = result, b = op = null;
}

function append_digit(d) {
  a = (a !== null ? a : "") + String(d);
  a = parseFloat(a);
}

// Sets the operator. Moves content of a to b if it was set.
function set_op(_op) {
  op = _op;

  // Iff a is set, move it to the first line of the display.
  if (a && !b) b = a, a = null;
}

// Clears the registers.
function clear() {
  a = b = op = null;
}



/**
 * UI
 */

(function() {
  var error;

  // Redraws the display.
  function display(greeting) {
    var first_line;
    var second_line;

    if (error) {
      first_line = error;
    } else if (greeting) {
      first_line = greeting;
    } else {
      first_line = b !== null ? b : "";
      if (op !== null) first_line += " " + op;
    }
    second_line = a !== null ? a : "";

    document.getElementById("output").innerHTML = first_line;
    document.getElementById("input").innerHTML = second_line;
  }

  // Appends the digit pressed.
  function digit_pressed(ev) {
    var digit = parseFloat(ev.target.value);
    append_digit(digit);
  }

  // Registers the operator pressed.
  function operator_pressed(event) {
    set_op(event.target.value);
  }

  // Calculates result using the registers and saves it back into the registers
  // to be shown.
  function equal_pressed() {
    // without an operator, this is a no-op
    if (!op) return;

    try {
      calc();
    } catch(ex) {
      error = ex.message;
    }
  }

  function c_pressed() {
    clear();
    error = null;
  }

  document.addEventListener("DOMContentLoaded", function() {
    var i, buttons;

    // subscribe to events for digits clicked
    buttons = document.querySelectorAll("button.number");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", digit_pressed);
    }

    // subscribe to events for operators clicked
    buttons = document.querySelectorAll("button.operator");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", operator_pressed);
    }

    // subscribe to events for commands clicked
    document.getElementById("key-c").addEventListener("click", c_pressed);
    document.getElementById("key-=").addEventListener("click", equal_pressed);

    // redraw the display on any button clicked
    buttons = document.querySelectorAll("button");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function() { display() });
    }

    // show greeting
    display("Welcome");
  });
})();
