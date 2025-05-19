// Tab functionality
function openTab(tabName) {
  const tabs = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active-tab");
  }

  const tabButtons = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active-tab");
  event.currentTarget.classList.add("active");
}

// Show appropriate fields based on calculation type
function showCalcFields() {
  const calcType = document.getElementById("calc-type").value;
  const allFields = document.getElementsByClassName("calc-fields");

  for (let field of allFields) {
    field.classList.remove("active");
  }

  if (calcType) {
    document.getElementById(`${calcType}-fields`).classList.add("active");
  }
}

// Temperature Conversion
function convertTemperature() {
  const tempInput = parseFloat(document.getElementById("temp-input").value);
  const fromUnit = document.getElementById("temp-from").value;
  const toUnit = document.getElementById("temp-to").value;

  if (isNaN(tempInput)) {
    document.getElementById("conversion-result").innerHTML =
      '<p class="error">Please enter a valid temperature</p>';
    return;
  }

  let result;
  let convertedTemp;

  // Convert to Celsius first if needed
  if (fromUnit === "fahrenheit") {
    convertedTemp = ((tempInput - 32) * 5) / 9;
  } else if (fromUnit === "kelvin") {
    convertedTemp = tempInput - 273.15;
  } else {
    convertedTemp = tempInput;
  }

  // Convert from Celsius to target unit
  if (toUnit === "fahrenheit") {
    result = (convertedTemp * 9) / 5 + 32;
  } else if (toUnit === "kelvin") {
    result = convertedTemp + 273.15;
  } else {
    result = convertedTemp;
  }

  const fromSymbol =
    fromUnit === "celsius" ? "°C" : fromUnit === "fahrenheit" ? "°F" : "K";
  const toSymbol =
    toUnit === "celsius" ? "°C" : toUnit === "fahrenheit" ? "°F" : "K";

  document.getElementById("conversion-result").innerHTML = `
        <p>${tempInput.toFixed(2)} ${fromSymbol} = ${result.toFixed(
    2
  )} ${toSymbol}</p>
    `;
}

// Heat Index Calculation
function calculateHeatIndex() {
  const temp = parseFloat(document.getElementById("hi-temp").value);
  const humidity = parseFloat(document.getElementById("hi-humidity").value);

  if (isNaN(temp) || isNaN(humidity)) {
    document.getElementById("heat-index-result").innerHTML =
      '<p class="error">Please enter valid values</p>';
    return;
  }

  if (temp < 80) {
    document.getElementById("heat-index-result").innerHTML = `
            <p>Heat index is only calculated for temperatures above 80°F.</p>
            <p>At ${temp}°F and ${humidity}% humidity, the heat index is considered to be the actual temperature.</p>
        `;
    return;
  }

  // National Weather Service heat index formula
  const heatIndex =
    -42.379 +
    2.04901523 * temp +
    10.14333127 * humidity -
    0.22475541 * temp * humidity -
    6.83783e-3 * temp * temp -
    5.481717e-2 * humidity * humidity +
    1.22874e-3 * temp * temp * humidity +
    8.5282e-4 * temp * humidity * humidity -
    1.99e-6 * temp * temp * humidity * humidity;

  let riskLevel = "Low risk";
  if (heatIndex >= 125) {
    riskLevel = "Extreme danger - heat stroke highly likely";
  } else if (heatIndex >= 105) {
    riskLevel =
      "Danger - heat cramps or heat exhaustion likely, heat stroke possible";
  } else if (heatIndex >= 91) {
    riskLevel = "Extreme caution - heat cramps or heat exhaustion possible";
  } else if (heatIndex >= 80) {
    riskLevel = "Caution - fatigue possible";
  }

  document.getElementById("heat-index-result").innerHTML = `
        <p>At ${temp}°F and ${humidity}% humidity, the heat index is <strong>${heatIndex.toFixed(
    1
  )}°F</strong></p>
        <p><strong>Risk Level:</strong> ${riskLevel}</p>
    `;
}

// Wind Chill Calculation
function calculateWindChill() {
  const temp = parseFloat(document.getElementById("wc-temp").value);
  const windSpeed = parseFloat(document.getElementById("wc-wind").value);

  if (isNaN(temp) || isNaN(windSpeed)) {
    document.getElementById("wind-chill-result").innerHTML =
      '<p class="error">Please enter valid values</p>';
    return;
  }

  if (temp > 50) {
    document.getElementById("wind-chill-result").innerHTML = `
            <p>Wind chill is only calculated for temperatures at or below 50°F.</p>
            <p>At ${temp}°F and ${windSpeed} mph wind, the wind chill is considered to be the actual temperature.</p>
        `;
    return;
  }

  // National Weather Service wind chill formula
  const windChill =
    35.74 +
    0.6215 * temp -
    35.75 * Math.pow(windSpeed, 0.16) +
    0.4275 * temp * Math.pow(windSpeed, 0.16);

  let riskLevel = "Low risk";
  if (windChill <= -25) {
    riskLevel = "Danger - frostbite in less than 15 minutes";
  } else if (windChill <= -15) {
    riskLevel = "High risk - frostbite in 15-30 minutes";
  } else if (windChill <= 0) {
    riskLevel = "Moderate risk - frostbite in 30-60 minutes";
  }

  document.getElementById("wind-chill-result").innerHTML = `
        <p>At ${temp}°F and ${windSpeed} mph wind, the wind chill is <strong>${windChill.toFixed(
    1
  )}°F</strong></p>
        <p><strong>Risk Level:</strong> ${riskLevel}</p>
    `;
}

// Dew Point Calculation
function calculateDewPoint() {
  const temp = parseFloat(document.getElementById("dp-temp").value);
  const humidity = parseFloat(document.getElementById("dp-humidity").value);

  if (isNaN(temp) || isNaN(humidity)) {
    document.getElementById("dew-point-result").innerHTML =
      '<p class="error">Please enter valid values</p>';
    return;
  }

  // Magnus formula for dew point
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);

  let comfortLevel = "Comfortable";
  if (dewPoint >= 26) {
    comfortLevel = "Severely high - extremely uncomfortable, oppressive";
  } else if (dewPoint >= 24) {
    comfortLevel = "Very high - quite uncomfortable";
  } else if (dewPoint >= 21) {
    comfortLevel = "Somewhat uncomfortable";
  } else if (dewPoint >= 16) {
    comfortLevel = "OK for most, but slightly humid";
  } else if (dewPoint >= 10) {
    comfortLevel = "Comfortable";
  } else {
    comfortLevel = "Dry";
  }

  document.getElementById("dew-point-result").innerHTML = `
        <p>At ${temp}°C and ${humidity}% humidity, the dew point is <strong>${dewPoint.toFixed(
    1
  )}°C</strong></p>
        <p><strong>Comfort Level:</strong> ${comfortLevel}</p>
    `;
}
