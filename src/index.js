import './style.css';
import {createAndAppendTodo, refreshInput} from './js/add-task.js';
import {updateStorage, openTasks, doneTasks} from './js/storage.js';
import {displayTodos, displayLists} from './js/display-tasks.js';
import {handleClickOnOpenTasksList, handleClickOnDoneTasksList} from './js/edit-task';


let newTaskInput = document.getElementById('newTaskInput')

addTaskButton.addEventListener('click', () => {
    if (!newTaskInput.value)
        return;
    
    createAndAppendTodo(newTaskInput.value)
    updateStorage();
    refreshInput();
})

document.getElementById('openTasksList').addEventListener('click', handleClickOnOpenTasksList)
document.getElementById('doneTasksList').addEventListener('click', handleClickOnDoneTasksList)
document.getElementById('search-todos').addEventListener('keyup', searchItems)

refreshInput();
displayTodos();



function searchItems(event) {
    let value = event.target.value

    if (!value) {
        displayTodos()
        return;
    }

    let filteredOpenTasks = openTasks.filter(item => item.description.toLowerCase().includes(value.toLowerCase()))
    let filteredDoneTasks = doneTasks.filter(item => item.description.toLowerCase().includes(value.toLowerCase()))

    displayLists(filteredOpenTasks, filteredDoneTasks)

}