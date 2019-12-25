import { openTasks, doneTasks } from './storage.js';
import {createElementForTodo} from './add-task.js'

export function displayTodos() {
    renderOpenTasks(openTasks)
    renderDoneTasks(doneTasks)
}

export function displayLists(openTasks, doneTasks) {
    if (openTasks)
    {
        renderOpenTasks(openTasks)
    }
    if (doneTasks) {
        renderDoneTasks(doneTasks)
    }
}

function renderOpenTasks(openTodos) {
    let list = document.getElementById('openTasksList')
    list.innerHTML = '';

    openTodos.map(task => createElementForTodo(task)).forEach(el => list.appendChild(el))
}

function renderDoneTasks(doneTodos) {
    let list = document.getElementById('doneTasksList')
    list.innerHTML = '';

    doneTodos.map(task => createElementForTodo(task)).forEach(el => list.appendChild(el))
}