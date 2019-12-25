import {openTasks, doneTasks, updateStorage} from './storage.js'

function handleClickOnOpenTasksList(event) {
    let todoElement = event.target

    let action = todoElement.dataset.action
    let id = todoElement.parentElement.id

    if (!action || !id)
        return;

    if (action === 'delete')
    {
        if (removeOpenTask(id)) {
            updateStorage();
            displayTodos();
        }
    } else if (action === 'check') {
        let item = removeOpenTask(id)
        if (item) {
            item.status = 'completed'
            doneTasks.unshift(item)
            updateStorage();
            displayTodos();
        }
    }
}

function handleClickOnDoneTasksList(event) {
    let todoElement = event.target

    let action = todoElement.dataset.action
    let id = todoElement.parentElement.id

    if (!action || !id)
        return;

    if (action === 'delete')
    {
        let i = removeDoneTask(id)
        console.log(i)
        if (i) {
            updateStorage();
            displayTodos();
        }
    } else if (action === 'check') {
        let item = removeDoneTask(id)
        if (item) {
            item.status = 'open'
            openTasks.push(item)
            updateStorage();
            displayTodos();
        }
    }
}

function removeOpenTask(id) {
    console.log('remove open task with id', id)
    let index = openTasks.findIndex(el => parseInt(el.id) === parseInt(id))
    console.log('index to remove element', index)
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


document.getElementById('openTasksList').addEventListener('click', handleClickOnOpenTasksList)
document.getElementById('doneTasksList').addEventListener('click', handleClickOnDoneTasksList)


class TodoItem {
    constructor(description) {
      this.description = description;
      this.status = 'open';
      this.id = new Date().valueOf();
    }
}

export function createAndAppendTodo(value) {
    let newItem = new TodoItem(value)
    openTasks.push(newItem)

    let itemElement = createElementForTodo(newItem);
    
    let openTasksList = document.getElementById('openTasksList')
    openTasksList.insertBefore(itemElement, openTasksList.firstChildElement)
}

export function refreshInput() {
    newTaskInput.value = '';
    newTaskInput.addEventListener('focus', (e) => 
        e.target.removeAttribute('placeholder'));
    newTaskInput.addEventListener('blur', (e) => 
        e.target.setAttribute('placeholder', 'New task...'));
}

export function displayTodos() {
    renderOpenTasks(openTasks)
    renderDoneTasks(doneTasks);
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


export function createElementForTodo(todoItem) {
    let itemDiv = document.createElement('li')
    itemDiv.setAttribute('id', todoItem.id)
    itemDiv.style.display = 'flex';

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    if (todoItem.status === 'completed')
        checkbox.setAttribute('checked', '')
    checkbox.setAttribute('data-action', 'check')

    itemDiv.appendChild(checkbox) 

    let descP = document.createElement('p')
    descP.innerHTML = `${todoItem.description}`
    itemDiv.appendChild(descP)

    let createdTsP = document.createElement('p')
    createdTsP.innerText = `${new Date(todoItem.id).toLocaleTimeString()}`
    itemDiv.appendChild(createdTsP)
    
    let deleteItemButton = document.createElement('button')
    deleteItemButton.textContent = 'X'
    deleteItemButton.setAttribute('data-action', 'delete')

    itemDiv.appendChild(deleteItemButton);


    return itemDiv;
}
