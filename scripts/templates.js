/**
 * Task Form Assign to Contact Template String
 */
function assignToContact(i) {
    return `
    <div onclick="setCurrentIndex(${i})">
        <input type="radio" id="assign-${i}" name="assign-contact" value="${contactDb[i].data.name}">
        <label for="assign-${contactDb[i].objectId}">${contactDb[i].data.name}</label>
    </div>`;
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
        <div class="close" onclick="deleteCard('contacts/', '${contactDb[i].objectId}')">X</div>
    </div>`
}

/**
 * Urgent Template String
 */
function urgentCardTemplate(i) {
    return `
    <div class="boardcard" draggable="true" ondragstart="startDragging('${urgent[i].objectId}')">
        <div class="content board">
            <p>${urgent[i].data.headline}</p>
            <p>${urgent[i].data.text}</p>
            <p>status: ${urgent[i].data.status}</p>
            <p>assigned to: ${urgent[i].data.assigned}</p>

            <div class="render-subtask" id="card-${urgent[i].objectId}></div>
            <div class="subtask-input">
                <input type="text" id="sub-${urgent[i].objectId}" placeholder="subtask">
                <button class="margin-low" type="submit" onclick="">add subtask</button>
            </div>

        </div>
        <div class="close" onclick="deleteCard('tasks/', '${urgent[i].objectId}')">X</div>
    </div>`
}

/**
 * Medium Template String
 */
function mediumCardTemplate(i) {
    return `
    <div class="boardcard" id="card-${medium[i].data.name}" draggable="true" ondragstart="startDragging('${medium[i].objectId}')">
        <div class="content board">
            <p>${medium[i].data.headline}</p>
            <p>${medium[i].data.text}</p>
            <p>status: ${medium[i].data.status}</p>
            <p>assigned to: ${medium[i].data.assigned}</p>

            <div class="render-subtask" id="sub-${medium[i].objectId}></div>
            <div class="subtask-input">
                <input type="text" id="name-${medium[i].objectId}" placeholder="subtask">
                <button class="margin-low" type="submit" onclick="">add subtask</button>
            </div>

        </div>
        <div class="close" onclick="deleteCard('tasks/', '${medium[i].objectId}')">X</div>
    </div>`
}

/**
 * Low Template String
 */
function lowCardTemplate(i) {
    return `
    <div class="boardcard" id="card-${low[i].data.name}" draggable="true" ondragstart="startDragging('${low[i].objectId}')">
        <div class="content board">
            <p>${low[i].data.headline}</p>
            <p>${low[i].data.text}</p>
            <p>status: ${low[i].data.status}</p>
            <p>assigned to: ${low[i].data.assigned}</p>

            <div class="render-subtask" id="card-${low[i].objectId}></div>
            <div class="subtask-input">
                <input type="text" id="sub-${low[i].objectId}" placeholder="subtask">
                <button class="margin-low" type="submit" onclick="">add subtask</button>
            </div>

        </div>
        <div class="close" onclick="deleteCard('tasks/', '${low[i].objectId}')">X</div>
    </div>`
}