/**
 * Contact Template String
 */
function contactTemplate(i) {
    return `
    <div class="card" id="card-${contactDb[i].objectId}">
        <div class="content contact">
            <p>name: ${contactDb[i].data.name}</p>
            <p>email: ${contactDb[i].data.email}</p>
            <h4>Edit<h4>
            <form>
                <input type="text" id="name-${contactDb[i].objectId}">
                <input type="text" id="email-${contactDb[i].objectId}">
                <button type="submit" onclick="getEditContactData(event, '${contactDb[i].objectId}')">submit</button>
            </form>
        </div>
        <div class="close" onclick="deleteContactCard('contacts/', '${contactDb[i].objectId}')">X</div>
    </div>`
}

/**
 * Board Template String
 */
function boardCardTemplate(i) {
    return `
    <div class="boardcard" id="card-${database[i].data.name}" draggable="true">
        <div class="content board">
            <p>${database[i].data.name}</p>
            <p>${database[i].data.age}</p>
            <p>status: ${database[i].data.status}</p>
            <p>assigned to: ${database[i].data.assigned}</p>
        </div>
        <div class="close" onclick="deleteCard('test/', '${database[i].objectId}')">X</div>
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