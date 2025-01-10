let currInput = "";
let previousInput = "";
let operator = "";
let resetDisplay = false;

const screen = document.querySelector("#display-screen");
const operands = document.querySelectorAll(".operand-btn");
const operators = document.querySelectorAll(".operator-btn");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");

function handleInput(input) {
  if (isNumber(input)) {
    displayOperand(input);
  } else if (isOperator(input)) {
    setOperator(input);
  } else if (input === "=") {
    operate();
  } else if (input === "AC") {
    clear();
  } else if (input === "DEL") {
    backspace();
  } else if (input === ".") {
    appendDecimal();
  }
}

function isNumber(value) {
  return !isNaN(value) && value !== " ";
}

function isOperator(value) {
  return ["+", "-", "x", "/"].includes(value);
}

function setOperator(op) {
  if (operator) operate();
  previousInput = currInput;
  operator = op;
  resetDisplay = true;
}

function appendDecimal() {
  if (!screen.textContent.includes(".")) {
    screen.textContent += ".";
  }
  currInput = screen.textContent;
}

function clear() {
  screen.textContent = "0";
  currInput = "";
  previousInput = "";
  operator = "";
  resetDisplay = false;
}

function backspace() {
  screen.textContent = screen.textContent.slice(0, -1) || "0";
  currInput = screen.textContent;
}

function displayOperand(value) {
  if (resetDisplay) {
    screen.textContent = value;
    resetDisplay = false;
  } else {
    screen.textContent =
      screen.textContent === "0" ? value : screen.textContent + value;
  }
  currInput = screen.textContent;
}

function operate() {
  if (!operator || !previousInput) return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currInput);
  let result = 0;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "x":
      result = prev * curr;
      break;
    case "/":
      result = curr !== 0 ? prev / curr : "Error";
      break;
  }
  screen.textContent = result;
  currInput = result.toString();
  operator = "";
  resetDisplay = true;
}

operands.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleInput(btn.dataset.operand);
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleInput(btn.dataset.operator);
  });
});

clearBtn.addEventListener("click", () => {
  handleInput(clearBtn.dataset.clear);
});

deleteBtn.addEventListener("click", () => {
  handleInput(deleteBtn.dataset.delete);
});

document.addEventListener("keydown", handleKeyPress);

document.addEventListener("keydown", (e) => {
  if (["Enter", "Backspace"].includes(e.key)) {
    event.preventDefault();
  }
});

function handleKeyPress(event) {
  const key = event.key;

  if (isNumber(key)) {
    displayOperand(key);
  } else if (isOperator(key)) {
    setOperator(key);
  } else if (key === "Enter" || key === "=") {
    operate();
  } else if (key === "Escape") {
    clear();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === ".") {
    appendDecimal();
  }
}
