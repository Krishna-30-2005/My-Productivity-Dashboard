import { loadTasks } from "./storage.js";
import { tasks, setTasks, addTask, toggleTask, deleteTask } from "./taskManager.js";
import { getStats } from "./stats.js";
import { getWeather } from "./weather.js";

// DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalEl = document.getElementById("totalTasks");
const completedEl = document.getElementById("completedTasks");
const percentEl = document.getElementById("progressPercent");
const weatherEl = document.getElementById("weatherText");

const progressFill = document.getElementById("progressFill");

const toggleBtn = document.getElementById("themeToggle");

// Load tasks on start
setTasks(loadTasks());
renderTasks();
updateStats();

// Add task
addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;

    addTask(text);
    renderTasks();
    updateStats();
    taskInput.value = "";
});

// Render function
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");

        li.innerHTML = `
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
                ${task.text}
            </span>
            <div>
                <button onclick="window.toggleTask(${task.id})">✔</button>
                <button onclick="window.deleteTask(${task.id})">❌</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Make functions global (temporary fix)
window.toggleTask = (id) => {
    toggleTask(id);
    renderTasks();
    updateStats();
};

window.deleteTask = (id) => {
    deleteTask(id);
    renderTasks();
    updateStats();
};

function updateStats() {
    const stats = getStats(tasks);

    totalEl.textContent = stats.total;
    completedEl.textContent = stats.completed;
    percentEl.textContent = stats.percentage + "%";

    progressFill.style.width = stats.percentage + "%";
}

async function loadWeather() {
    console.log("Weather function started");
    const weather = await getWeather("Chennai");

    if (!weather) {
        weatherEl.textContent = "Failed to load weather";
        return;
    }

    weatherEl.textContent = 
        `${weather.city}: ${weather.temp}°C, ${weather.condition}`;
}

loadWeather();

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
});

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
}

loadTheme();

function loadGreeting() {
    const greetingEl = document.getElementById("greeting");
    const dateEl = document.getElementById("date");

    const now = new Date();
    const hours = now.getHours();

    let greeting = "Hello";

    if (hours < 12) greeting = "Good Morning ☀️";
    else if (hours < 18) greeting = "Good Afternoon 🌤";
    else greeting = "Good Evening 🌙";

    greetingEl.textContent = greeting;
    dateEl.textContent = now.toDateString();
}

loadGreeting();