# Personal Productivity Dashboard

A simple and responsive productivity dashboard built with **HTML5, CSS3 and JavaScript (ES6+)**.

## Features

- Add tasks
- Edit tasks
- Mark tasks as completed or pending
- Delete tasks
- Search tasks
- Filter by All, Pending and Completed
- Task statistics
- Completion percentage and progress bar
- LocalStorage persistence
- Light and dark mode
- Responsive design for desktop, tablet and mobile

## Technologies

- HTML5
- CSS3
- JavaScript ES6+
- Browser LocalStorage

## How it works

Tasks are stored as JavaScript objects in an array. Whenever a task is added, edited, completed or deleted, the updated array is saved in LocalStorage.

When the page loads, the application reads the saved tasks from LocalStorage and displays them.

The statistics are calculated from the current task array:

`Completion Percentage = Completed Tasks / Total Tasks × 100`

## Project Structure

```text
My-Productivity-Dashboard/
├── index.html
├── style.css
├── README.md
└── js/
    ├── main.js
    ├── stats.js
    ├── storage.js
    └── taskManager.js
```

## Running the project

Because the project uses JavaScript modules, run it through a local development server such as VS Code Live Server.

Open `index.html` through the local server and start adding tasks.

## Interview Topics

This project demonstrates:

- DOM manipulation
- Event handling
- JavaScript modules
- Arrays and objects
- Array methods such as `filter()` and `find()`
- Functions
- Conditional logic
- JSON serialization
- LocalStorage
- Responsive CSS and media queries
