// Firebase References
let baseURL = 'https://solo-join-default-rtdb.europe-west1.firebasedatabase.app/'
const testInputValue = document.getElementById('test');
let database = [];

/**
 * Initializes Database Logic
 */
async function init() {
    let data = await getDataFromFirebase('/test');
    let dataIds = Object.keys(data);

    for (let index = 0; index < dataIds.length; index++) {
        database.push ({
            objectId: dataIds[index],
            data: data[dataIds[index]]
        })
    };

    console.log('Database:', database)
}

/**
 * Loads Firebase Realtime DB
 */
async function getDataFromFirebase(path="") {
    let response = await fetch(baseURL + path + '.json')
    return responseToJson = await response.json();
}

/**
 * Gets Input Data
 */
function getInputData() {
    data = testInputValue.value;
    pushDataToFirebase('/test', data);
}

/**
 * Push Input Values To Firebase Realtime DB
 */
async function pushDataToFirebase(path="", data) {
    try { 
        await fetch(baseURL + path + '.json', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: data
    }); }
    catch(error) {
        console.log ('Error Brudi');
    }
}