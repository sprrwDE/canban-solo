////////////////////////////////
// Form Logic

// DOM References
let headlineRef = document.getElementById('headline');
let textRef = document.getElementById('text');

/**
 * Gets Input Field Data and Stores Data in Object
 */
function getInputData(event) {
    event.preventDefault()
    let status = document.getElementById('status');
    let assignedTo = document.querySelector('input[name="assign-contact"]:checked');
    input = {
        headline: headlineRef.value,
        text: textRef.value,
        status: status.value,
        assigned: assignedTo.value,
        subtask: {task: ''}
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
    setDatabase()
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