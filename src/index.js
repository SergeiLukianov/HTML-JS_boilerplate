import './style.css';
import {createAndAppendTodo, clearInput} from './js/add-task.js';
import {updateStorage, openTasks, doneTasks, SORTS} from './js/storage.js';
import {displayTodos, displayLists} from './js/display-tasks.js';
import {handleClickOnOpenTasksList, handleClickOnDoneTasksList} from './js/edit-task';


let newTaskInput = document.getElementById('newTaskInput')

newTaskInput.addEventListener('focus', (e) => 
    e.target.removeAttribute('placeholder'));
newTaskInput.addEventListener('blur', (e) => 
    e.target.setAttribute('placeholder', 'New task...'));
newTaskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        createTodo()
    } else if(e.key === 'Escape') {
        clearInput();
        newTaskInput.blur()
    }
})

addTaskButton.addEventListener('click', createTodo)

document.getElementById('openTasksList').addEventListener('click', handleClickOnOpenTasksList)
document.getElementById('doneTasksList').addEventListener('click', handleClickOnDoneTasksList)
document.getElementById('search-todos').addEventListener('keyup', searchItems)
document.querySelectorAll('select').forEach( select => select.addEventListener('change', sortTasks))

clearInput();
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

function createTodo() {
    if (!newTaskInput.value)
        return;
    
    createAndAppendTodo(newTaskInput.value)
    updateStorage();
    clearInput();
    newTaskInput.focus();
}

function sortTasks(event) {
    let select = event.target

    if (select.id === 'openTasksSort') {
        // console.log(select.value)
        openTasks.sort(SORTS[select.value])
        localStorage.setItem('openTasksSort', select.value)
        
        updateStorage();
        displayLists(openTasks, null)

    } else {
        doneTasks.sort(SORTS[select.value])
        localStorage.setItem('doneTasksSort', select.value)

        updateStorage();
        displayLists(null, doneTasks)
    }
}