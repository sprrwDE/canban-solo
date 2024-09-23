let loginScreenRef = document.getElementById('login');

function logOut() {
    loginScreenRef.classList.remove('d-none')
}

function logIn(event) {
    event.preventDefault()
    loginScreenRef.classList.add('d-none')
}

async function initializeSignup() {
    let response = await getDataFromFirebase("user/");
    if (response) {
        let userArray = Object.entries(response).map(([id, userData]) => ({ id, ...userData }));
        console.log("response", userArray);
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
    pushDataToFirebase(path = "user/", data)

    /**
     * if (data.email == userArray.contains(email) && dara.pw == userArray.contains(pw) {
     * login()} else {
     * alert('falsche userdaten')})
     */
}

function getLoginInputData(event) {
    let loginEmailRef = document.getElementById('login-email');
    let loginPwRef = document.getElementById('login-pw');
}