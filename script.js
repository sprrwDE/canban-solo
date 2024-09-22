const baseURL = 'https://solo-join-default-rtdb.europe-west1.firebasedatabase.app/'

/**
 * Initializes Database Logic
 */
async function init() {
    initializeContacts();
    inititializeBoard();
}

/**
 * Generates random Hex Color
 */
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
* Defines initials of current name
*/
function getInitials(i) {
    let nameArray = contactDb[i].data.name.split(" ");
    let first = nameArray[0].charAt(0).toUpperCase();
    let last = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
    let initials = `${first}${last}`
    return initials
}