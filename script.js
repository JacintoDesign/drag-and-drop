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
function updateItem() {
    // for (i = 0; i < backlogList.children.length; i++) {
    //     itemValue = backlogList.children[i].innerText;
    //     for (j = 0; j < backlogListArray.length; j++) {
    //         if (itemValue == backlogListArray[j]) {
    //             console.log('duplicate');
    //             backlogListArray.splice(backlogListArray[j]);
    //         } else {
    //             backlogListArray.push(itemValue);
    //         }
    //     }     
    // }
    for (i = 0; i < backlogList.children.length; i++) {
        itemValue = backlogList.children[i].innerText;
        backlogListArray.push(itemValue);
    }
    for (i = 0; i < progressList.children.length; i++) {
        itemValue = progressList.children[i].innerText;
        progressListArray.push(itemValue);
    }
    for (i = 0; i < completeList.children.length; i++) {
        itemValue = completeList.children[i].innerText;
        completeListArray.push(itemValue);
    }
    for (i = 0; i < onHoldList.children.length; i++) {
        itemValue = onHoldList.children[i].innerText;
        onHoldListArray.push(itemValue);
    }
    console.log('backlog:', backlogListArray);
    console.log('progress:', progressListArray);
    console.log('complete:', completeListArray);
    console.log('onHold:', onHoldListArray);
    updateArrays();
}

// Update Arrays
function updateArrays() {
    console.log(backlogListArray);
    if (updatedOnLoad == false) {
        updatedOnLoad = true;
        for (i = 0; i < backlogListArray.length; i++) {
            backlogList.innerHTML += `
            <li class="drag-item" contenteditable="true" onfocusout="updateItem()">${backlogListArray[i]}</li>
            `;
        }
    } else {
        backlogList.innerHTML = '';
        for (i = 0; i < backlogListArray.length; i++) {
            if (backlogListArray[i].length < 1) {
                console.log('empty item');
            } else {
                backlogList.innerHTML += `
                <li class="drag-item" contenteditable="true" onfocusout="updateItem()">${backlogListArray[i]}</li>
                `;
            }
        }
    }
    for (i = 0; i < progressListArray.length; i++) {
        if (progressListArray[i].length < 1) {
            console.log('empty item');
        } else {
            progressList.innerHTML += `
            <li class="drag-item" contenteditable="true" onfocusout="updateItem()">${progressListArray[i]}</li>
            `;
        }
    }
    for (i = 0; i < completeListArray.length; i++) {
        if (completeListArray[i].length < 1) {
            console.log('empty item');
        } else {
            completeList.innerHTML += `
            <li class="drag-item" contenteditable="true" onfocusout="updateItem()">${completeListArray[i]}</li>
            `;
        }
    }
    for (i = 0; i < onHoldListArray.length; i++) {
        if (onHoldListArray[i].length < 1) {
            console.log('empty item');
        } else {
            onHoldList.innerHTML += `
            <li class="drag-item" contenteditable="true" onfocusout="updateItem()">${onHoldListArray[i]}</li>
            `;
        }
    }
}

// function startUpArrays() {
//     for (i = 0; i < backlogListArray.length; i++) {
//         backlogList.innerHTML += `
//         <li class="drag-item" contenteditable="true" onfocusout="updateItem()">${backlogListArray[i]}</li>
//         `;
//     }
//     for (i = 0; i < progressListArray.length; i++) {
//         progressList.innerHTML += `
//         <li class="drag-item" contenteditable="true" onfocusout="updateItem()">${progressListArray[i]}</li>
//         `;
//     }
//     for (i = 0; i < completeListArray.length; i++) {
//         completeList.innerHTML = `
//         <li class="drag-item" contenteditable="true" onfocusout="updateItem()">${completeListArray[i]}</li>
//         `;
//     }
//     for (i = 0; i < onHoldListArray.length; i++) {
//             onHoldList.innerHTML = `
//             <li class="drag-item" contenteditable="true" onfocusout="updateItem()">${onHoldListArray[i]}</li>
//             `;
//     }
// }


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
        backlogList.innerHTML += `
        <li class="drag-item" contenteditable="true" onfocusout="updateItem()">${itemText}</li>
        `;
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
}

updateArrays();