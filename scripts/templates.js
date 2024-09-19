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
        <div class="close" onclick="deleteContactCard('contacts/', '${contactDb[i].objectId}')">X</div>
    </div>`
}

/**
 * Urgent Template String
 */
function urgentCardTemplate(i) {
    return `
    <div class="boardcard" id="card-${urgent[i].data.name}" draggable="true">
        <div class="content board">
            <p>${urgent[i].data.name}</p>
            <p>${urgent[i].data.age}</p>
            <p>status: ${urgent[i].data.status}</p>
            <p>assigned to: ${urgent[i].data.assigned}</p>
        </div>
        <div class="close" onclick="deleteCard('test/', '${urgent[i].objectId}')">X</div>
    </div>`
}

/**
 * Medium Template String
 */
function mediumCardTemplate(i) {
    return `
    <div class="boardcard" id="card-${medium[i].data.name}" draggable="true">
        <div class="content board">
            <p>${medium[i].data.name}</p>
            <p>${medium[i].data.age}</p>
            <p>status: ${medium[i].data.status}</p>
            <p>assigned to: ${medium[i].data.assigned}</p>
        </div>
        <div class="close" onclick="deleteCard('test/', '${medium[i].objectId}')">X</div>
    </div>`
}

/**
 * Medium Template String
 */
function lowCardTemplate(i) {
    return `
    <div class="boardcard" id="card-${low[i].data.name}" draggable="true">
        <div class="content board">
            <p>${low[i].data.name}</p>
            <p>${low[i].data.age}</p>
            <p>status: ${low[i].data.status}</p>
            <p>assigned to: ${low[i].data.assigned}</p>
        </div>
        <div class="close" onclick="deleteCard('test/', '${low[i].objectId}')">X</div>
    </div>`
}

/**
 * Assign to Contact
 */
function assignToContact(i) {
    return `
    <div onclick="setCurrentIndex(${i})">
        <input type="radio" id="assign-${i}" name="assign-contact" value="${contactDb[i].data.name}">
        <label for="assign-${contactDb[i].objectId}">${contactDb[i].data.name}</label>
    </div>`;
}