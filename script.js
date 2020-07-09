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
const lists = document.querySelectorAll('.drag-item-list');

// Items
let itemText = '';
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];

// Drag Functionality
let dragged;
let dragging = false;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function checkStorage() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateStorage() {
  localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
  localStorage.setItem('progressItems', JSON.stringify(progressListArray));
  localStorage.setItem('completeItems', JSON.stringify(completeListArray));
  localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}

// Filter Array to remove empty values
function filterArray(array) {
  const filteredArray = array.filter((item) => {
    return item !== null;
  });
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.textContent = item;
  listEl.id = index;
  listEl.classList.add('drag-item');
  listEl.contentEditable = true;
  listEl.draggable = true;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  listEl.setAttribute('ondragstart', 'drag(event)');
  // Append
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    checkStorage();
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItem, index) => {
    if (backlogItem) {
      createItemEl(backlogList, 0, backlogItem, index);
    } else {
      delete backlogListArray[index];
    }
  });
  backlogListArray = filterArray(backlogListArray);
  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    if (progressItem) {
      createItemEl(progressList, 1, progressItem, index);
    }
  });
  progressListArray = filterArray(progressListArray);
  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((completeItem, index) => {
    if (completeItem) {
      createItemEl(completeList, 2, completeItem, index);
    }
  });
  completeListArray = filterArray(completeListArray);
  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => {
    if (onHoldItem) {
      createItemEl(onHoldList, 3, onHoldItem, index);
    }
  });
  onHoldListArray = filterArray(onHoldListArray);
  // Update Local Storage
  updatedOnLoad = true;
  updateStorage();
}

// Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
  if (dragging === false) {
    if (column === 0) {
      if (!backlogList.children[id].textContent) {
        delete backlogListArray[id];
      } else {
        backlogListArray[id] = backlogList.children[id].textContent;
      }
    }
    if (column === 1) {
      if (!progressList.children[id].textContent) {
        delete progressListArray[id];
      } else {
        progressListArray[id] = progressList.children[id].textContent;
      }
    }
    if (column === 2) {
      if (!completeList.children[id].textContent) {
        delete completeListArray[id];
      } else {
        completeListArray[id] = completeList.children[id].textContent;
      }
    }
    if (column === 3) {
      if (!onHoldList.children[id].textContent) {
        delete onHoldListArray[id];
      } else {
        onHoldListArray[id] = onHoldList.children[id].textContent;
      }
    }
    updateDOM();
  }
}

// Add to Column List, Reset Textbox
function addtoColumn(column) {
  itemText = addItems[column].textContent;
  if (column === 0) {
    backlogListArray.push(itemText);
  }
  if (column === 1) {
    progressListArray.push(itemText);
  }
  if (column === 2) {
    completeListArray.push(itemText);
  }
  if (column === 3) {
    onHoldListArray.push(itemText);
  }
  addItems[column].textContent = '';
  updateDOM(column);
}

// Show Add Item Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addContainers[column].style.display = 'flex';
  lists[column].parentElement.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hide Item Input Box
function hideInputBox(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addContainers[column].style.display = 'none';
  addtoColumn(column);
}

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  backlogListArray = [];
  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent);
  }
  progressListArray = [];
  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  }
  completeListArray = [];
  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }
  onHoldListArray = [];
  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent);
  }
  updateDOM();
}

// When Item Enters Column Area
function dragEnter(column) {
  lists[column].classList.add('over');
  currentColumn = column;
}

// When Item Starts Dragging
function drag(e) {
  dragged = e.target;
  dragging = true;
}

// Column Allows for Item to Drop
function allowDrop(e) {
  e.preventDefault();
}

// Dropping Item in Column
function drop(e) {
  e.preventDefault();
  const parent = lists[currentColumn];
  // Remove Background Color/Padding
  lists.forEach((list) => {
    list.classList.remove('over');
  });
  // Add item to Column
  parent.appendChild(dragged);
  // Dragging complete
  dragging = false;
  rebuildArrays();
}

// On Load
updateDOM();
