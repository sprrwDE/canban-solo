/**
 * Task Form Assign to Contact Template String
 */
function assignToContact(i) {
    return `
    <div>
        <input type="checkbox" id="assign-${i}" name="assign-contact" value="${contactDb[i].data.name}" data-color="${contactDb[i].data.color}">
        <label for="assign-${contactDb[i].objectId}">${contactDb[i].data.name}</label>
    </div>`;
}

/**
 * Renders Subtasks in Task Form
 */
function subTaskTemplate(i) {
    return `
    <li>${subtasks[i]} | <span class="pointer" onclick="deleteSubtask(${[i]})">x</span></li>`
} 


/**
 *  Sorted Contact Initials
 */
function sortedInitials(i, sortedContactsArray) {
    return `<h1>${sortedContactsArray[i][0]}</h1>
    <div class="rendercontacts" id="render-contacts${i}"></div>`
}

/**
 * Contact Template String
 */
function contactTemplate(groupedContacts, i) {
    return `
    <div class="card" id="card-${groupedContacts[i].objectId}" style="background-color: ${groupedContacts[i].data.color}">
        <div class="content contact">
            <p>name: ${groupedContacts[i].data.name}</p>
            <p>email: ${groupedContacts[i].data.email}</p>
            <h4 class="margin-low">Edit<h4>
            <form>
                <input type="text" id="name-${groupedContacts[i].objectId}" placeholder="name">
                <input type="text" id="email-${groupedContacts[i].objectId}" placeholder="email">
                <button class="margin-low" type="submit" onclick="getEditContactData(event, '${groupedContacts[i].objectId}', '${i}')">submit</button>
            </form>
        </div>
        <div class="close" onclick="deleteCard('contacts/', '${groupedContacts[i].objectId}'), deleteAssigned('${groupedContacts[i].data.name}')">X</div>
    </div>`
}

/**
 * Task Template String
 */
function taskTemplate(i, prio) {
    return `
    <div class="boardcard" draggable="true" ondragstart="startDragging('${prio[i].objectId}')">
        <div class="content board">
            <p>${prio[i].data.headline}</p>
            <p>${prio[i].data.text}</p>
            <p>status: ${prio[i].data.status}</p>
            <p>assigned to:</p>
            <div id="assigned-to-${prio[i].objectId}"></div>

            <ul class="render-subtask" id="card-${prio[i].objectId}"></ul>
            <div class="subtask-input">
                <input type="text" id="sub-${prio[i].objectId}" placeholder="subtask">
                <button class="margin-low" type="submit" onclick="addSubtaskCard('${prio[i].objectId}')">add subtask</button>
            </div>

        </div>
        <div class="close" onclick="deleteCard('tasks/', '${prio[i].objectId}')">X</div>
    </div>`;
}

/**
 *  Subtask Card Template String
 */
function subtaskCardTemplate(taskId, sub, n) {
    return `
    <li>${sub[n]} | <span class="pointer" onclick="deleteSubtaskCard('${taskId}', ${n})">x</span></li>
    `;
}

/**
 *  Assigned To Card Template String
 */
function assignedCardTemplate(assignedContact) {
    return `
    <li>${assignedContact.name}</li>
    `
}
