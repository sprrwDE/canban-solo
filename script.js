// Firebase References
let baseURL = 'https://solo-join-default-rtdb.europe-west1.firebasedatabase.app/'
let testdiv = document.getElementById('testdiv')
const testInputValue = document.getElementById('test');
let database = [];

function push() {
    data = testInputValue.value;
    pushDataToFirebase('/test', data);
}

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

async function getDataFromFirebase(path) {
    let response = await fetch(baseURL + path + '.json')
    let responseToJson = await response.json();


    database = responseToJson;
    console.log(database);
    let test = Object.entries(database)
    console.log(test);
}