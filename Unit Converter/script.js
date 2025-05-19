// Conversion data
const conversionData = {
    length: {
        units: [
            { name: "Meter", symbol: "m", factor: 1 },
            { name: "Kilometer", symbol: "km", factor: 1000 },
            { name: "Centimeter", symbol: "cm", factor: 0.01 },
            { name: "Millimeter", symbol: "mm", factor: 0.001 },
            { name: "Inch", symbol: "in", factor: 0.0254 },
            { name: "Foot", symbol: "ft", factor: 0.3048 },
            { name: "Yard", symbol: "yd", factor: 0.9144 },
            { name: "Mile", symbol: "mi", factor: 1609.34 }
        ],
        popular: [
            { from: "cm", to: "in", text: "Centimeters to Inches" },
            { from: "m", to: "ft", text: "Meters to Feet" },
            { from: "km", to: "mi", text: "Kilometers to Miles" },
            { from: "in", to: "cm", text: "Inches to Centimeters" },
            { from: "ft", to: "cm", text: "Feet to Centimeters" },
            { from: "mi", to: "km", text: "Miles to Kilometers" }
        ]
    },
    weight: {
        units: [
            { name: "Gram", symbol: "g", factor: 1 },
            { name: "Kilogram", symbol: "kg", factor: 1000 },
            { name: "Milligram", symbol: "mg", factor: 0.001 },
            { name: "Pound", symbol: "lb", factor: 453.592 },
            { name: "Ounce", symbol: "oz", factor: 28.3495 },
            { name: "Ton", symbol: "t", factor: 1000000 }
        ],
        popular: [
            { from: "kg", to: "lb", text: "Kilograms to Pounds" },
            { from: "g", to: "oz", text: "Grams to Ounces" },
            { from: "lb", to: "kg", text: "Pounds to Kilograms" },
            { from: "oz", to: "g", text: "Ounces to Grams" },
            { from: "t", to: "kg", text: "Tons to Kilograms" },
            { from: "kg", to: "g", text: "Kilograms to Grams" }
        ]
    },
    temperature: {
        units: [
            { name: "Celsius", symbol: "°C", isTemperature: true },
            { name: "Fahrenheit", symbol: "°F", isTemperature: true },
            { name: "Kelvin", symbol: "K", isTemperature: true }
        ],
        popular: [
            { from: "°C", to: "°F", text: "Celsius to Fahrenheit" },
            { from: "°F", to: "°C", text: "Fahrenheit to Celsius" },
            { from: "°C", to: "K", text: "Celsius to Kelvin" },
            { from: "K", to: "°C", text: "Kelvin to Celsius" },
            { from: "°F", to: "K", text: "Fahrenheit to Kelvin" },
            { from: "K", to: "°F", text: "Kelvin to Fahrenheit" }
        ]
    },
    area: {
        units: [
            { name: "Square Meter", symbol: "m²", factor: 1 },
            { name: "Square Kilometer", symbol: "km²", factor: 1000000 },
            { name: "Square Centimeter", symbol: "cm²", factor: 0.0001 },
            { name: "Square Millimeter", symbol: "mm²", factor: 0.000001 },
            { name: "Square Inch", symbol: "in²", factor: 0.00064516 },
            { name: "Square Foot", symbol: "ft²", factor: 0.092903 },
            { name: "Square Yard", symbol: "yd²", factor: 0.836127 },
            { name: "Square Mile", symbol: "mi²", factor: 2589988.11 },
            { name: "Acre", symbol: "ac", factor: 4046.86 },
            { name: "Hectare", symbol: "ha", factor: 10000 }
        ],
        popular: [
            { from: "m²", to: "ft²", text: "Square Meters to Square Feet" },
            { from: "km²", to: "mi²", text: "Square Kilometers to Square Miles" },
            { from: "ha", to: "ac", text: "Hectares to Acres" },
            { from: "ft²", to: "m²", text: "Square Feet to Square Meters" },
            { from: "ac", to: "ha", text: "Acres to Hectares" },
            { from: "mi²", to: "km²", text: "Square Miles to Square Kilometers" }
        ]
    },
    volume: {
        units: [
            { name: "Liter", symbol: "L", factor: 1 },
            { name: "Milliliter", symbol: "mL", factor: 0.001 },
            { name: "Cubic Meter", symbol: "m³", factor: 1000 },
            { name: "Cubic Centimeter", symbol: "cm³", factor: 0.001 },
            { name: "Cubic Inch", symbol: "in³", factor: 0.0163871 },
            { name: "Cubic Foot", symbol: "ft³", factor: 28.3168 },
            { name: "Gallon (US)", symbol: "gal", factor: 3.78541 },
            { name: "Quart (US)", symbol: "qt", factor: 0.946353 },
            { name: "Pint (US)", symbol: "pt", factor: 0.473176 },
            { name: "Cup (US)", symbol: "cup", factor: 0.236588 },
            { name: "Fluid Ounce (US)", symbol: "fl oz", factor: 0.0295735 }
        ],
        popular: [
            { from: "L", to: "gal", text: "Liters to Gallons" },
            { from: "mL", to: "fl oz", text: "Milliliters to Fluid Ounces" },
            { from: "gal", to: "L", text: "Gallons to Liters" },
            { from: "fl oz", to: "mL", text: "Fluid Ounces to Milliliters" },
            { from: "m³", to: "ft³", text: "Cubic Meters to Cubic Feet" },
            { from: "ft³", to: "m³", text: "Cubic Feet to Cubic Meters" }
        ]
    },
    time: {
        units: [
            { name: "Second", symbol: "s", factor: 1 },
            { name: "Millisecond", symbol: "ms", factor: 0.001 },
            { name: "Minute", symbol: "min", factor: 60 },
            { name: "Hour", symbol: "hr", factor: 3600 },
            { name: "Day", symbol: "day", factor: 86400 },
            { name: "Week", symbol: "wk", factor: 604800 },
            { name: "Month", symbol: "mo", factor: 2629800 },
            { name: "Year", symbol: "yr", factor: 31557600 }
        ],
        popular: [
            { from: "hr", to: "min", text: "Hours to Minutes" },
            { from: "day", to: "hr", text: "Days to Hours" },
            { from: "wk", to: "day", text: "Weeks to Days" },
            { from: "min", to: "s", text: "Minutes to Seconds" },
            { from: "mo", to: "wk", text: "Months to Weeks" },
            { from: "yr", to: "mo", text: "Years to Months" }
        ]
    },
    data: {
        units: [
            { name: "Bit", symbol: "b", factor: 1 },
            { name: "Byte", symbol: "B", factor: 8 },
            { name: "Kilobit", symbol: "Kb", factor: 1000 },
            { name: "Kilobyte", symbol: "KB", factor: 8000 },
            { name: "Megabit", symbol: "Mb", factor: 1000000 },
            { name: "Megabyte", symbol: "MB", factor: 8000000 },
            { name: "Gigabit", symbol: "Gb", factor: 1000000000 },
            { name: "Gigabyte", symbol: "GB", factor: 8000000000 },
            { name: "Terabit", symbol: "Tb", factor: 1000000000000 },
            { name: "Terabyte", symbol: "TB", factor: 8000000000000 }
        ],
        popular: [
            { from: "KB", to: "B", text: "Kilobytes to Bytes" },
            { from: "MB", to: "KB", text: "Megabytes to Kilobytes" },
            { from: "GB", to: "MB", text: "Gigabytes to Megabytes" },
            { from: "B", to: "b", text: "Bytes to Bits" },
            { from: "Mb", to: "Kb", text: "Megabits to Kilobits" },
            { from: "GB", to: "Gb", text: "Gigabytes to Gigabits" }
        ]
    }
};

