const FIREBASE_URL = "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";

async function getData() {
    let response = await fetch(FIREBASE_URL + '/login-data.json');
    let login = await response.json();
    proofLoginData(login)
}

async function proofLoginData(login) {
    let emailLogin = document.getElementById('email-login');
    let passwordLogin = document.getElementById('password-login');
    let loginData = Object.values(login || {});
    let findUser = loginData.find(user => user.email === emailLogin.value.trim() && user.password === passwordLogin.value.trim());

    try {
        if (findUser) {
            console.log('User found:', findUser);
            openGuestLogin()
        } else {
            console.log('No user found with that email.');
            emailLogin.classList.add('wrong-password');
            passwordLogin.classList.add('wrong-password');
            document.getElementById('error-login').classList.remove('d_none');
        }
    } catch (error) {
        console.error('Error fetching login data:', error);
    }
}

function registrationData() {
    let email = document.getElementById('email-input');
    let password = document.getElementById('password-input');
    let name = document.getElementById('name-input');
    let confPassword = document.getElementById('confirm-password-input');

    if (confirmPassword()) {
        postData('/login-data', {
            'email': `${email.value.trim()}`,
            'password': `${password.value.trim()}`,
            'name': `${name.value.trim()}`,
        });

        console.log('user is successfully registered')
    }
    else {
        confPassword.classList.add('wrong-password');
        document.getElementById('error-pw').classList.remove('d_none');
        console.log('wrong password');
    }
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

function openSignUpHTML() {
    window.location.href = '../html/signup.html';
}

function openGuestLogin() {
    window.location.href = '../html/summary.html';
}

function confirmPassword() {
    let passwordInput = document.getElementById('password-input');
    let confPasswordInput = document.getElementById('confirm-password-input');

    if (passwordInput.value.trim() === confPasswordInput.value.trim()) {
        return true
    }
    else { return false };
}