import { openTasks, doneTasks, updateStorage } from './storage.js';


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

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    if (todoItem.status === 'completed')
        checkbox.setAttribute('checked', '')
    checkbox.setAttribute('data-action', 'check')

    itemDiv.appendChild(checkbox) 

    let descP = document.createElement('p')
    descP.innerHTML = `${todoItem.description}`
    itemDiv.appendChild(descP)
    descP.addEventListener('dblclick', e => addTextEditorForDescriptionElement(e.target))

    let input = document.createElement('input')
    input.type = 'text'
    input.hidden = true;
    input.addEventListener('keydown', e => modifyTodoDescription(e))
    itemDiv.append(input)

    let createdTsP = document.createElement('p')
    createdTsP.innerText = `${new Date(todoItem.id).toLocaleTimeString()}`
    itemDiv.appendChild(createdTsP)

    if (todoItem.dueDate) {
        let dueDateTsP = document.createElement('p')
        dueDateTsP.innerText = `${new Date(todoItem.dueDate).toLocaleTimeString()}`
        itemDiv.appendChild(dueDateTsP)
    }
    
    let deleteItemButton = document.createElement('button')
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
                displayLists(openTasks)
            } else {
                doneTasks.find(el => parseInt(itemId) === el.id).description = event.target.value
                displayLists(null, doneTasks)
            }
            updateStorage();
        } else if (event.key === 'Escape'){
            displayTodos()
        }
}