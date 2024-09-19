let currentTaskId

function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    currentTaskId = id;
}

function moveTo(status) {
    let task = database.find(task => task.objectId === currentTaskId);
    input = {
        headline: task.data.headline,
        text: task.data.text,
        status: status,
        assigned: task.data.assigned
    }
    pushEditDataToFirebase(path = "tasks/", currentTaskId, input)
}

