let currentTaskId

/**
 * Allows to Drop on Div
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Defines currentTaskId on Dragging
 */
function startDragging(id) {
    currentTaskId = id;
}

/**
 * Updates Status on Key Release
 */
function moveTo(status) {
    let task = database.find(task => task.objectId === currentTaskId);
    input = {
        headline: task.data.headline,
        text: task.data.text,
        status: status,
        assigned: task.data.assigned,
        subtask: task.data.subtask
    }
    pushEditDataToFirebase(path = "tasks/", currentTaskId, input)
}