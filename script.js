
const saveItemBtns = document.querySelectorAll('.solid');
const addContainers = document.querySelectorAll('.add-container');
const addBtns = document.querySelectorAll('.add-btn:not(.solid)')
const addBacklog = document.getElementById('add-backlog');
const addProgress = document.getElementById('add-progress');
const addComplete = document.getElementById('add-complete');
const addOnHold = document.getElementById('add-on-hold');

function showInputBox(column) {
    console.log(column);
    addBtns[column].style.visibility = 'hidden';
    saveItemBtns[column].style.display = 'flex';
    addContainers[column].style.display = 'flex';
}

function hideInputBox(column) {
    addBtns[column].style.visibility = 'visible';
    saveItemBtns[column].style.display = 'none';
    addContainers[column].style.display = 'none';
}