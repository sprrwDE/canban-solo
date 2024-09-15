/**
 * General Template String
 */
function testTemplate(i) {
    return `
    <div class="card">
        <div class="content">
            <p>${database[i].data.name}</p>
            <p>${database[i].objectId}</p>
        </div>
        <div class="close" onclick="deleteCard('test/', '${database[i].objectId}')">X</div>
    </div>`
}