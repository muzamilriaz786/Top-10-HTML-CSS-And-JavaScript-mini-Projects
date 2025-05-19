# Top 10 HTML, CSS & JavaScript Mini Projects
Welcome to the __Top 10 Mini Projects__ repository! This collection features 10 practical and beginner-friendly web applications built purely with __HTML__, __CSS__, and __JavaScript.__ These projects are perfect for anyone looking to improve their frontend skills with real-world examples, covering topics like DOM manipulation, event handling, API usage, and UI interactivity.

## Projects Overview

| Project Name          | Description                                              |
| --------------------- | -------------------------------------------------------- |
| 1. Weather Calculator | Calculate and convert temperatures; display weather info |
| 2. Note App           | Create, edit, and delete notes in a user-friendly UI     |
| 3. Tip Calculator     | Calculate tips and split bills with ease                 |
| 4. Unit Converter     | Convert values across different measurement units        |
| 5. To-Do List         | Manage tasks with add, edit, delete functionality        |
| 6. Digital Clock      | Real-time clock with 12/24 hour toggle                   |
| 7. Password Generator | Generate secure random passwords based on criteria       |
| 8. Currency Converter | Convert currencies using real-time exchange rates        |
| 9. Quiz App           | Multiple-choice quiz application to test your knowledge  |
| 10. Quote Generator   | Display random inspirational quotes                      |

## How to Use These Projects
`1.` __Clone the repository:__
```
git clone https://github.com/muzamilriaz786/Top-10-HTML-CSS-And-JavaScript-mini-Projects.git
```

`2.` __Open any project folder in your favorite code editor or directly open the HTML files in your browser.__

`3.` __Each project contains an index.html file as the entry point along with related CSS and JS files.__

`4.` __Feel free to modify the code to experiment and learn how each functionality works.__

## Detailed Project Descriptions and Sample Code
### 1. Weather Calculator
A simple app to convert temperatures (Celsius, Fahrenheit) and calculate indices like heat index, wind chill, and dew point.

__Usage:__

* Enter temperature values and select units.

* Click convert or calculate buttons to get results.

__Example snippet (temperature conversion):__


```
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

// Usage
let c = 30;
console.log(`${c}°C = ${celsiusToFahrenheit(c)}°F`);
```
## 2. Note App
Create, edit, and delete notes with persistent UI updates.

__Features:__

* Add new notes.

* Edit existing notes inline.

* Delete unwanted notes.

__Example snippet (adding notes):__

```
const notesContainer = document.getElementById('notes');
const addNoteBtn = document.getElementById('add-note');

addNoteBtn.addEventListener('click', () => {
  const note = document.createElement('textarea');
  note.classList.add('note');
  notesContainer.appendChild(note);
});
```
## 3. Tip Calculator
Calculate the tip amount and split bills among people.

__Usage:__

* Enter bill amount.

* Select tip percentage.

* Enter number of people sharing the bill.

* Displays tip per person and total per person.

__Example snippet:__

```
function calculateTip(bill, tipPercent, people) {
  let tipAmount = (bill * tipPercent) / 100;
  let totalPerPerson = (bill + tipAmount) / people;
  return { tipAmount: tipAmount.toFixed(2), totalPerPerson: totalPerPerson.toFixed(2) };
}
```
### 4. Unit Converter
Convert between various units such as length, weight, temperature, and more.

__Usage:__

* Input a value and select units to convert from and to.

* Displays converted value.

### 5. To-Do List
Simple task manager to add, mark complete, and delete tasks.

__Example snippet (adding a task):__
```
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', () => {
  if(todoInput.value.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = todoInput.value;
    todoList.appendChild(li);
    todoInput.value = '';
  }
});
```
### 6. Digital Clock
Displays current time with AM/PM toggle.

### 7. Password Generator
Generates secure passwords based on selected options (length, symbols, numbers, uppercase).

### 8. Currency Converter
Uses an API to convert currencies with live exchange rates.

### 9. Quiz App
Multiple-choice quiz that tracks user score and provides instant feedback.

### 10. Quote Generator
Fetches and displays random motivational quotes on button click.

## Tech Stack
* HTML5 for markup

* CSS3 for styling

* Vanilla JavaScript for functionality and DOM manipulation

## Contributing
Feel free to fork this repo and submit pull requests. Contributions to improve UI, add new features, or fix bugs are welcome!

License
This repository is open source under the MIT License.