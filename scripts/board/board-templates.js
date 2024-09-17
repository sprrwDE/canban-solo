/**
 * General Template String
 */
function boardCardTemplate(i) {
    return `
    <div class="boardcard" id="card-${database[i].data.name}" draggable="true">
        <div class="content board">
            <p>${database[i].data.name}</p>
            <p>${database[i].data.age}</p>
        </div>
        <div class="close" onclick="deleteCard('test/', '${database[i].objectId}')">X</div>
    </div>`
}

// Funktion um nur die jeweilige Karte zu Updaten (find)
// Methoden lernen