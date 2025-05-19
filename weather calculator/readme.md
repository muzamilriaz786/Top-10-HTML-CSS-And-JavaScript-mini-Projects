# 🌤️ Weather Calculator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/muzammilriaz/weather-calculator?style=social)
![GitHub issues](https://img.shields.io/github/issues/muzammilriaz/weather-calculator)
![GitHub last commit](https://github.com/muzamilriaz786/Top-10-HTML-CSS-And-JavaScript-mini-Projects/tree/main/weather%20calculator)

---

## Overview

**Weather Calculator** is a comprehensive web application designed to help users perform temperature conversions and calculate weather-related indices such as Heat Index, Wind Chill, and Dew Point.

Built with **HTML**, **CSS**, and **JavaScript**, this project is ideal for beginner to intermediate web developers looking to learn about:

- DOM manipulation
- Event handling
- Responsive design
- Scientific calculations in JavaScript

---

## 🚀 Features

### 1. Temperature Conversion
| From | To | Description |
|-------|----|-------------|
| Celsius (°C) | Fahrenheit (°F) | Convert temperatures easily |
| Fahrenheit (°F) | Kelvin (K) | Supports all major scales |
| Kelvin (K) | Celsius (°C) | Accurate conversions |

- Real-time conversions
- Error handling for invalid inputs
- Clean and clear result display

### 2. Weather Calculations
| Calculation | Description | Validity Range | Additional Info |
|-------------|-------------|----------------|-----------------|
| **Heat Index** | "Feels like" temperature on hot days | Above 80°F (27°C) | Includes risk assessment |
| **Wind Chill** | "Feels like" temperature on cold days | 50°F (10°C) or below | Frostbite risk warnings |
| **Dew Point** | Temperature at which dew forms | Any | Comfort level assessment |

---

## 🛠️ Code Structure

### HTML
- **Tabs:** Two main tabs for temperature conversion and weather calculations.
- **Input Groups:** Well-organized fields with labels for user input.
- **Result Containers:** Dedicated areas for displaying outputs.
- **Responsive:** Works smoothly on desktop and mobile.

### CSS
- Modern, card-based UI with shadows and rounded corners.
- Interactive tab styling.
- Responsive inputs and results.
- Mobile-friendly media queries.

### JavaScript
- Tab switching logic.
- Dynamic showing/hiding of weather calculation fields.
- Functions for temperature conversions and weather index calculations.
- Input validation and user feedback.

---

## ⚙️ How to Use

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muzamilriaz786/Top-10-HTML-CSS-And-JavaScript-mini-Projects/tree/main/weather%20calculator.git

   cd weather-calculator

Open index.html in your preferred browser.

Explore the two tabs:

Temperature Conversion: Enter temperature and select units.

Weather Calculations: Select the type (Heat Index, Wind Chill, Dew Point) and fill relevant inputs.

Click buttons to calculate and view results instantly.

Modify or extend:

Adjust CSS colors & layout in style.css.

Add new temperature scales or weather calculations in script.js.

Improve UI with animations or charts.

📚 Scientific Formulas Used
Temperature Conversion
°F to °C: (F - 32) × 5/9

°C to K: C + 273.15

Heat Index (National Weather Service)
markdown
Copy
Edit
HI = -42.379 + 2.04901523*T + 10.14333127*RH - 0.22475541*T*RH 
     - 6.83783×10^-3*T^2 - 5.481717×10^-2*RH^2 
     + 1.22874×10^-3*T^2*RH + 8.5282×10^-4*T*RH^2 
     - 1.99×10^-6*T^2*RH^2
(T = temperature in °F, RH = relative humidity %)

Wind Chill
ini
Copy
Edit
WC = 35.74 + 0.6215*T - 35.75*V^0.16 + 0.4275*T*V^0.16
(T = temperature in °F, V = wind speed in mph)

Dew Point (Magnus formula)
r
Copy
Edit
α = (a*T)/(b+T) + ln(RH/100)
Td = (b*α)/(a-α)
Where:

a = 17.27

b = 237.7

T = temperature (°C)

RH = relative humidity (%)

🧩 Code Explanation & Usage Guide
1. HTML
Tab system: Buttons toggle views for conversion and calculations.

Input groups: Labeled inputs & dropdowns for user interaction.

Results: Display areas updated dynamically.

2. CSS
.tab-btn: styled tabs with active/inactive states.

.input-group: flexbox layout for inputs and labels.

.result: styled output with highlight.

3. JavaScript
openTab(tabName): toggles active tabs.

showCalcFields(): shows input fields based on selected weather calculation.

convertTemperature(): converts temperature units with validation.

calculateHeatIndex(), calculateWindChill(), calculateDewPoint(): perform calculations and display results with safety checks.

💡 Extension Ideas
Add more weather indices (e.g., Humidity, Pressure).

Fetch real-time weather data from APIs (OpenWeatherMap).

Implement temperature charts and visualization.

Save calculation history in localStorage.

Add unit tests for functions.

Improve UI/UX with animations and accessibility enhancements.

📜 License
This project is licensed under the MIT License. See LICENSE for details.

🙋‍♂️ About the Author
Muzammil Riaz – Web Developer passionate about creating educational and practical web tools.
Find me on GitHub | LinkedIn

📷 Screenshot

Thanks for checking out the Weather Calculator!
Feel free to contribute or suggest improvements via GitHub Issues or Pull Requests.


---

If you want, I can also help you create a nice screenshot or badge images, or generate a minimal HTML demo for your repo homepage. Just ask!
