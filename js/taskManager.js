import { saveTasks } from "./storage.js";

export let tasks = [];

export function setTasks(newTasks) {
    tasks = Array.isArray(newTasks) ? newTasks : [];
}

export function addTask(text) {
    const task = {
        id: Date.now(),
        text,
        completed: false
    };

    tasks.push(task);
    saveTasks(tasks);
}

export function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks(tasks);
}

export function updateTask(id, newText) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, text: newText }
            : task
    );

    saveTasks(tasks);
}

export function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}
