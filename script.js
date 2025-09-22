// Get elements
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const resultDisplay = document.getElementById('result');
const errorMessage = document.getElementById('errorMessage');

// Add enter key support
num1Input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        num2Input.focus();
    }
});

num2Input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculate('+');
    }
});

// Clear placeholder on focus
num1Input.addEventListener('focus', function() {
    if (this.value === '') {
        this.placeholder = '';
    }
});

num1Input.addEventListener('blur', function() {
    if (this.value === '') {
        this.placeholder = 'Masukkan angka pertama';
    }
});

num2Input.addEventListener('focus', function() {
    if (this.value === '') {
        this.placeholder = '';
    }
});

num2Input.addEventListener('blur', function() {
    if (this.value === '') {
        this.placeholder = 'Masukkan angka kedua';
    }
});

function calculate(operation) {
    // Get values
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    
    // Clear previous error
    errorMessage.classList.remove('show');
    
    // Validate inputs
    if (isNaN(num1) || isNaN(num2)) {
        showError('Input valid.harap masukan angka yang benar !');
        return;
    }
    
    let result;
    let operationSymbol;
    
    // Perform calculation
    switch(operation) {
        case '+':
            result = num1 + num2;
            operationSymbol = '+';
            break;
        case '-':
            result = num1 - num2;
            operationSymbol = '−';
            break;
        case '*':
            result = num1 * num2;
            operationSymbol = '×';
            break;
        case '/':
            if (num2 === 0) {
                showError('Tidak bisa membagi dengan nol!');
                return;
            }
            result = num1 / num2;
            operationSymbol = '÷';
            break;
    }
    
    // Format result
    if (result % 1 !== 0) {
        result = result.toFixed(2);
    }
    
    // Hide result display temporarily to show error if needed
    resultDisplay.style.opacity = '1';
    
    // Animate result change
    resultDisplay.style.transform = 'scale(0.8)';
    resultDisplay.style.opacity = '0.5';
    
    setTimeout(() => {
        resultDisplay.textContent = result;
        resultDisplay.style.transform = 'scale(1)';
        resultDisplay.style.opacity = '1';
    }, 200);
}

function clearAll() {
    num1Input.value = '';
    num2Input.value = '';
    resultDisplay.textContent = '0';
    errorMessage.classList.remove('show');
    
    // Restore placeholders
    num1Input.placeholder = 'Masukkan angka pertama';
    num2Input.placeholder = 'Masukkan angka kedua';
    
    // Add animation
    resultDisplay.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        resultDisplay.style.transform = 'rotate(0deg)';
    }, 300);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    // Hide result display when showing error
    resultDisplay.style.opacity = '0.3';
    
    // Shake animation for error
    errorMessage.style.animation = 'shake 0.5s';
    setTimeout(() => {
        errorMessage.style.animation = '';
    }, 500);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);