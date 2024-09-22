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