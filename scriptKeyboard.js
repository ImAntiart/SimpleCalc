
document.addEventListener("keydown", (event) => {
    const key = event.key;
  
    if (key >= "0" && key <= "9") {
      currentExpression += key;
      currentInput.textContent = currentExpression;
  
    } else if (key === ".") {
      const lastNumber = currentExpression.split(/[\+\-\*\/]/).pop();
      if (!lastNumber.includes(".")) {
        currentExpression += key;
        currentInput.textContent = currentExpression;
      }
  
    } else if (["+", "-", "*", "/"].includes(key)) {
      if (currentExpression === "") {
        return;
      }
  
      const lastChar = currentExpression.trim().slice(-1);
      if (["+", "-", "*", "/"].includes(lastChar)) {
        currentExpression =
          currentExpression.trim().slice(0, -1) + ` ${key} `;
      } else {
        currentExpression += ` ${key} `;
      }
      currentInput.textContent = currentExpression;
  
    } else if (key === "Enter") {
      try {
        if (!isNaN(currentExpression)) {
          return;
        }
  
        const lastChar = currentExpression.trim().slice(-1);
        if (["+", "-", "*", "/"].includes(lastChar)) {
          currentInput.textContent = "Error";
          return;
        }
  
        const result = eval(currentExpression);
        if (!isFinite(result)) {
          currentInput.textContent = "Error";
          currentExpression = "";
          return;
        }
  
        currentInput.textContent = result;
        history.innerHTML += `<div>${currentExpression} = ${result}</div>`;
        currentExpression = result.toString();
      } catch (error) {
        currentInput.textContent = "Error";
        currentExpression = "";
      }
  
    } else if (key === "Backspace") {
      currentExpression = currentExpression.slice(0, -1);
      currentInput.textContent = currentExpression || "0";
  
    } else if (key === "Escape") {
      currentExpression = "";
      currentInput.textContent = "0";
    }
  });