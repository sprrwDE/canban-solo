// DOM References
const contactDiv = document.getElementById('list-left');
const fieldset = document.getElementById('assign');

// Input References and Form Logic
let nameInputRef = document.getElementById('name');
let emailInputRef = document.getElementById('email');
let editNameInputRef;
let editEmailInputRef;

// Database
let contactDb = [];

////////////////////////////////
// Form Logic

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
    pushDataToFirebase('contacts', input);
    resetContactInputFields();
}

/**
 * Gets Edit Input Field Data and Stores Data in Object
 */
function getEditContactData(event, id) {
    event.preventDefault()
    editNameInputRef = document.getElementById(`name-${id}`);
    editEmailInputRef = document.getElementById(`email-${id}`);
    let newName = editNameInputRef.value;
    let newEmail = editEmailInputRef.value;
    input = {
        name: newName,
        email: newEmail
    }
    pushEditDataToFirebase('contacts/', id, input);
    resetEditContactFields();
}

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

////////////////////////////////
// Render Logic

/**
 * Initializes Database Logic
 */
async function initializeContacts() {
    contactDiv.innerHTML = '';
    fieldset.innerHTML = '';
    setContactDatabase()
}

/**
 * Defines the Database Array 
 */
async function setContactDatabase() {
    let contactData = await getDataFromFirebase('/contacts');
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
        fieldset.innerHTML += assignToContact(index);
    }
}