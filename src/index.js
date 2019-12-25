import './style.css';
import {createAndAppendTodo, refreshInput, displayTodos} from './js/add-task.js';
import {updateStorage} from './js/storage.js';


let newTaskInput = document.getElementById('newTaskInput')

addTaskButton.addEventListener('click', () => {
    if (!newTaskInput.value)
        return;
    
    createAndAppendTodo(newTaskInput.value)
    updateStorage();
    refreshInput();
})

refreshInput();
displayTodos();