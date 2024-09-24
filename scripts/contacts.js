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
    let name = nameInputRef.value.trim();
    let email = emailInputRef.value
    input = {
        name: name,
        email: email,
        color: getRandomColor()
    }
    pushDataToFirebase('contacts', input);
    resetContactInputFields();
}

/**
 * Gets Edit Input Field Data and Stores Data in Object
 */
function getEditContactData(event, id, i) {
    event.preventDefault()
    editNameInputRef = document.getElementById(`name-${id}`);
    editEmailInputRef = document.getElementById(`email-${id}`);
    let newName = editNameInputRef.value.trim();
    let newEmail = editEmailInputRef.value;
    let color = contactDb[i].data.color;
    input = {
        name: newName,
        email: newEmail,
        color: color
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
    if (!contactData) {
        console.warn('Gibt keine Kontakte Bro');
        contactData = {};
    }
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

let currentContact;

/**
 * Renders Database in DOM
 */
function renderContactDatabaseObjects() {
    loadAssigned();
    const sortedContacts = sortContactInitials()
    const sortedContactsArray = Object.entries(sortedContacts).sort()
    contactDiv.innerHTML = '';
    for (let index = 0; index < sortedContactsArray.length; index++) {
        contactDiv.innerHTML += sortedInitials(index, sortedContactsArray)
        let groupedContacts = sortedContactsArray[index][1]
        const contactDivRev = document.getElementById(`render-contacts${index}`)
        contactDivRev.innerHTML = '';

        for (let c = 0; c < groupedContacts.length; c++) {
            contactDivRev.innerHTML += contactTemplate(groupedContacts, c);
        }
    }
}

/**
 * Rendes Contacts into Task Form to Assign
 */
function loadAssigned() {
    fieldset.innerHTML = '';
    for (let a = 0; a < contactDb.length; a++) {
        currentContact = contactDb[a].objectId;
        fieldset.innerHTML += assignToContact(a);
    }
}

/**
 * Reduces Contact DB into Object and Sorts Initials
 */
function sortContactInitials() {
    return contactDb.reduce((result, contact) => {
        const contactNameArray = contact.data.name.split(" ")
        const lastName = contactNameArray[contactNameArray.length - 1]
        const initial = lastName.charAt(0).toUpperCase()
        if (!result[initial]) {
            result[initial] = []
        }
        result[initial].push(contact)
        return result;
    }, {});
}

/**
 * Deletes Assigned Contact out of Task
 */
function deleteAssigned(askedname) {
    const assignedObjects = findAllAssigned(askedname);
    for (let i = 0; i < assignedObjects.length; i++) {
        const array = assignedObjects[i].data.assigned
        const index = array.indexOf(askedname);
        array.splice(index, 1);

        const newAssign = array.reduce((obj, name, index) => {
            obj[index] = name;
            return obj;
        }, {});
        deleteAssignCard(assignedObjects[i], newAssign)
    }
}
/**
 * Loops to all Tasks which contain assigned name and saves in array
 */
function findAllAssigned(name) {
    let results = [];
    for (let i = 0; i < database.length; i++) {
        const assignedArray = database[i].data.assigned;
        if (assignedArray.some(item => item.name === name)) {
            results.push(database[i]);
        }
    }
    return results;
}

/**
 *  Deletes Subtask out of Card Template
 */
function deleteAssignCard(currentTaskObject, newAssign) {
    let taskId = currentTaskObject.objectId
    const input = {
        headline: currentTaskObject.data.headline,
        text: currentTaskObject.data.text,
        status: currentTaskObject.data.status,
        assigned: newAssign,
        subtask: currentTaskObject.data.subtask
    };
    pushEditDataToFirebase('tasks/', taskId, input, false);
    renderSubtaskCard(currentTaskObject);
}

// Wenn Kontakt editiert wird muss dieser auch bei assigned editiert werden
// siehe oben nur anderer promis
// daten holen input erstellen bla blub