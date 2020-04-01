// Add/Save Btns, Items for every Column
const saveItemBtns = document.querySelectorAll('.solid');
const addContainers = document.querySelectorAll('.add-container');
const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const addItems = document.querySelectorAll('.add-item');

// Column Lists
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

let itemText = '';

// Show Add Item Input Box
function showInputBox(column) {
    // console.log(column);
    addBtns[column].style.visibility = 'hidden';
    saveItemBtns[column].style.display = 'flex';
    addContainers[column].style.display = 'flex';
}

// Hide Item Input Box
function hideInputBox(column) {
    addBtns[column].style.visibility = 'visible';
    saveItemBtns[column].style.display = 'none';
    addContainers[column].style.display = 'none';
    addtoColumn(column);
}

// Add to Column List
function addtoColumn(column) {
    console.log(column);
    if (column == 0) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        backlogList.innerHTML += `<li class="drag-item" contenteditable="true">${itemText}</li>`;
    }
    if (column == 1) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        progressList.innerHTML += `<li class="drag-item" contenteditable="true">${itemText}</li>`;
    }
    if (column == 2) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        completeList.innerHTML += `<li class="drag-item" contenteditable="true">${itemText}</li>`;
    }
    if (column == 3) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        onHoldList.innerHTML += `<li class="drag-item" contenteditable="true">${itemText}</li>`;
    }
}