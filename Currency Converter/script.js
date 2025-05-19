// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency-select');
const toCurrency = document.getElementById('to-currency-select');
const fromCurrencyDisplay = document.getElementById('from-currency');
const toCurrencyDisplay = document.getElementById('to-currency');
const swapBtn = document.getElementById('swap-currencies');
const resultContainer = document.getElementById('result-container');
const resultValue = document.getElementById('result-value');
const fromAmount = document.getElementById('from-amount');
const toAmount = document.getElementById('to-amount');
const rateInfo = document.getElementById('rate-info');
const lastUpdated = document.getElementById('last-updated');

// Exchange rate data
let exchangeRates = {};
let lastUpdateTime = null;

// Initialize the converter
async function initConverter() {
    await fetchExchangeRates();
    calculateConversion();
    setEventListeners();
}

// Fetch exchange rates from API
async function fetchExchangeRates() {
    try {
        // Note: In a real app, use a proper API with your API key
        // This is a mock response for demonstration
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        // Mock data if API fails (for demo purposes)
        if (!data || !data.rates) {
            console.log("Using mock data");
            exchangeRates = {
                USD: 1,
                EUR: 0.85,
                GBP: 0.73,
                JPY: 110.25,
                AUD: 1.35,
                CAD: 1.26,
                CNY: 6.45,
                INR: 74.50,
                PKR: 175.50,
                lastUpdated: new Date()
            };
        } else {
            exchangeRates = data.rates;
            exchangeRates.lastUpdated = new Date(data.time_last_updated * 1000);
        }
        
        updateLastUpdated();
        updateRateInfo();
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        // Fallback to mock data
        exchangeRates = {
            USD: 1,
            EUR: 0.85,
            GBP: 0.73,
            JPY: 110.25,
            AUD: 1.35,
            CAD: 1.26,
            CNY: 6.45,
            INR: 74.50,
            PKR: 175.50,
            lastUpdated: new Date()
        };
        updateLastUpdated();
        updateRateInfo();
    }
}

// Set event listeners
function setEventListeners() {
    amountInput.addEventListener('input', calculateConversion);
    fromCurrency.addEventListener('change', () => {
        fromCurrencyDisplay.value = fromCurrency.value;
        calculateConversion();
    });
    toCurrency.addEventListener('change', () => {
        toCurrencyDisplay.value = toCurrency.value;
        calculateConversion();
    });
    swapBtn.addEventListener('click', swapCurrencies);
}

// Calculate conversion
function calculateConversion() {
    const amount = parseFloat(amountInput.value) || 0;
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    // Convert to USD first (base currency)
    const amountInUSD = amount / exchangeRates[from];
    // Then convert to target currency
    const convertedAmount = amountInUSD * exchangeRates[to];
    
    // Display result
    resultValue.textContent = convertedAmount.toFixed(2);
    fromAmount.textContent = `${amount} ${from}`;
    toAmount.textContent = `${convertedAmount.toFixed(2)} ${to}`;
    
    // Show result container with animation
    resultContainer.classList.add('show');
    
    // Update rate info
    updateRateInfo();
}

// Swap currencies
function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    fromCurrencyDisplay.value = fromCurrency.value;
    toCurrencyDisplay.value = toCurrency.value;
    
    calculateConversion();
}

// Update rate information
function updateRateInfo() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const rate = (exchangeRates[to] / exchangeRates[from]).toFixed(6);
    rateInfo.textContent = `1 ${from} = ${rate} ${to}`;
}

// Update last updated time
function updateLastUpdated() {
    if (exchangeRates.lastUpdated) {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        lastUpdated.textContent = `Last updated: ${exchangeRates.lastUpdated.toLocaleDateString('en-US', options)}`;
    }
}

// Initialize the converter when page loads
document.addEventListener('DOMContentLoaded', initConverter);
