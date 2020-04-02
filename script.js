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

let dragItems = document.querySelectorAll('drag-item');

let itemText = '';

let updatedOnLoad = false;

let backlogListArray = [ "May the force be with you", "lorem ipsum" ];
let progressListArray = [ "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sequi culpa fuga numquam vel voluptatum beatae deleniti voluptatem, expedita a dicta sed provident? Nesciunt incidunt ipsam nemo quod, maxime laudantium.", "Lana Del Ray"];
let completeListArray = [ "Being cool", "Getting stuff done"];
let onHoldListArray = [ "Being uncool" ];

// Update Item
function updateItem(id, column) {
    console.log('testing that', id, column);
    if (column == 0) {
        backlogListArray[id] = backlogList.children[id].innerText;
    }
    if (column == 1) {
        progressListArray[id] = progressList.children[id].innerText;
    }
    if (column == 2) {
        completeListArray[id] = completeList.children[id].innerText;
    }
    if (column == 3) {
        onHoldListArray[id] = onHoldList.children[id].innerText;
    }
    updateArrays(column);
}

// Update Arrays
function updateArrays(column) {
    if (column == 0 || !updatedOnLoad) {
        console.log('updateonLoad', updatedOnLoad);
        backlogList.innerHTML = '';
        console.log('backlog empty', backlogList.innerHTML);
        for (i = 0; i < backlogListArray.length; i++) {
            backlogList.innerHTML += `
            <li id="${[i]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, 0)">${backlogListArray[i]}</li>
            `;
        }
    }
    if (column == 1 || !updatedOnLoad) {
        progressList.innerHTML = '';
        for (i = 0; i < progressListArray.length; i++) {
            progressList.innerHTML += `
            <li id="${[i]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, 1)">${progressListArray[i]}</li>
            `;
        }
    }
    if (column == 2 || !updatedOnLoad) {
        completeList.innerHTML = '';
        for (i = 0; i < completeListArray.length; i++) {
            completeList.innerHTML += `
            <li id="${[i]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, 2)">${completeListArray[i]}</li>
            `;
        }
    }
    if (column == 3 || !updatedOnLoad) {
        onHoldList.innerHTML = '';
        for (i = 0; i < onHoldListArray.length; i++) {
            onHoldList.innerHTML += `
            <li id="${[i]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, 3)">${onHoldListArray[i]}</li>
            `;
        }
    }
    updatedOnLoad = true;
    console.log('backlog:', backlogListArray);
    console.log('progress:', progressListArray);
    console.log('complete:', completeListArray);
    console.log('onHold:', onHoldListArray);
}

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
        backlogListArray.push(itemText);
    }
    if (column == 1) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        progressListArray.push(itemText);
    }
    if (column == 2) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        completeListArray.push(itemText);
    }
    if (column == 3) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        onHoldListArray.push(itemText);
    }
    updateArrays(column);
}

// On Startup
updateArrays();