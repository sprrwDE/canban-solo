/**
 * General Template String
 */
function contactTemplate(i) {
    return `
    <div class="card" id="card-${contactDb[i].objectId}">
        <div class="content contact">
            <p>${contactDb[i].data.name}</p>
            <p>${contactDb[i].data.email}</p>
            <form>
                <input type="text" id="name-${contactDb[i].objectId}">
                <input type="text" id="email-${contactDb[i].objectId}">
                <button type="submit" onclick="getEditContactData(event, '${contactDb[i].objectId}')">submit</button>
            </form>
        </div>
        <div class="close" onclick="deleteContactCard('contacts/', '${contactDb[i].objectId}')">X</div>
    </div>`
}

// Funktion um nur die jeweilige Karte zu Updaten (find)
// Methoden lernen