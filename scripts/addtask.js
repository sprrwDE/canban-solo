////////////////////////////////
// DOM References

const testDiv = document.getElementById('content-div')

////////////////////////////////
// Database References and General Logic

let database = [];

/**
 * Initializes Database Logic
 */
async function inititializeBoard() {
    testDiv.innerHTML = '';
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
        testDiv.innerHTML += boardCardTemplate(index);
    }
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
let testInputValueThree = document.getElementById(`assign-${currentIndex}`)

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
    let assignedTo = document.querySelector('input[name="assign-contact"]:checked');
    input = {
        name: one,
        age: two,
        assigned: assignedTo.value
    }
    pushDataToFirebase('test', input);
    resetInputFields();
}

