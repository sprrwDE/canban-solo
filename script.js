////////////////////////////////
// DOM References

const testDiv = document.getElementById('testdiv')


////////////////////////////////
// Database References and General Logic

let database = [];

/**
 * Initializes Database Logic
 */
async function init() {
    let data = await getDataFromFirebase('/test');
    let dataIds = Object.keys(data);
    setDatabase(data, dataIds)
}

/**
 * Defines the Database Array 
 */
function setDatabase(data, dataIds) {
    database = []
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
    testDiv.innerHTML = '';
    for (let index = 0; index < database.length; index++) {
        testDiv.innerHTML += testTemplate(index);
    }
}

/**
 * Database Template String
 */
function testTemplate(i) {
    return `
    <p>${database[i].data.name}</p>
    <p>${database[i].objectId}</p>`
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

////////////////////////////////
// Input References and Form Logic

let testInputValueOne = document.getElementById('test');
let testInputValueTwo = document.getElementById('test2');

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
 * Resets Input Field Values
 */
function resetInputFields() {
    testInputValueOne.value = '';
    testInputValueTwo.value = '';
}