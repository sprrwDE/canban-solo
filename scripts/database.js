/**
 * Loads Firebase Realtime DB (GET)
 */
async function getDataFromFirebase(path = "") {
    let fetchGetResponse = await fetch(baseURL + path + '.json')
    return getResponseToJson = await fetchGetResponse.json();
}

/**
 * Pushes Form Input Data To Firebase Realtime DB
 */
async function pushDataToFirebase(path = "", input) {
    console.log(input);
    try {
        await fetch(baseURL + path + '.json', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        });
    }
    catch (error) {
        console.log('Error Brudi');
    } finally {
        await initializeContacts();
        await inititializeBoard();
    }
}

/**
 * Pushes Edited Data to Firebase
 */
async function pushEditDataToFirebase(path = "", id = "", input) {
    try {
        await fetch(baseURL + path + id + '.json', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        });
    }
    catch (error) {
        console.log('Error Brudi');
    } finally {
        await initializeContacts();
        await inititializeBoard();
    }
}

/**
 * Deletes Card at Path and ID (works for both tasks and contacts)
 */
async function deleteCard(path = "", id = "", shouldInitialize = true) {
    try {
        await fetch(baseURL + path + id + '.json', {
            method: "DELETE"
        });
    }
    catch (error) {
        console.log('Error Brudi');
    } finally {
        if (shouldInitialize) {
            await initializeContacts();
            await inititializeBoard();
        }
    }
}