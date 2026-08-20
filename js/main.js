import { loadTasks, saveTasks } from "./storage.js";
import {
    tasks,
    setTasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask
} from "./taskManager.js";
import { getStats } from "./stats.js";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

const totalEl = document.getElementById("totalTasks");
const completedEl = document.getElementById("completedTasks");
const pendingEl = document.getElementById("pendingTasks");
const percentEl = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const taskCountLabel = document.getElementById("taskCountLabel");

const toggleBtn = document.getElementById("themeToggle");
const greetingEl = document.getElementById("greeting");
const dateEl = document.getElementById("date");

let currentFilter = "all";

setTasks(loadTasks());
loadTheme();
loadGreeting();
render();

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (!text) {
        taskInput.focus();
        return;
    }

    addTask(text);
    taskInput.value = "";
    taskInput.focus();
    render();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.toggle("active", item === button);
        });

        renderTasks();
    });
});

searchInput.addEventListener("input", renderTasks);

taskList.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "toggle") {
        toggleTask(id);
    } else if (action === "delete") {
        deleteTask(id);
    }

    render();
});

toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    toggleBtn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
});

function render() {
    renderTasks();
    updateStats();
}

function renderTasks() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const visibleTasks = tasks.filter(task => {
        const matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "pending" && !task.completed) ||
            (currentFilter === "completed" && task.completed);

        const matchesSearch =
            task.text.toLowerCase().includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    taskList.innerHTML = "";

    visibleTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;

        const content = document.createElement("div");
        content.className = "task-content";

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        content.appendChild(text);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "task-action complete-btn";
        completeButton.type = "button";
        completeButton.dataset.action = "toggle";
        completeButton.dataset.id = task.id;
        completeButton.textContent = task.completed ? "↩" : "✓";
        completeButton.title = task.completed ? "Mark as pending" : "Mark as completed";
        completeButton.setAttribute(
            "aria-label",
            task.completed ? "Mark task as pending" : "Mark task as completed"
        );

        const editButton = document.createElement("button");
        editButton.className = "task-action";
        editButton.type = "button";
        editButton.dataset.action = "edit";
        editButton.dataset.id = task.id;
        editButton.textContent = "✎";
        editButton.title = "Edit task";
        editButton.setAttribute("aria-label", "Edit task");

        const deleteButton = document.createElement("button");
        deleteButton.className = "task-action delete-btn";
        deleteButton.type = "button";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = task.id;
        deleteButton.textContent = "×";
        deleteButton.title = "Delete task";
        deleteButton.setAttribute("aria-label", "Delete task");

        actions.append(completeButton, editButton, deleteButton);
        li.append(content, actions);
        taskList.appendChild(li);
    });

    emptyState.hidden = visibleTasks.length !== 0;

    if (tasks.length === 0) {
        emptyState.textContent = "No tasks yet. Add your first task above.";
    } else if (visibleTasks.length === 0) {
        emptyState.textContent = "No tasks match your current filter or search.";
    }
}

taskList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action='edit']");

    if (!button) return;

    const id = Number(button.dataset.id);
    const task = tasks.find(item => item.id === id);

    if (!task) return;

    const newText = prompt("Edit task:", task.text);
    if (newText === null) return;

    const trimmedText = newText.trim();

    if (!trimmedText) return;

    updateTask(id, trimmedText);
    render();
});

function updateStats() {
    const stats = getStats(tasks);

    totalEl.textContent = stats.total;
    completedEl.textContent = stats.completed;
    pendingEl.textContent = stats.pending;
    percentEl.textContent = `${stats.percentage}%`;
    progressFill.style.width = `${stats.percentage}%`;

    taskCountLabel.textContent =
        `${stats.total} ${stats.total === 1 ? "task" : "tasks"}`;
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    document.body.classList.toggle("dark", isDark);
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    toggleBtn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

function loadGreeting() {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
        greetingEl.textContent = "Good Morning ☀️";
    } else if (hours < 18) {
        greetingEl.textContent = "Good Afternoon 🌤️";
    } else {
        greetingEl.textContent = "Good Evening 🌙";
    }

    dateEl.textContent = now.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}
