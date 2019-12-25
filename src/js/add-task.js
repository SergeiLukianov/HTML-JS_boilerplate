import {openTasks} from './storage.js'

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
