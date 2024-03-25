document.addEventListener('DOMContentLoaded', (event) => {
    const inputField = document.querySelector('.calc input[type="text"]');
    const buttons = document.querySelectorAll('.calc button');
    const operators = ['+', '-', '*', '/', '%'];
    let currentOperation = null;
    let lastNumber = null;
    let operationSet = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            // Clear the input field
            if (value === 'AC') {
                inputField.value = '';
                lastNumber = null;
                currentOperation = null;
                operationSet = false;
                return;
            }

            // Delete the last character
            if (value === 'DEL') {
                inputField.value = inputField.value.slice(0, -1);
                if (operators.includes(inputField.value.slice(-1))) {
                    operationSet = true;
                } else {
                    operationSet = false;
                }
                return;
            }

            // Perform the calculation
            if (value === '=') {
                if (currentOperation && lastNumber !== null) {
                    const currentNumber = parseFloat(inputField.value.split(currentOperation).pop());
                    inputField.value += '=' + operate(lastNumber, currentNumber, currentOperation);
                    lastNumber = null;
                    currentOperation = null;
                    operationSet = false;
                }
                return;
            }

            // Save the operator and the last number
            if (operators.includes(value) && !operationSet) {
                lastNumber = parseFloat(inputField.value);
                currentOperation = value;
                inputField.value += value;
                operationSet = true;
                return;
            }

            // Append number to the input field
            if (!operators.includes(value)) {
                inputField.value += value;
                operationSet = false;
            }
        });
    });

    function operate(number1, number2, operator) {
        switch (operator) {
            case '+': return number1 + number2;
            case '-': return number1 - number2;
            case '*': return number1 * number2;
            case '/': return number1 / number2;
            case '%': return number1 % number2;
            default: return number2;
        }
    }
});

