let login;

async function getLoggedIn() {
  try {
    await getLoginData(path = "/login-data")
    proofLoginData(login);
  } catch (error) {
    console.log("Error fetching login data", error);
  }
}

async function getLoginData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  login = await response.json();
}

async function proofLoginData(userId, findUser) {
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
        await edit_data("/current-user", findUser);
        openSummary();
        return;
      }
    }
    console.log("No user found with that email.");
    emailLogin.classList.add("wrong-password");
    passwordLogin.classList.add("wrong-password");
    document.getElementById("error-login").classList.remove("d_none");
  } catch (error) {
    console.error("Error fetching login data:", error);
  }
}

async function registrationData() {
  let email = document.getElementById("email-input");
  let password = document.getElementById("password-input");
  let name = document.getElementById("name-input");
  let confPassword = document.getElementById("confirm-password-input");
  
  if (confirmPassword()) {
    update_data("/login-data", {
      email: `${email.value.trim()}`,
      password: `${password.value.trim()}`,
      name: `${name.value.trim()}`,
    });

    console.log("user is successfully registered");
  } else {
    confPassword.classList.add("wrong-password");
    document.getElementById("error-pw").classList.remove("d_none");

    console.log("wrong password");
  }}

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

async function openGuestLogin() {
  let guest = {
    name: "Guest",
  };
  await edit_data("/current-user", guest);
  openSummary();
}

document.addEventListener("DOMContentLoaded", function () {
  let passwordField = document.getElementById("password-login");
  let toggleButton = document.getElementById("toggle-password");

  toggleButton.addEventListener("click", togglePasswordVisibility);
  passwordField.addEventListener("focus", handleFocus);
  passwordField.addEventListener("blur", handleBlur);
});

function togglePasswordVisibility() {
  let { passwordField, eyeIcon } = getContent();

  if (passwordField.type === "password") {
    setPasswordVisible(passwordField, eyeIcon);
  } else {
    setPasswordHidden(passwordField, eyeIcon);
  }
}

function setPasswordVisible(passwordField, eyeIcon) {
  passwordField.type = "text";
  eyeIcon.src = "../assets/icons/login_signup/visibility.svg";
}

function setPasswordHidden(passwordField, eyeIcon) {
  passwordField.type = "password";
  eyeIcon.src = "../assets/icons/login_signup/visibility_off.svg";
}

function handleFocus() {
  let { passwordField, eyeIcon } = getContent();

  if (passwordField.value === "") {
    eyeIcon.src = "../assets/icons/login_signup/visibility_off.svg";
  }
}

function handleBlur() {
  let { passwordField, eyeIcon } = getContent();

  if (passwordField.value === "") {
    eyeIcon.src = "../assets/icons/login_signup/lock.svg";
  }
}

function getContent() {
  return {
    eyeIcon: document.getElementById("eye-icon"),
    passwordField: document.getElementById("password-login"),
  };
}
