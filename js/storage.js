export function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}