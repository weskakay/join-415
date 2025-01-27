const FIREBASE_URL = "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";

async function getData() {
    let response = await fetch(FIREBASE_URL + '/login-data.json');
    let login = await response.json();
    let emailLogin = document.getElementById('email-login').value.trim();
    let passwordLogin = document.getElementById('password-login').value.trim();
    let users = Object.values(login || {});
    let findUser = users.find(user => user.email === emailLogin && user.password === passwordLogin);
    try {
        if (findUser) {
            console.log('User found:', findUser);
            document.getElementById('login-card').innerHTML= `<div id="successfull"> Sie haben sich erfolgreich eingeloggt </div>`;
        } else {
            console.log('No user found with that email.');
        }
    } catch (error) {
        console.error('Error fetching login data:', error);
    }
}

function registrationData() {
    let email = document.getElementById('email-input');
    let password = document.getElementById('password-input');
    let name = document.getElementById('name-input');

    postData('/login-data', {
        'email': `${email.value.trim()}`,
        'password': `${password.value.trim()}`,
        'name': `${name.value.trim()}`,
    });

    console.log('user is successfully registered')
}

async function postData(path = "", data = {}) {
    let response = await fetch(FIREBASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}

function openSignUpHTML(){
window.location.href = '../html/signup.html';
}

function openGuestLogin(){
    window.location.href = '../html/summary.html';
}