// DOM elements
const fromValueInput = document.getElementById('fromValue');
const fromUnitSelect = document.getElementById('fromUnit');
const toValueInput = document.getElementById('toValue');
const toUnitSelect = document.getElementById('toUnit');
const swapBtn = document.getElementById('swapBtn');
const conversionResult = document.getElementById('conversionResult');
const conversionFormula = document.getElementById('conversionFormula');
const categoryTabs = document.getElementById('categoryTabs');
const popularGrid = document.getElementById('popularGrid');
const popularConversions = document.getElementById('popularConversions');
const favoriteBtn = document.getElementById('favoriteBtn');

// Current category
let currentCategory = 'length';
let favorites = JSON.parse(localStorage.getItem('unitConverterFavorites')) || [];

// Initialize the converter
function initConverter() {
    // Set up category tabs
    const tabs = categoryTabs.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            updateUnits();
            updatePopularConversions();
            
            // Update section title
            const sectionTitle = popularConversions.querySelector('.section-title');
            sectionTitle.textContent = `Popular ${capitalizeFirstLetter(currentCategory)} Conversions`;
        });
    });

    // Set up input events
    fromValueInput.addEventListener('input', convert);
    fromUnitSelect.addEventListener('change', convert);
    toUnitSelect.addEventListener('change', convert);
    swapBtn.addEventListener('click', swapUnits);

    // Set up favorite button
    favoriteBtn.addEventListener('click', toggleFavorite);
    updateFavoriteButton();

    // Initialize with length conversion
    updateUnits();
    updatePopularConversions();
    convert();
}

// Update unit dropdowns based on current category
function updateUnits() {
    const units = conversionData[currentCategory].units;
    
    // Clear existing options
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    // Add new options
    units.forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit.symbol;
        option1.textContent = `${unit.name} (${unit.symbol})`;
        
        const option2 = document.createElement('option');
        option2.value = unit.symbol;
        option2.textContent = `${unit.name} (${unit.symbol})`;
        
        fromUnitSelect.appendChild(option1);
        toUnitSelect.appendChild(option2);
    });
    
    // Set default selections (second unit as target)
    if (units.length > 1) {
        toUnitSelect.selectedIndex = 1;
    }
}

