import {openTasks} from './storage.js'
import {createElementForTodo} from './display-tasks.js'

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
