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
    console.log("Kontakte:", contactDb);
    for (let index = 0; index < contactDb.length; index++) {
        let initials = getInitials(index);
        console.log("Nachname Initial:", initials.charAt(1));
        currentContact = contactDb[index].objectId;
        contactDiv.innerHTML += contactTemplate(index);
        fieldset.innerHTML += assignToContact(index);
    }
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