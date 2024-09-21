/**
 * Task Form Assign to Contact Template String
 */
function assignToContact(i) {
    return `
    <div>
        <input type="checkbox" id="assign-${i}" name="assign-contact" value="${contactDb[i].data.name}">
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
 * Contact Template String
 */
function contactTemplate(i) {
    return `
    <div class="card" id="card-${contactDb[i].objectId}">
        <div class="content contact">
            <p>name: ${contactDb[i].data.name}</p>
            <p>email: ${contactDb[i].data.email}</p>
            <h4 class="margin-low">Edit<h4>
            <form>
                <input type="text" id="name-${contactDb[i].objectId}" placeholder="name">
                <input type="text" id="email-${contactDb[i].objectId}" placeholder="email">
                <button class="margin-low" type="submit" onclick="getEditContactData(event, '${contactDb[i].objectId}')">submit</button>
            </form>
        </div>
        <div class="close" onclick="deleteAssigned('${contactDb[i].data.name}')">X</div>
    </div>`
}

// deleteCard('contacts/', '${contactDb[i].objectId}'),

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
    <li>${assignedContact}</li>
    `
}