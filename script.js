////////////////////////////////
// DOM References

const testDiv = document.getElementById('content-div')
const leftDiv = document.getElementById('list-left')

////////////////////////////////
// Database References and General Logic

let database = [];

/**
 * Initializes Database Logic
 */
async function init() {
    testDiv.innerHTML = '';
    leftDiv.innerHTML = '';
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
    renderDatabaseObjects()
}

/**
 * Renders Database in DOM
 */
function renderDatabaseObjects() {
    for (let index = 0; index < database.length; index++) {
        testDiv.innerHTML += testTemplate(index);
        leftDiv.innerHTML += testTemplate(index);
    }
}

////////////////////////////////
// Firebase References and Logic

const baseURL = 'https://solo-join-default-rtdb.europe-west1.firebasedatabase.app/'

/**
 * Loads Firebase Realtime DB
 */
async function getDataFromFirebase(path = "") {
    let fetchGetResponse = await fetch(baseURL + path + '.json')
    return getResponseToJson = await fetchGetResponse.json();
}

/**
 * Push Input Values To Firebase Realtime DB
 */
async function pushDataToFirebase(path = "", input) {
    try {
        await fetch(baseURL + path + '.json', {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        });
    }
    catch (error) {
        console.log('Error Brudi');
    } finally {
        await init()
    }
}

async function pushEditDataToFirebase(path = "", id, input) {
    console.log(id)
    try {
        await fetch(baseURL + path + id + '.json', {
            method: "PUT",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        });
    }
    catch (error) {
        console.log('Error Brudi');
    } finally {
        await init()
    }
}

/**
 * Deletes Card at Path (ID)
 */
async function deleteCard(path = "", id) {
    try {
        await fetch(baseURL + path + id + '.json', {
            method: "DELETE"
        });
    }
    catch (error) {
        console.log('Error Brudi');
    } finally {
        await init();
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

function resetEditFields() {
    editInputRef.value = '';
    editInputRefTwo.value = '';
}

/**
 * Gets Input Field Data and Stores Data in Object
 */
function getInputData(event) {
    event.preventDefault()
    let one = testInputValueOne.value;
    let two = testInputValueTwo.value
    input = {
        name: one,
        age: two
    }
    pushDataToFirebase('test', input);
    resetInputFields();
}

/**
 * Gets Edit Input Field Data and Stores Data in Object
 */
function getEditData(event, id) {
    event.preventDefault()
    const editInputRef = document.getElementById(`edit${id}`);
    const editInputRefTwo = document.getElementById(`edit2-${id}`);
    let one = editInputRef.value;
    let two = editInputRefTwo.value;
    input = {
        name: one,
        age: two
    }
    pushEditDataToFirebase('test/', id, input);
    resetEditFields();
}