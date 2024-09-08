document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.input');
    let currentInput = '';
  
    // Function to handle button clicks
    function handleButtonClick(event) {
      const buttonValue = event.target ? event.target.textContent : event;

      if (buttonValue === 'AC') {
        // Clear everything
        currentInput = '';
        display.value = '';
      } else if (buttonValue === 'C') {
        // Clear current input
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
      } else if (buttonValue === '%') {
        // Handle percentage
        if (currentInput !== '') {
          currentInput = (parseFloat(currentInput) / 100).toString();
          display.value = currentInput;
        }
      } else if (buttonValue === '=') {
        // Evaluate expression
        evaluateExpression();
      } else if (['+', '-', '*', '/'].includes(buttonValue)) {
        // Add operator
        if (currentInput !== '' && !['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
          currentInput += ` ${buttonValue} `;
          display.value = currentInput;
        }
      } else if (buttonValue === '()') {
        // Add parentheses
        const openCount = (currentInput.match(/\(/g) || []).length;
        const closeCount = (currentInput.match(/\)/g) || []).length;
  
        if (openCount > closeCount) {
          currentInput += ')';
        } else {
          currentInput += '(';
        }
        display.value = currentInput;
      } else {
        // Append digit or dot
        currentInput += buttonValue;
        display.value = currentInput;
      }
    }
  
    // Function to evaluate the current expression
    function evaluateExpression() {
      try {
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
      } catch (e) {
        display.value = 'Error';
      }
    }
  
    // Function to handle keydown events
    function handleKeyDown(event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior of Enter key
        handleButtonClick('='); // Simulate the '=' button press
      } else if (['+', '-', '*', '/'].includes(event.key)) {
        // Add operator
        if (currentInput !== '' && !['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
          currentInput += ` ${event.key} `;
          display.value = currentInput;
        }
      } else if (event.key === 'Backspace') {
        // Clear current input
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
      } else if (event.key === 'Escape') {
        // Clear everything
        currentInput = '';
        display.value = '';
      } else if (event.key.match(/[0-9]/)) {
        // Append digit
        currentInput += event.key;
        display.value = currentInput;
      } else if (event.key === '.') {
        // Append dot
        currentInput += event.key;
        display.value = currentInput;
      } else if (event.key === '(') {
        // Add left parenthesis
        currentInput += '(';
        display.value = currentInput;
      } else if (event.key === ')') {
        // Add right parenthesis
        const openCount = (currentInput.match(/\(/g) || []).length;
        const closeCount = (currentInput.match(/\)/g) || []).length;
  
        if (openCount > closeCount) {
          currentInput += ')';
          display.value = currentInput;
        }
      }
    }
  
    // Attach event listeners to all buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });
  
    // Attach keydown event listener to the document
    document.addEventListener('keydown', handleKeyDown);
});



