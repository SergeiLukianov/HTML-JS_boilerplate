import {displayLists} from './display-tasks.js'
import { openTasks, doneTasks, updateStorage } from './storage.js';


export function handleClickOnOpenTasksList(event) {
    let todoElement = event.target
    console.log(event.target)

    let action = todoElement.dataset.action
    let id = todoElement.parentElement.id

    if (!action || !id)
        return;

    if (action === 'delete')
    {
        if (removeOpenTask(id)) {
            updateStorage();
            displayLists(openTasks);
        }
    } else if (action === 'check') {
        let item = removeOpenTask(id)
        if (item) {
            item.status = 'completed'
            item.dueDate = new Date().valueOf()
            doneTasks.unshift(item)
            updateStorage();
            displayLists(openTasks, doneTasks);
        }
    }
}

export function handleClickOnDoneTasksList(event) {
    let todoElement = event.target

    let action = todoElement.dataset.action
    let id = todoElement.parentElement.id

    if (!action || !id)
        return;

    if (action === 'delete')
    {
        let i = removeDoneTask(id)
        if (i) {
            updateStorage();
            displayLists(null, doneTasks);
        }
    } else if (action === 'check') {
        let item = removeDoneTask(id)
        if (item) {
            item.status = 'open'
            item.dueDate = null
            openTasks.push(item)
            updateStorage();
            displayLists(openTasks, doneTasks);
        }
    }
}

function removeOpenTask(id) {
    let index = openTasks.findIndex(el => parseInt(el.id) === parseInt(id))
    if (index === -1)
        return null

    return openTasks.splice(index, 1)[0]
}

function removeDoneTask(id) {
    let index = doneTasks.findIndex(el => parseInt(el.id) === parseInt(id))

    if (index === -1)
        return null

    return doneTasks.splice(index, 1)[0]
}