// Convert units
function convert() {
    const fromValue = parseFloat(fromValueInput.value);
    if (isNaN(fromValue)) {
        toValueInput.value = '';
        conversionResult.textContent = '';
        conversionFormula.textContent = '';
        return;
    }
    
    const fromUnitSymbol = fromUnitSelect.value;
    const toUnitSymbol = toUnitSelect.value;
    
    const fromUnit = conversionData[currentCategory].units.find(u => u.symbol === fromUnitSymbol);
    const toUnit = conversionData[currentCategory].units.find(u => u.symbol === toUnitSymbol);
    
    if (!fromUnit || !toUnit) {
        toValueInput.value = '';
        conversionResult.textContent = '';
        conversionFormula.textContent = '';
        return;
    }
    
    let result;
    let formula = '';
    
    // Handle temperature separately
    if (fromUnit.isTemperature && toUnit.isTemperature) {
        result = convertTemperature(fromValue, fromUnitSymbol, toUnitSymbol);
        
        // Generate formula text
        if (fromUnitSymbol === '°C' && toUnitSymbol === '°F') {
            formula = 'Formula: (°C × 9/5) + 32';
        } else if (fromUnitSymbol === '°F' && toUnitSymbol === '°C') {
            formula = 'Formula: (°F - 32) × 5/9';
        } else if (fromUnitSymbol === '°C' && toUnitSymbol === 'K') {
            formula = 'Formula: °C + 273.15';
        } else if (fromUnitSymbol === 'K' && toUnitSymbol === '°C') {
            formula = 'Formula: K - 273.15';
        } else if (fromUnitSymbol === '°F' && toUnitSymbol === 'K') {
            formula = 'Formula: (°F - 32) × 5/9 + 273.15';
        } else if (fromUnitSymbol === 'K' && toUnitSymbol === '°F') {
            formula = 'Formula: (K - 273.15) × 9/5 + 32';
        }
    } else {
        // Standard conversion
        result = (fromValue * fromUnit.factor) / toUnit.factor;
        formula = `Formula: multiply the ${fromUnit.name.toLowerCase()} value by ${fromUnit.factor / toUnit.factor}`;
    }
    
    // Update results
    toValueInput.value = result.toFixed(6).replace(/\.?0+$/, '');
    conversionResult.textContent = `${fromValue} ${fromUnitSymbol} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${toUnitSymbol}`;
    conversionFormula.textContent = formula;
}

// Temperature conversion
function convertTemperature(value, fromUnit, toUnit) {
    let celsius;
    
    // Convert to Celsius first
    if (fromUnit === '°C') {
        celsius = value;
    } else if (fromUnit === '°F') {
        celsius = (value - 32) * 5/9;
    } else if (fromUnit === 'K') {
        celsius = value - 273.15;
    }
    
    // Convert from Celsius to target unit
    if (toUnit === '°C') {
        return celsius;
    } else if (toUnit === '°F') {
        return (celsius * 9/5) + 32;
    } else if (toUnit === 'K') {
        return celsius + 273.15;
    }
    
    return 0;
}

// Swap units
function swapUnits() {
    const tempUnit = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;
    convert();
}

// Update popular conversions grid
function updatePopularConversions() {
    popularGrid.innerHTML = '';
    
    const popular = conversionData[currentCategory].popular;
    const units = conversionData[currentCategory].units;
    
    popular.forEach(item => {
        const fromUnit = units.find(u => u.symbol === item.from);
        const toUnit = units.find(u => u.symbol === item.to);
        
        if (fromUnit && toUnit) {
            let result;
            
            if (fromUnit.isTemperature && toUnit.isTemperature) {
                result = convertTemperature(1, item.from, item.to);
            } else {
                result = (1 * fromUnit.factor) / toUnit.factor;
            }
            
            const card = document.createElement('div');
            card.className = 'conversion-card';
            card.innerHTML = `
                <div class="card-value">1 ${item.from} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${item.to}</div>
                <div class="card-units">${item.text}</div>
            `;
            
            // Add click event to set these units
            card.addEventListener('click', () => {
                fromUnitSelect.value = item.from;
                toUnitSelect.value = item.to;
                fromValueInput.value = '1';
                convert();
            });
            
            popularGrid.appendChild(card);
        }
    });
}

// Toggle favorite
function toggleFavorite() {
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const category = currentCategory;
    
    const favoriteIndex = favorites.findIndex(f => 
        f.from === fromUnit && f.to === toUnit && f.category === category
    );
    
    if (favoriteIndex === -1) {
        // Add to favorites
        favorites.push({
            from: fromUnit,
            to: toUnit,
            category: category,
            text: `${fromUnit} to ${toUnit} (${capitalizeFirstLetter(category)})`
        });
    } else {
        // Remove from favorites
        favorites.splice(favoriteIndex, 1);
    }
    
    // Save to localStorage
    localStorage.setItem('unitConverterFavorites', JSON.stringify(favorites));
    updateFavoriteButton();
}

// Update favorite button state
function updateFavoriteButton() {
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const category = currentCategory;
    
    const isFavorite = favorites.some(f => 
        f.from === fromUnit && f.to === toUnit && f.category === category
    );
    
    favoriteBtn.textContent = isFavorite ? '★ Favorited' : '☆ Add to Favorites';
    favoriteBtn.classList.toggle('favorited', isFavorite);
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the converter when DOM is loaded
document.addEventListener('DOMContentLoaded', initConverter);
