import {openTasks} from './storage.js'
import {displayLists} from './display-tasks.js'
import {sortList} from './sort.js';

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
    sortList(openTasks, localStorage.getItem('openTasksSort'))
    
    displayLists(openTasks, null)
}

export function clearInput() {
    newTaskInput.value = '';
}
