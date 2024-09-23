let loginScreenRef = document.getElementById('login');

let userArray = []

function logOut() {
    loginScreenRef.classList.remove('d-none')
}

function logIn(event) {
    if (event) { event.preventDefault() }
    loginScreenRef.classList.add('d-none')
}

async function initializeSignup() {
    let response = await getDataFromFirebase("user/");
    if (response) {
        userArray = Object.entries(response).map(([id, userData]) => ({ id, ...userData }));
        console.log("response", user);
    }
}

function getSignupInputData(event) {
    event.preventDefault();
    let signupEmailRef = document.getElementById('signup-email');
    let signupPwRef = document.getElementById('signup-pw');

    let data = {
        email: signupEmailRef.value,
        pw: signupPwRef.value
    }
    console.log("eingabe", data);
    pushDataToFirebase("user/", data)
    signupEmailRef.value = '';
    signupPwRef.value = '';
}

function contains(email, pw, event) {
    let userFound = userArray.find(user => user.email === email && user.pw === pw);

    if (userFound) {
        alert('Erfolgreich eingeloggt!');
        logIn(event);
    } else {
        alert('Falsche Userdaten');
    }
};

function getLoginInputData(event) {
    let loginEmailRef = document.getElementById('login-email');
    let loginPwRef = document.getElementById('login-pw');
    let email = loginEmailRef.value;
    let pw = loginPwRef.value;
    contains(email, pw, event)
    loginEmailRef.value = '';
    loginPwRef.value = '';
}