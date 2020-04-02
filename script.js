// Add/Save Btns, Items for every Column
const saveItemBtns = document.querySelectorAll('.solid');
const addContainers = document.querySelectorAll('.add-container');
const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const addItems = document.querySelectorAll('.add-item');
const lists = document.querySelectorAll('.drag-item-list');

// Column Lists
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

let dragItems = document.querySelectorAll('drag-item');

let itemText = '';
let updatedOnLoad = false;

// Array Values
let backlogListArray = [ "May the force be with you", "lorem ipsum" ];
let progressListArray = [ "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sequi culpa fuga.", "Lana Del Ray" ];
let completeListArray = [ "Being cool", "Getting stuff done"];
let onHoldListArray = [ "Being uncool" ];

// Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
    // console.log('testing that', id, column);
    if (column == 0) {
        if (backlogList.children[id] == undefined || backlogList.children[id].innerText == '') {
            delete backlogListArray[id];
        } else {
            backlogListArray[id] = backlogList.children[id].innerText;
        }
    }
    if (column == 1) {
        if (progressList.children[id] == undefined || progressList.children[id].innerText == '') {
            delete progressListArray[id];
        } else {
            progressListArray[id] = progressList.children[id].innerText;
        }
    }
    if (column == 2) {
        if (completeList.children[id] == undefined || completeList.children[id].innerText == '') {
            delete completeListArray[id];
        } else {
            completeListArray[id] = completeList.children[id].innerText;
        }
    }
    if (column == 3) {
        if (onHoldList.children[id] == undefined || onHoldList.children[id].innerText == '') {
            delete onHoldListArray[id];
        } else {
            onHoldListArray[id] = onHoldList.children[id].innerText;
        }
    }
    updateArrays(column);
}

// Update Arrays - Reset container HTML, loop through and add back items, exclude items with no value
function updateArrays(column) {
    if (column == 0 || !updatedOnLoad) {
        //console.log('updateonLoad', updatedOnLoad);
        backlogList.innerHTML = '';
        for (i = 0; i < backlogListArray.length; i++) {
            if (backlogListArray[i] == undefined) {
                console.log('no value');
            } else {
                backlogList.innerHTML += `
                <li id="${[i]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, ${column})" draggable="true" ondragstart="drag(event)">${backlogListArray[i]}</li>
                `;
            }
        }
    }
    if (column == 1 || !updatedOnLoad) {
        progressList.innerHTML = '';
        for (i = 0; i < progressListArray.length; i++) {
            if (progressListArray[i] == undefined) {
                console.log('no value');
            } else {
                progressList.innerHTML += `
                <li id="${[i]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, ${column})" draggable="true" ondragstart="drag(event)">${progressListArray[i]}</li>
                `;
            }
        }
    }
    if (column == 2 || !updatedOnLoad) {
        completeList.innerHTML = '';
        for (i = 0; i < completeListArray.length; i++) {
            if (completeListArray[i] == undefined) {
                console.log('no value');
            } else {
                completeList.innerHTML += `
                <li id="${[i]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, ${column})" draggable="true" ondragstart="drag(event)">${completeListArray[i]}</li>
                `;
            }
        }
    }
    if (column == 3 || !updatedOnLoad) {
        onHoldList.innerHTML = '';
        for (i = 0; i < onHoldListArray.length; i++) {
            if (onHoldListArray[i] == undefined) {
                console.log('no value');
            } else {
                onHoldList.innerHTML += `
                <li id="${[i]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, ${column})" draggable="true" ondragstart="drag(event)">${onHoldListArray[i]}</li>
                `;
            }
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

// Add to Column List, Then Clear Text
function addtoColumn(column) {
    //console.log(column);
    if (column == 0) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        backlogListArray.push(itemText);
        addItems[column].innerText = '';
    }
    if (column == 1) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        progressListArray.push(itemText);
        addItems[column].innerText = '';
    }
    if (column == 2) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        completeListArray.push(itemText);
        addItems[column].innerText = '';
    }
    if (column == 3) {
        itemText = addItems[column].innerText;
        console.log(itemText);
        onHoldListArray.push(itemText);
        addItems[column].innerText = '';
    }
    updateArrays(column);
}

// On Startup
updateArrays();

// Drag Functionality
function dragEnter(column) {
    console.log(column)
    console.log('Event: ', 'dragenter');
    lists[column].classList.add('over');
  }

  function dragLeave() {
    console.log('Event: ', 'dragleave');
  }

var dragged;
function drag(e) {
    dragged = e.target;
}
function allowDrop(e) {
    e.preventDefault();
}
function drop(e) {
    e.preventDefault();

    let parent;
    if(e.currentTarget){
        // In Safari no path
        parent = e.currentTarget
    }else{
        // In chrome path
        parent = e.path.filter((i)=>{
            if(i.classList){
                return i.classList.contains('drag-item-list');
            }
        })[0];
    }

    lists[0].classList.remove('over');
    lists[1].classList.remove('over');
    lists[2].classList.remove('over');
    lists[3].classList.remove('over');
    parent.appendChild(dragged);
    rebuildArrays();
}

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
    backlogListArray = [];
    for (i = 0; i < backlogList.children.length; i++) {
        backlogListArray.push(backlogList.children[i].innerText);
    }
    progressListArray = [];
    for (i = 0; i < progressList.children.length; i++) {
        progressListArray.push(progressList.children[i].innerText);
    }
    completeListArray = [];
    for (i = 0; i < completeList.children.length; i++) {
        completeListArray.push(completeList.children[i].innerText);
    }
    onHoldListArray = [];
    for (i = 0; i < onHoldList.children.length; i++) {
        onHoldListArray.push(onHoldList.children[i].innerText);
    }
    updateArrays();
}