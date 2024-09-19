////////////////////////////////
// DOM References

let lowRef = document.getElementById('low');
let mediumRef = document.getElementById('medium');
let urgentRef = document.getElementById('urgent');

////////////////////////////////
// Input References and Form Logic

let testInputValueOne = document.getElementById('test');
let testInputValueTwo = document.getElementById('test2');

/**
 * Resets Input Field Values
 */
function resetInputFields() {
    testInputValueOne.value = '';
    testInputValueTwo.value = '';
}

/**
 * Gets Input Field Data and Stores Data in Object
 */
function getInputData(event) {
    event.preventDefault()
    let one = testInputValueOne.value;
    let two = testInputValueTwo.value
    let three = document.getElementById('status');
    let assignedTo = document.querySelector('input[name="assign-contact"]:checked');
    input = {
        name: one,
        age: two,
        status: three.value,
        assigned: assignedTo.value
    }
    pushDataToFirebase('test', input);
    resetInputFields();
}

////////////////////////////////
// Render Logic

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
    let data = await getDataFromFirebase('/test');
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

/**
 * Filters Database
 */
function setFilters() {
    urgent = database.filter(v => v.data.status === 'urgent');
    medium = database.filter(v => v.data.status === 'medium');
    low = database.filter(v => v.data.status === 'low');
    console.log('Urgent:', urgent);
    console.log('Medium:', medium);
    console.log('Low:', low);
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