// DOM Elements
const billAmountInput = document.getElementById('bill-amount');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('custom-tip');
const splitCountInput = document.getElementById('split-count');
const tipAmountElement = document.getElementById('tip-amount');
const totalBillElement = document.getElementById('total-bill');
const perPersonElement = document.getElementById('per-person');

// Variables
let tipPercentage = 15;

// Event Listeners
billAmountInput.addEventListener('input', calculateTip);
splitCountInput.addEventListener('input', calculateTip);
customTipInput.addEventListener('input', handleCustomTip);

tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        tipPercentage = parseFloat(button.dataset.tip);
        customTipInput.value = '';
        calculateTip();
    });
});

// Functions
function calculateTip() {
    const billAmount = parseFloat(billAmountInput.value) || 0;
    const splitCount = parseInt(splitCountInput.value) || 1;

    const tipAmount = billAmount * (tipPercentage / 100);
    const totalBill = billAmount + tipAmount;
    const perPerson = totalBill / splitCount;

    updateResults(tipAmount, totalBill, perPerson);
}

function handleCustomTip() {
    const customTip = parseFloat(customTipInput.value);
    if (!isNaN(customTip) ){
        tipPercentage = customTip;
        tipButtons.forEach(btn => btn.classList.remove('active'));
        calculateTip();
    }
}

function updateResults(tipAmount, totalBill, perPerson) {
    tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
    totalBillElement.textContent = `$${totalBill.toFixed(2)}`;
    perPersonElement.textContent = `$${perPerson.toFixed(2)}`;
}

// Initialize with default values
calculateTip();
