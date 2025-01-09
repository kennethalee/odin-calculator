let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let currentOperand = "";

const screen = document.querySelector("#display-screen");
const operands = document.querySelectorAll(".operand-btn");
const operators = document.querySelectorAll(".operator-btn");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");

operands.forEach((btn) => {
  btn.addEventListener("click", () => displayOperand(btn.dataset.operand));
});

operators.forEach((btn) => {
  btn.addEventListener("click", () => displayOperand(btn.dataset.operator));
});

clearBtn.addEventListener("click", () => {
  screen.textContent = "";
  currentOperand = "";
});

deleteBtn.addEventListener("click", () => {
  screen.textContent = screen.textContent.slice(0, -1);
  currentOperand = screen.textContent;
});

function displayOperand(value) {
  currentOperand += value;
  screen.textContent = currentOperand;
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) {
        return null;
      } else {
        return divide(a, b);
      }
    default:
      return null;
  }
}
