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
    const subtaskObject = getSubtaskObject();
    input = {
        headline: headlineRef.value,
        text: textRef.value,
        status: status.value,
        assigned: assignTo(),
        subtask: subtaskObject
    }
    pushDataToFirebase('tasks', input);
    subtasks = [];
    resetInputFields();
}

/**
 *  Gets Checkbox Values and pushes into Array
 */
function assignTo() {
    let assignRef = document.getElementById('assign');
    let assignValues = assignRef.getElementsByTagName("INPUT")
    let assignedTo = [];
    for (let i = 0; i < assignValues.length; i++) {
        if (assignValues[i].checked) {
            assignedTo.push(assignValues[i].value);
        }
    }
    return assignedTo;
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
        });
    }
    setFilters();
}

//////////////////////////////// Eventuell in Board?
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

/**
 * Renders Urgent Tasks
 */
function renderUrgent(urgent) {
    for (let index = 0; index < urgent.length; index++) {
        urgentRef.innerHTML += taskTemplate(index, urgent);
        renderSubtaskCard(urgent[index]);
        renderAssigned(urgent[index]);
    }
}

/**
 * Renders Medium Tasks
 */
function renderMedium(medium) {
    for (let index = 0; index < medium.length; index++) {
        mediumRef.innerHTML += taskTemplate(index, medium);
        renderSubtaskCard(medium[index]);
        renderAssigned(medium[index]);
    }
}

/**
 * Renders Low Tasks
 */
function renderLow(low) {
    for (let index = 0; index < low.length; index++) {
        lowRef.innerHTML += taskTemplate(index, low);
        renderSubtaskCard(low[index]);
        renderAssigned(low[index]);
    }
}

/**
 * Renders Assigned To List in Contact Card
 */
function renderAssigned(task) {
    let assignedCardRef = document.getElementById(`assigned-to-${task.objectId}`);
    assignedCardRef.innerHTML = '';
    let assignedList = Object.values(task.data.assigned || {});
    for (let i=0; i < assignedList.length; i++) {
        let assignedContact = assignedList[i];
        assignedCardRef.innerHTML += assignedCardTemplate(assignedContact)
    }
}

/// Hier For Each und in einer Funktion?

/**
 *  Renders Subtask into Card Template
 */
function renderSubtaskCard(task) {
    const subtasks = Object.values(task.data.subtask || {});
    let subtaskCardRef = document.getElementById(`card-${task.objectId}`);
    subtaskCardRef.innerHTML = '';
    for (let n = 0; n < subtasks.length; n++) {
        subtaskCardRef.innerHTML += subtaskCardTemplate(task.objectId, subtasks, n);
    }
}

/**
 *  Deletes Subtask out of Card Template
 */
function deleteSubtaskCard(taskId, n) {
    const currentTaskObject = database.find(task => task.objectId === taskId);
    let currentSubtasks = Object.values(currentTaskObject.data.subtask || {});
    currentSubtasks.splice(n, 1);
    const subtaskObj = getCurrentSubtaskObject(currentSubtasks)
    const input = {
        headline: currentTaskObject.data.headline,
        text: currentTaskObject.data.text,
        status: currentTaskObject.data.status,
        assigned: currentTaskObject.data.assigned,
        subtask: subtaskObj
    };
    pushEditDataToFirebase('tasks/', taskId, input);
    renderSubtaskCard(currentTaskObject);
}

/**
 *  Reduces current Subtask into Object
 */
function getCurrentSubtaskObject(currentSubtasks) {
    const subtaskObject = currentSubtasks.reduce((result, subtask, index) => {
        result[index] = subtask;
        return result;
    }, {})
    return subtaskObject;
}

// Ende

/**
 *  Ads Subtask in Card Template
 */
function addSubtaskCard(taskId) {
    let subtaskInput = document.getElementById(`sub-${taskId}`)
    const currentTaskObject = database.find(task => task.objectId === taskId);
    let sub = currentTaskObject.data.subtask;

    let subArray
    if (sub) {
        subArray = Object.values(sub) || [];
    } else { subArray = [] }
    subArray.push(subtaskInput.value);

    const input = {
        headline: currentTaskObject.data.headline,
        text: currentTaskObject.data.text,
        status: currentTaskObject.data.status,
        assigned: currentTaskObject.data.assigned,
        subtask: subArray
    }

    pushEditDataToFirebase('tasks/', taskId, input);
    renderSubtaskCard(currentTaskObject);
}

