
let openTasksString = localStorage.getItem('openTasks')
let doneTasksString = localStorage.getItem('doneTasks')

localStorage.setItem('openTasksSort', localStorage.getItem('openTasksSort') || 'createdDateASC')
localStorage.setItem('doneTasksSort', localStorage.getItem('doneTasksSort') || 'createdDateASC')

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

export const SORTS = {
    createdDateASC: function(a, b) {
        // console.log('a.id - b.id')
        // console.log('a:', a)
        // console.log('b:', b)
        return a.id - b.id;
    },
    createdDateDESC:  function(a, b) {
        // console.log('b.id - a.id')
        // console.log('b:', b)
        // console.log('a:', a)
        return b.id - a.id;
    },
    descriptionASC: function(a, b) {
        return a.description.localeCompare(b.description);
    },
    descriptionDESC: function(a, b) {
        return b.description.localeCompare(a.description);
    }
}
