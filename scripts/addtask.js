////////////////////////////////
// DOM References

const testDiv = document.getElementById('content-div')
let lowRef = document.getElementById('low');
let mediumRef = document.getElementById('medium');
let urgentRef = document.getElementById('urgent');

////////////////////////////////
// Database References and General Logic

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

////////////////////////////////
// Firebase References and Logic

const boardURL = 'https://solo-join-default-rtdb.europe-west1.firebasedatabase.app/'

/**
 * Loads Firebase Realtime DB
 */
async function getDataFromFirebase(path = "") {
    let fetchGetResponse = await fetch(boardURL + path + '.json')
    return getResponseToJson = await fetchGetResponse.json();
}

/**
 * Push Input Values To Firebase Realtime DB
 */
async function pushDataToFirebase(path = "", input) {
    try {
        await fetch(boardURL + path + '.json', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        });
    }
    catch (error) {
        console.log('Error Brudi');
    } finally {
        await inititializeBoard()
    }
}

/**
 * Deletes Card at Path (ID)
 */
async function deleteCard(path = "", id) {
    try {
        await fetch(boardURL + path + id + '.json', {
            method: "DELETE"
        });
    }
    catch (error) {
        console.log('Error Brudi');
    } finally {
        await inititializeBoard()
    }
}

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

