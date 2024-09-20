////////////////////////////////
// Form Logic

// DOM References
let headlineRef = document.getElementById('headline');
let textRef = document.getElementById('text');
let subRef = document.getElementById('sub-input');

// Subtask References
let subFormRef = document.getElementById('sub-form')
let subInputRef = document.getElementById('sub-input');
let subtasks = [];

/**
* Pushes Subtask Input Value into Array
*/
function addSubtask(event) {
    event.preventDefault();
    subtasks.push(subInputRef.value)
    renderSubtasks();
    subInputRef.value = '';
}

/**
* Renders Subtasks into Task Form
*/
function renderSubtasks() {
    subFormRef.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        subFormRef.innerHTML += subTaskTemplate(i)
    }
}

/**
* Deletes Subtask in Subtask Array
*/
function deleteSubtask(i) {
    subtasks.splice([i], 1);
    renderSubtasks();
}

/**
* Transforms Subtask Array into Object 
*/
function getSubtaskObject() {
    const subtaskObject = subtasks.reduce((result, subtask, index) => {
        result[index] = subtask;
        return result;
    }, {})
    return subtaskObject;
}

/**
 * Gets Complete Input Field Data and Stores Data in Object
 */
function getInputData(event) {
    event.preventDefault()
    let status = document.getElementById('status');
    let assignedTo = document.querySelector('input[name="assign-contact"]:checked');
    const subtaskObject = getSubtaskObject();
    input = {
        headline: headlineRef.value,
        text: textRef.value,
        status: status.value,
        assigned: assignedTo.value,
        subtask: subtaskObject
    }
    pushDataToFirebase('tasks', input);
    resetInputFields();
}

/**
 * Resets Input Field Values
 */
function resetInputFields() {
    headlineRef.value = '';
    textRef.value = '';
    subRef.value = '';
    subFormRef.innerHTML = '';
}

////////////////////////////////
// Render Logic

// DOM References
let lowRef = document.getElementById('low');
let mediumRef = document.getElementById('medium');
let urgentRef = document.getElementById('urgent');

// Database References 
let database = [];
let urgent = [];
let medium = [];
let low = [];

/**
 * Initializes Database Logic
 */
async function inititializeBoard() {
    lowRef.innerHTML = '';
    mediumRef.innerHTML = '';
    urgentRef.innerHTML = '';
    setDatabase();
}

/**
 * Defines the Database Array 
 */
async function setDatabase() {
    let data = await getDataFromFirebase('/tasks');
    let dataIds = Object.keys(data);
    database = [];
    for (let index = 0; index < dataIds.length; index++) {
        database.push({
            objectId: dataIds[index],
            data: data[dataIds[index]]
        })
    };
    setFilters();
}

////////////////////////////////
// Filter Logic

/**
 * Filters Database
 */
function setFilters() {
    urgent = database.filter(v => v.data.status === 'urgent');
    medium = database.filter(v => v.data.status === 'medium');
    low = database.filter(v => v.data.status === 'low');
    renderFilteredDatabaseObjects(urgent, medium, low);
}

/**
 * Renders Filtered Database in DOM
 */
function renderFilteredDatabaseObjects(urgent, medium, low) {
    renderUrgent(urgent);
    renderMedium(medium);
    renderLow(low);
}

function renderUrgent(urgent) {
    for (let index = 0; index < urgent.length; index++) {
        urgentRef.innerHTML += urgentCardTemplate(index);
    }
}

function renderMedium(medium) {
    for (let index = 0; index < medium.length; index++) {
        mediumRef.innerHTML += mediumCardTemplate(index);
    }
}

function renderLow(low) {
    for (let index = 0; index < low.length; index++) {
        lowRef.innerHTML += lowCardTemplate(index);
    }
}