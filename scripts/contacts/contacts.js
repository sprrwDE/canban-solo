////////////////////////////////
// DOM References

const contactDiv = document.getElementById('list-left')

////////////////////////////////
// Database References and General Logic

let contactDb = [];

/**
 * Initializes Database Logic
 */
async function initializeContacts() {
    contactDiv.innerHTML = '';
    setContactDatabase()
}

/**
 * Defines the Database Array 
 */
async function setContactDatabase() {
    let contactData = await getContactDataFromFirebase('/contacts');
    let contactDataIds = Object.keys(contactData);
    contactDb = [];
    for (let index = 0; index < contactDataIds.length; index++) {
        contactDb.push({
            objectId: contactDataIds[index],
            data: contactData[contactDataIds[index]]
        })
    };
    renderContactDatabaseObjects()
}

/**
 * Renders Database in DOM
 */
function renderContactDatabaseObjects() {
    for (let index = 0; index < contactDb.length; index++) {
        contactDiv.innerHTML += contactTemplate(index);
    }
}

////////////////////////////////
// Firebase References and Logic

const baseURL = 'https://solo-join-default-rtdb.europe-west1.firebasedatabase.app/'

/**
 * Loads Firebase Realtime DB
 */
async function getContactDataFromFirebase(path = "") {
    let fetchGetResponse = await fetch(baseURL + path + '.json')
    return getResponseToJson = await fetchGetResponse.json();
}

/**
 * Push Input Values To Firebase Realtime DB
 */
async function pushContactDataToFirebase(path = "", input) {
    try {
        await fetch(baseURL + path + '.json', {
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
        await initializeContacts()
    }
}

async function pushEditContactDataToFirebase(path = "", id, input) {
    console.log(id)
    try {
        await fetch(baseURL + path + id + '.json', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        });
    }
    catch (error) {
        console.log('Error Brudi');
    } finally {
        await initializeContacts()
    }
}

/**
 * Deletes Card at Path (ID)
 */
async function deleteContactCard(path = "", id) {
    try {
        await fetch(baseURL + path + id + '.json', {
            method: "DELETE"
        });
    }
    catch (error) {
        console.log('Error Brudi');
    } finally {
        await initializeContacts()
    }
}

////////////////////////////////
// Input References and Form Logic

let nameInputRef = document.getElementById('name');
let emailInputRef = document.getElementById('email');
let editNameInputRef;
let editEmailInputRef;

/**
 * Resets Input Field Values
 */
function resetContactInputFields() {
    nameInputRef.value = '';
    emailInputRef.value = '';
}

function resetEditContactFields() {
    editNameInputRef.value = '';
    editEmailInputRef.value = '';
}

/**
 * Gets Input Field Data and Stores Data in Object
 */
function getContactInputData(event) {
    event.preventDefault()
    let name = nameInputRef.value;
    let email = emailInputRef.value
    input = {
        name: name,
        email: email
    }
    pushContactDataToFirebase('contacts', input);
    resetContactInputFields();
}

/**
 * Gets Edit Input Field Data and Stores Data in Object
 */
function getContactEditData(event, id) {
    event.preventDefault()
    const editNameInputRef = document.getElementById(`name-${id}`);
    const editEmailInputRef = document.getElementById(`email-${id}`);
    let newName = editNameInputRef.value;
    let newEmail = editEmailInputRef.value;
    input = {
        name: newName,
        email: newEmail
    }
    pushEditContactDataToFirebase('contacts/', id, input);
    resetEditContactFields();
}