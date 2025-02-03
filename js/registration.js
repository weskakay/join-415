const FIREBASE_URL =
  "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";
let UserLoginKey;

async function getData(path = "/login-data", login) {
  let response = await fetch(FIREBASE_URL + path + ".json");
  login = await response.json();
  proofLoginData(login);
}

async function getUserPerID() {
  let responseTest = await fetch(
    `https://join-415-default-rtdb.europe-west1.firebasedatabase.app/login-data/${UserLoginKey}.json`
  );
  let test = await responseTest.json();
  console.log(test);
}

async function proofLoginData(login, userId, findUser) {
  let emailLogin = document.getElementById("email-login");
  let passwordLogin = document.getElementById("password-login");
  let loginData = Object.values(login || {});
  try {
    for (let id in loginData) {
      if (
        loginData[id].email === emailLogin.value.trim() &&
        loginData[id].password === passwordLogin.value.trim()
      ) {
        findUser = loginData[id];
        userId = Object.keys(login)[id];
        break;
      }
    }
    UserLoginKey = "";
    if (findUser) {
      UserLoginKey = userId;
      console.log("id:", UserLoginKey);
      console.log("User found:", findUser);
      openGuestLogin();
    } else {
      console.log("No user found with that email.");
      emailLogin.classList.add("wrong-password");
      passwordLogin.classList.add("wrong-password");
      document.getElementById("error-login").classList.remove("d_none");
    }
  } catch (error) {
    console.error("Error fetching login data:", error);
  }
}

function registrationData() {
  let email = document.getElementById("email-input");
  let password = document.getElementById("password-input");
  let name = document.getElementById("name-input");
  let confPassword = document.getElementById("confirm-password-input");

  if (confirmPassword()) {
    postData("/login-data", {
      email: `${email.value.trim()}`,
      password: `${password.value.trim()}`,
      name: `${name.value.trim()}`,
      contacts: `Aris Karamat`,
    });

    console.log("user is successfully registered");
  } else {
    confPassword.classList.add("wrong-password");
    document.getElementById("error-pw").classList.remove("d_none");

    console.log("wrong password");
  }
}

async function postData(path = "", data = {}) {
  let response = await fetch(FIREBASE_URL + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

function openLoginHTML() {
  window.location.href = "../html/login.html";
}

function openSignUpHTML() {
  window.location.href = "../html/signup.html";
}

function openGuestLogin() {
  window.location.href = "../html/summary.html";
}

function confirmPassword() {
  let passwordInput = document.getElementById("password-input");
  let confPasswordInput = document.getElementById("confirm-password-input");

  if (passwordInput.value.trim() === confPasswordInput.value.trim()) {
    return true;
  } else {
    return false;
  }
}

function changePWImage() {
  let pwInput = document.getElementById("password-input");

  pwInput.style.backgroundImage =
    "url(../assets/icons/login_signup/visibility_off.svg)";
}

function changeConfPWImage() {
  let confPWInput = document.getElementById("confirm-password-input");
  confPWInput.style.backgroundImage =
    "url(../assets/icons/login_signup/visibility_off.svg)";
}

function changeImageLogin() {
  let pwLogin = document.getElementById("password-login");
  pwLogin.style.backgroundImage =
    "url(../assets/icons/login_signup/visibility_off.svg)";
}

function changeLogoSize() {
  let joinHome = document.getElementById("join-home");

  joinHome.classList.add("logo-animation");
  setTimeout(() => {
    openLoginHTML();
  }, 1000);
}
