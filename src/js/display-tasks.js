import { openTasks, doneTasks, updateStorage} from './storage.js';
import {sortList} from './sort.js';


export function displayTodos() {
    renderOpenTasks(openTasks)
    renderDoneTasks(doneTasks)
}

export function displayLists(openTasks, doneTasks) {
    if (openTasks) {
        renderOpenTasks(openTasks)
    }
    if (doneTasks) {
        renderDoneTasks(doneTasks)
    }
}

function renderOpenTasks(openTodos) {
    let list = document.getElementById('openTasksList')
    list.innerHTML = '';

    let searchField = document.getElementById('search-todos')

    let tasks;

    if (searchField)
    {
        tasks = searchField.value ? openTodos.filter(item => item.description.toLowerCase().includes(searchField.value.toLowerCase()))
        : openTodos
    }

    tasks.map(task => createElementForTodo(task)).forEach(el => list.appendChild(el))
    document.getElementById('openTasksSort').value = localStorage.getItem('openTasksSort')
    
    let clearListElement = document.querySelector('#openTasksContainer .clear-tasks')
    if (tasks && tasks.length) {
        clearListElement.removeAttribute('hidden')
    } else {
        clearListElement.setAttribute('hidden', 'true')
    }

}

function renderDoneTasks(doneTodos) {
    let list = document.getElementById('doneTasksList')
    list.innerHTML = '';

    let searchField = document.getElementById('search-todos')

    let tasks;

    if (searchField)
    {
        tasks = searchField.value ? doneTodos.filter(item => item.description.toLowerCase().includes(searchField.value.toLowerCase()))
        : doneTodos
    }

    tasks.map(task => createElementForTodo(task)).forEach(el => list.appendChild(el))
    document.getElementById('doneTasksSort').value = localStorage.getItem('doneTasksSort')

    let clearListElement = document.querySelector('#doneTasksContainer .clear-tasks')
    if (tasks && tasks.length) {
        clearListElement.removeAttribute('hidden')
    } else {
        clearListElement.setAttribute('hidden', 'true')
    }
}

export function createElementForTodo(todoItem) {
    let itemDiv = document.createElement('li')
    itemDiv.setAttribute('id', todoItem.id)

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    if (todoItem.status === 'completed')
        checkbox.setAttribute('checked', '')
    checkbox.setAttribute('data-action', 'check')

    itemDiv.appendChild(checkbox) 

    let descP = document.createElement('p')
    descP.textContent = `${todoItem.description}`
    itemDiv.appendChild(descP)
    descP.addEventListener('dblclick', e => addTextEditorForDescriptionElement(e.target))

    let input = document.createElement('input')
    input.type = 'text'
    input.hidden = true;
    input.addEventListener('keydown', e => modifyTodoDescription(e))
    itemDiv.append(input)

    let createdTsP = document.createElement('p')
    createdTsP.innerText = `${new Date(todoItem.id).toLocaleTimeString()}`

    let timeStampsDiv = document.createElement('div')
    timeStampsDiv.appendChild(createdTsP)

    if (todoItem.dueDate) {
        let dueDateTsP = document.createElement('p')
        dueDateTsP.innerText = `${new Date(todoItem.dueDate).toLocaleTimeString()}`
        timeStampsDiv.appendChild(dueDateTsP)
    }

    itemDiv.appendChild(timeStampsDiv)
    
    let deleteItemButton = document.createElement('button')
    deleteItemButton.classList.add('btn')
    deleteItemButton.classList.add('close')
    deleteItemButton.textContent = 'X'
    deleteItemButton.setAttribute('data-action', 'delete')

    itemDiv.appendChild(deleteItemButton);


    return itemDiv;
}

function addTextEditorForDescriptionElement(element) {
    let currentValue = element.textContent
    let input = element.nextElementSibling
    input.hidden = false
    input.value = currentValue
    input.focus()

    element.hidden = true
}

function modifyTodoDescription(event) {
        if (event.key === 'Enter') {
            let li = event.target.parentElement
            
            let itemId = li.id
            if (li.parentElement.id === 'openTasksList') {
                openTasks.find(el => parseInt(itemId) === el.id).description = event.target.value
                sortList(openTasks, localStorage.getItem('openTasksSort'))
                displayLists(openTasks)
            } else {
                doneTasks.find(el => parseInt(itemId) === el.id).description = event.target.value
                sortList(doneTasks, localStorage.getItem('doneTasksSort'))
                displayLists(null, doneTasks)
            }
            updateStorage();
        } else if (event.key === 'Escape'){
            displayTodos()
        }
}