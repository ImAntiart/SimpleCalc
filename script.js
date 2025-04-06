
const currentInput = document.querySelector(".currentInput");
const history = document.querySelector(".history");
const buttons = document.querySelectorAll(".calcButtons button, .clearButton");

let currentExpression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value >= "0" && value <= "9") {
      currentExpression += value;
      currentInput.textContent = currentExpression;

    } else if (value === ".") {
      const lastNumber = currentExpression.split(/[\+\-\*\/]/).pop(); 
      if (!lastNumber.includes(".")) {
        currentExpression += value;
        currentInput.textContent = currentExpression;
      }

    } else if (["+", "-", "*", "/"].includes(value)) {
      if (currentExpression === "") {
        return;
      }

      const lastChar = currentExpression.trim().slice(-1);
      if (["+", "-", "*", "/"].includes(lastChar)) {
        currentExpression =
          currentExpression.trim().slice(0, -1) + ` ${value} `;
      } else {
        currentExpression += ` ${value} `;
      }
      currentInput.textContent = currentExpression;

    } else if (value === "C") {
      currentExpression = "";
      currentInput.textContent = "0";

    } else if (value === "=") {
      try {
        if (!isNaN(currentExpression)) {
          return; 
        }

        const result = eval(currentExpression); 
        currentInput.textContent = result;
        history.innerHTML += `<div>${currentExpression} = ${result}</div>`;
        currentExpression = result.toString(); 
      } catch (error) {
        currentInput.textContent = "Error";
        currentExpression = "";
      }

    }
  });
});
