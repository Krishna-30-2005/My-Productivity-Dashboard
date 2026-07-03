export function getStats(tasks) {
    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const percentage = total === 0 
        ? 0 
        : Math.round((completed / total) * 100);

    return {
        total,
        completed,
        percentage
    };
}