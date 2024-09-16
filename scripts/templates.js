/**
 * General Template String
 */
function testTemplate(i) {
    return `
    <div class="card" id="card-${database[i].objectId}">
        <div class="content">
            <p>${database[i].data.name}</p>
            <p>${database[i].data.age}</p>
            <form>
                <input type="text" id="edit${database[i].objectId}">
                <input type="text" id="edit2-${database[i].objectId}">
                <button type="submit" onclick="getEditData('${database[i].objectId}')">submit</button>
            </form>
        </div>
        <div class="close" onclick="deleteCard('test/', '${database[i].objectId}')">X</div>
    </div>`
}

// Funktion um nur die jeweilige Karte zu Updaten (find)
// Methoden lernen