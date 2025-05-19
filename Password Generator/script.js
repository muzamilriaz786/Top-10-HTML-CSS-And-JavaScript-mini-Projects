// DOM Elements
const passwordOutput = document.getElementById('password-output');
const copyBtn = document.getElementById('copy-btn');
const tooltip = document.getElementById('tooltip');
const lengthSlider = document.getElementById('length-slider');
const lengthInput = document.getElementById('password-length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const strengthBar = document.getElementById('strength-bar');

// Character sets
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Sync length inputs
lengthSlider.addEventListener('input', () => {
    lengthInput.value = lengthSlider.value;
    generatePassword();
});

lengthInput.addEventListener('input', () => {
    lengthSlider.value = lengthInput.value;
    generatePassword();
});

// Generate password when settings change
[uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach(checkbox => {
    checkbox.addEventListener('change', generatePassword);
});

// Generate password on button click
generateBtn.addEventListener('click', generatePassword);

// Copy password to clipboard
copyBtn.addEventListener('click', () => {
    if (!passwordOutput.value) return;
    
    navigator.clipboard.writeText(passwordOutput.value).then(() => {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
    });
});

// Generate password function
       // Generate password function
       function generatePassword() {
    let charset = '';
    let password = '';

    // Build character set based on selected options
    if (uppercaseCheckbox.checked) charset += uppercaseChars;
    if (lowercaseCheckbox.checked) charset += lowercaseChars;
    if (numbersCheckbox.checked) charset += numberChars;
    if (symbolsCheckbox.checked) charset += symbolChars;

    // If no character sets selected, use all
    if (charset === '') {
        charset = uppercaseChars + lowercaseChars + numberChars + symbolChars;
        uppercaseCheckbox.checked = true;
        lowercaseCheckbox.checked = true;
        numbersCheckbox.checked = true;
        symbolsCheckbox.checked = true;
    }

    const length = parseInt(lengthInput.value);

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    passwordOutput.value = password;
    updateStrengthBar(password);
}

// Update strength bar function
function updateStrengthBar(password) {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (password.length >= 12) strength++;

    const width = (strength / 5) * 100;
    strengthBar.style.width = width + '%';

    // Change color based on strength
    if (width < 40) {
        strengthBar.style.backgroundColor = 'var(--danger)';
    } else if (width < 70) {
        strengthBar.style.backgroundColor = 'orange';
    } else {
        strengthBar.style.backgroundColor = 'var(--success)';
    }
}

// Initial password generation on page load
generatePassword();

