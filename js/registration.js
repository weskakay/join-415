async function getData(path = "/login-data", login) {
  try {
    let response = await fetch(BASE_URL + path + ".json");
    login = await response.json();
    proofLoginData(login);
  } catch (error) {
    console.log("Error fetching login data", error);
  }
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
        edit_data("/current-user", findUser);
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

function registrationData() {
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
  }
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

function openGuestLogin() {
  let guest = {
    name: "Guest",
  };
  edit_data("/current-user", guest);
  openSummary();
}

function showPassword() {
  var x = document.getElementById("password-login");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
