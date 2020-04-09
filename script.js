// Add/Save Btns, Items for every Column
const saveItemBtns = document.querySelectorAll(".solid");
const addContainers = document.querySelectorAll(".add-container");
const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const addItems = document.querySelectorAll(".add-item");
const lists = document.querySelectorAll(".drag-item-list");

// Column Lists
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

// Items
let dragItems = document.querySelectorAll("drag-item");
let itemText = "";
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];

// Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
  if (dragging == false) {
    //console.log('update', column);
    //console.log('testing that', id, column);
    if (column == 0) {
      if (
        backlogList.children[id] == undefined ||
        backlogList.children[id].innerText == ""
      ) {
        delete backlogListArray[id];
      } else {
        backlogListArray[id] = backlogList.children[id].innerText;
      }
    }
    if (column == 1) {
      if (
        progressList.children[id] == undefined ||
        progressList.children[id].innerText == ""
      ) {
        delete progressListArray[id];
      } else {
        progressListArray[id] = progressList.children[id].innerText;
      }
    }
    if (column == 2) {
      if (
        completeList.children[id] == undefined ||
        completeList.children[id].innerText == ""
      ) {
        delete completeListArray[id];
      } else {
        completeListArray[id] = completeList.children[id].innerText;
      }
    }
    if (column == 3) {
      if (
        onHoldList.children[id] == undefined ||
        onHoldList.children[id].innerText == ""
      ) {
        delete onHoldListArray[id];
      } else {
        onHoldListArray[id] = onHoldList.children[id].innerText;
      }
    }
    updateArrays();
  }
}

// Update Arrays - Reset container HTML, loop through and add back items, exclude items with no value
function updateArrays() {
  // Check localStorage once
  if (!updatedOnLoad) {
    checkStorage();
  }
  // Backlog Column
  backlogList.innerHTML = "";
  for (i = 0; i < backlogListArray.length; i++) {
    if (backlogListArray[i] == undefined) {
      console.log("no value");
    } else {
      backlogList.innerHTML += `
            <li id="${[
              i,
            ]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, 0)" draggable="true" ondragstart="drag(event)">${
        backlogListArray[i]
      }</li>
            `;
    }
  }
  // Progress Column
  progressList.innerHTML = "";
  for (i = 0; i < progressListArray.length; i++) {
    if (progressListArray[i] == undefined) {
      console.log("no value");
    } else {
      progressList.innerHTML += `
            <li id="${[
              i,
            ]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, 1)" draggable="true" ondragstart="drag(event)">${
        progressListArray[i]
      }</li>
            `;
    }
  }
  // Complete Column
  completeList.innerHTML = "";
  for (i = 0; i < completeListArray.length; i++) {
    if (completeListArray[i] == undefined) {
      console.log("no value");
    } else {
      completeList.innerHTML += `
            <li id="${[
              i,
            ]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, 2)" draggable="true" ondragstart="drag(event)">${
        completeListArray[i]
      }</li>
            `;
    }
  }
  // On Hold Column
  onHoldList.innerHTML = "";
  for (i = 0; i < onHoldListArray.length; i++) {
    if (onHoldListArray[i] == undefined) {
      console.log("no value");
    } else {
      onHoldList.innerHTML += `
            <li id="${[
              i,
            ]}" class="drag-item" contenteditable="true" onfocusout="updateItem(this.id, 3)" draggable="true" ondragstart="drag(event)">${
        onHoldListArray[i]
      }</li>
            `;
    }
  }
  updatedOnLoad = true;
  // Update Local Storage
  updateStorage();
  console.log("backlog:", backlogListArray);
  console.log("progress:", progressListArray);
  console.log("complete:", completeListArray);
  console.log("onHold:", onHoldListArray);
}

// Get Arrays from localStorage if available, set default values if not
function checkStorage() {
  if (localStorage.getItem("backlogItems") !== null) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["Release the course", "Sit back and relax"];
    progressListArray = [
      "Work on planning and recording videos for projects",
      "Listen to Lana Del Ray",
    ];
    completeListArray = ["Being cool", "Getting stuff done"];
    onHoldListArray = ["Being uncool"];
  }
}

// Set localStorage Arrays
function updateStorage() {
  localStorage.setItem("backlogItems", JSON.stringify(backlogListArray));
  localStorage.setItem("progressItems", JSON.stringify(progressListArray));
  localStorage.setItem("completeItems", JSON.stringify(completeListArray));
  localStorage.setItem("onHoldItems", JSON.stringify(onHoldListArray));
}

// Show Add Item Input Box
function showInputBox(column) {
  //console.log(column);
  addBtns[column].style.visibility = "hidden";
  saveItemBtns[column].style.display = "flex";
  addContainers[column].style.display = "flex";
  lists[column].parentElement.scrollTo(0, 5000);
}

// Hide Item Input Box
function hideInputBox(column) {
  addBtns[column].style.visibility = "visible";
  saveItemBtns[column].style.display = "none";
  addContainers[column].style.display = "none";
  addtoColumn(column);
}

// Add to Column List, Then Clear Text
function addtoColumn(column) {
  //console.log(column);
  if (column == 0) {
    itemText = addItems[column].innerText;
    backlogListArray.push(itemText);
  }
  if (column == 1) {
    itemText = addItems[column].innerText;
    progressListArray.push(itemText);
  }
  if (column == 2) {
    itemText = addItems[column].innerText;
    completeListArray.push(itemText);
  }
  if (column == 3) {
    itemText = addItems[column].innerText;
    onHoldListArray.push(itemText);
  }
  console.log(itemText);
  addItems[column].innerText = "";
  updateArrays(column);
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

// Drag Functionality
let dragged;
let dragging = false;
let currentColumn;

// When Item Enters Column Area
function dragEnter(column) {
  //console.log('dragenter');
  lists[column].classList.add("over");
  currentColumn = column;
}

// When Item Leaves Column Area
function dragLeave() {
  //console.log('dragleave');
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
  let parent;
  parent = lists[currentColumn];
  //console.log(parent);

  // Remove Background Color/Padding
  lists[0].classList.remove("over");
  lists[1].classList.remove("over");
  lists[2].classList.remove("over");
  lists[3].classList.remove("over");
  // Add item to Column
  parent.appendChild(dragged);
  // Dragging complete
  dragging = false;
  rebuildArrays();
}

// On Startup
updateArrays();
