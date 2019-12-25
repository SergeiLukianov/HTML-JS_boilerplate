
let openTasksString = localStorage.getItem('openTasks')
let doneTasksString = localStorage.getItem('doneTasks')

let openTasks = [];
let doneTasks = [];

if (openTasksString) {
    openTasks = JSON.parse(openTasksString) || [];
}

if (doneTasksString) {
    doneTasks = JSON.parse(doneTasksString) || [];    
}

updateStorage();

export function updateStorage() {
    localStorage.setItem('openTasks', JSON.stringify(openTasks))
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks))
}

export function getOpenTasksFromStorage() {
    return JSON.parse(localStorage.getItem('openTasks'))
}

export function getDoneTasksFromStorage() {
    return JSON.parse(localStorage.getItem('doneTasks'))
}

export {openTasks, doneTasks}
