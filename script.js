const baseURL = 'https://solo-join-default-rtdb.europe-west1.firebasedatabase.app/'

/**
 * Initializes Database Logic
 */
async function init() {
    initializeContacts();
    inititializeBoard();
    test();
}