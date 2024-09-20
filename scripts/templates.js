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
        <div class="close" onclick="deleteCard('contacts/', '${contactDb[i].objectId}')">X</div>
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
            <p>assigned to: ${prio[i].data.assigned}</p>

            <ul class="render-subtask" id="card-${prio[i].objectId}"></ul>
            <div class="subtask-input">
                <input type="text" id="sub-${prio[i].objectId}" placeholder="subtask">
                <button class="margin-low" type="submit" onclick="addSubtaskCard()">add subtask</button>
            </div>

        </div>
        <div class="close" onclick="deleteCard('tasks/', '${prio[i].objectId}')">X</div>
    </div>`
}

/**
 *  Subtask Card Template String
 */
function subtaskCardTemplate(sub, n) {
    return `
    <li>${sub[n]} | <span class="pointer" onclick="deleteSubtaskCard('${n}')">x</span></li></li>
    `
}

function deleteSubtaskCard(n) {
    subtasks.splice(n, 1)
    let sub = getSubtaskObject()
    const currentTaskObject = database.find((task) => task.objectId === currentCardId)
    input = {
        headline: currentTaskObject.data.headline,
        text: currentTaskObject.data.text,
        status: currentTaskObject.data.status,
        assigned: currentTaskObject.data.assigned,
        subtask: sub
    }
    pushEditDataToFirebase('tasks/', currentCardId , input);

    console.log("new input", input)
    console.log("current task object", currentTaskObject)
    console.log("new subtask object", sub)
    console.log("current card id", currentCardId)
    console.log("current index", n)
    console.log("current subtask array", sub);
}

function addSubtaskCard() {
    console.log(currentCardId)
    console.log(subtasks);
    // sub.push input value
    // sub.reduce({} {}) oder so
    // input value bestimmen, find-currentCardId?
    // push
    // render
}


//// Subtask editieren, in Firebase pushen, Rendern
    // wieder in objekt umwandeln, werte übergeben
//// Subtask entfernen