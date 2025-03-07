let login;

/**
 * Fetches login data from Firebase at the specified path and assigns it to the global 'login' variable.
 *
 * @async
 * @param {string} [path="/login-data"] - The Firebase path containing the login data.
 * @returns {Promise<void>}
 */
async function getLoggedIn() {
  try {
    await getLoginData((path = "/login-data"));
    proofLoginData(login);
  } catch (error) {
    console.log("Error fetching login data", error);
  }
}

/**
 * Loads login data from Firebase and stores it in the global 'login' variable.
 *
 * @async
 * @param {string} [path=""] - The path in Firebase (e.g., "/login-data").
 * @returns {Promise<void>}
 */
async function getLoginData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  login = await response.json();
}

/**
 * Compares the login inputs (email, password) against existing user credentials in Firebase.
 * If there's a match, the current user is set in Firebase and the user is redirected.
 *
 * @async
 * @param {string} [userId] - Optional user ID
 * @param {object} [findUser] - Optional user object if found
 * @returns {Promise<void>}
 */
async function proofLoginData(userId, findUser) {
  let emailLogin = document.getElementById("email-login");
  let passwordLogin = document.getElementById("password-login");
  let loginData = Object.values(login || {});
  try {
    await proofLoginTry(emailLogin, passwordLogin, loginData, userId, findUser);
  } catch (error) {
    console.error("Error fetching login data:", error);
  }
}

/**
 * Iterates through login data to check if the provided email and password match any user.
 * If matched, the user is set as the current user in Firebase, and the page navigates to the summary.
 *
 * @async
 * @param {HTMLElement} emailLogin - The email input element
 * @param {HTMLElement} passwordLogin - The password input element
 * @param {Array} loginData - An array of all login data objects
 * @param {string} userId - Optional user ID
 * @param {object} findUser - Optional user object if found
 */
async function proofLoginTry(
  emailLogin,
  passwordLogin,
  loginData,
  userId,
  findUser,
) {
  for (let id in loginData) {
    if (
      loginData[id].email === emailLogin.value.trim() &&
      loginData[id].password === passwordLogin.value.trim()
    ) {
      findUser = loginData[id];
      userId = Object.keys(login)[id];
      await edit_data("/current-user", findUser);
      changeNavbarItems(
        window.innerWidth < 960 ? "mobile_greeting" : "summary",
      );
      regAlright("logErrorName", "logInpName");
      regAlright("logErrorPw", "logInpPw");

      return;
    } else {
      regError("logErrorName", "logInpName");
      regError("logErrorPw", "logInpPw");
    }
  }
}

/**
 * Collects user registration data, validates input (name/email/password),
 * and writes the new user entry to Firebase 'login-data'.
 *
 * @async
 * @returns {Promise<void>}
 */
async function registrationData() {
  let email = document.getElementById("email-input");
  let password = document.getElementById("password-input");
  let name = document.getElementById("name-input");
  let checkBox = document.getElementById("privacyPolicy");
  let nameValid = checkRegistrationData(name, "regErrorName", "regInpName");
  let emailValid = checkRegistrationData(email, "regErrorEmail", "regInpEmail");
  let passValid = checkRegistrationData(password, "regErrorPw", "regInpPw");
  let checkBoxValid = checkBoxValidity(checkBox, "regErrorCheckBox");
  registrationValidation(
    nameValid,
    emailValid,
    passValid,
    checkBoxValid,
    email,
    password,
    name,
  );
}

/**
 * Validates registration form inputs (name, email, password, privacy checkbox).
 * If all are valid and passwords match, writes new user data in Firebase and redirects to "login".
 *
 * @async
 * @param {boolean} nameValid - Whether the name is valid
 * @param {boolean} emailValid - Whether the email is valid
 * @param {boolean} passValid - Whether the password is valid
 * @param {boolean} checkBoxValid - Whether the checkbox is checked
 * @param {HTMLElement} email - Email input element
 * @param {HTMLElement} password - Password input element
 * @param {HTMLElement} name - Name input element
 * @returns {Promise<void>}
 */
async function registrationValidation(
  nameValid,
  emailValid,
  passValid,
  checkBoxValid,
  email,
  password,
  name,
) {
  if (
    confirmPassword() == true &&
    emailValid == true &&
    passValid == true &&
    nameValid == true &&
    checkBoxValid == true
  ) {
    successNotice();
    await update_data("/login-data", {
      email: `${email.value.trim()}`,
      password: `${password.value.trim()}`,
      name: `${name.value.trim()}`,
    });
    await wait(2000);
    changeNavbarItems("login");
  } else {
    return;
  }
}

/**
 * Compares the 'password-input' and 'confirm-password-input' fields for equality.
 * Shows or hides error messages accordingly.
 *
 * @returns {boolean} True if passwords match and are non-empty, false otherwise.
 */
function confirmPassword() {
  let passwordInput = document.getElementById("password-input");
  let confPasswordInput = document.getElementById("confirm-password-input");
  if (
    passwordInput.value.trim() === confPasswordInput.value.trim() &&
    (passwordInput.value.trim() && confPasswordInput.value.trim()) != ""
  ) {
    regAlright("regErrorPwCheck", "regInpPwCheck");
    return true;
  } else {
    regError("regErrorPwCheck", "regInpPwCheck");
    return false;
  }
}

/**
 * Checks a given input's value against its pattern. Shows an error if it fails.
 *
 * @param {HTMLElement} insertedData - The input element (e.g. name, email, password).
 * @param {string} remove - The ID of an error element to remove (e.g. 'regErrorName')
 * @param {string} add - The ID of an element to show if invalid (e.g. 'regInpName')
 * @returns {boolean} - True if the input is valid, false if not.
 */
function checkRegistrationData(insertedData, remove, add) {
  let insertedDataValue = insertedData.value.trim();
  let insertedDataPattern = new RegExp(insertedData.pattern);
  if (!insertedDataPattern.test(insertedDataValue)) {
    regError(remove, add);
    return false;
  } else {
    regAlright(remove, add);
    return true;
  }
}

/**
 * Checks if the "privacy policy" checkbox is checked and updates error message visibility.
 *
 * @param {HTMLElement} checkBox - The checkbox input element
 * @param {string} remove - The ID of an error element to remove/hide
 * @returns {boolean} True if the checkbox is checked, false otherwise.
 */
function checkBoxValidity(checkBox, remove) {
  if (checkBox.checked == true) {
    document.getElementById(remove).classList.add("d_none");

    return true;
  } else {
    document.getElementById(remove).classList.remove("d_none");
  }
}

/**
 * Displays an error message and styling if an input is invalid.
 *
 * @param {string} remove - The ID of the error element to reveal
 * @param {string} add - The ID of the input element that gets error styling
 */
function regError(remove, add) {
  document.getElementById(remove).classList.remove("d_none");
  document.getElementById(add).classList.add("regDisplay");
}

/**
 * Hides an error message and styling if an input becomes valid.
 *
 * @param {string} remove - The ID of the error element to hide
 * @param {string} add - The ID of the input element where we remove error styling
 */
function regAlright(remove, add) {
  document.getElementById(remove).classList.add("d_none");
  document.getElementById(add).classList.remove("regDisplay");
}

/**
 * Changes the background image of the password input on key input (visual indicator).
 */
function changePWImage() {
  let pwInput = document.getElementById("password-input");

  pwInput.style.backgroundImage =
    "url(../assets/icons/login_signup/visibility_off.svg)";
}

/**
 * Changes the background image of the confirm-password input (visual indicator).
 */
function changeConfPWImage() {
  let confPWInput = document.getElementById("confirm-password-input");
  confPWInput.style.backgroundImage =
    "url(../assets/icons/login_signup/visibility_off.svg)";
}

/**
 * Changes the background image of the login password field.
 */
function changeImageLogin() {
  let pwLogin = document.getElementById("password-login");
  pwLogin.style.backgroundImage =
    "url(../assets/icons/login_signup/visibility_off.svg)";
}

/**
 * Enlarges the Join logo as an animation, then navigates to the login page.
 */
function changeLogoSize() {
  let joinHome = document.getElementById("join-home");

  joinHome.classList.remove("join-home");
  joinHome.classList.add("logo-animation");
  setTimeout(() => {
    openLoginHTML();
  }, 1200);
}

/**
 * Logs in a "Guest" user (name: "Guest", password: 12345678) and navigates to summary or greeting.
 *
 * @async
 * @returns {Promise<void>}
 */
async function openGuestLogin() {
  let guest = {
    name: "Guest",
    password: 12345678,
  };
  await edit_data("/current-user", guest);
  getLoggedIn();
  changeNavbarItems(window.innerWidth < 960 ? "mobile_greeting" : "summary");
}

/**
 * Toggles the visibility of the password (password -> text, text -> password)
 * for the login password field.
 */
function togglePasswordVisibility() {
  let { passwordField, eyeIcon } = getContent();

  if (passwordField.type === "password") {
    setPasswordVisible(passwordField, eyeIcon);
  } else {
    setPasswordHidden(passwordField, eyeIcon);
  }
}

/**
 * Sets the password input to visible text and updates the eye icon.
 *
 * @param {HTMLInputElement} passwordField - The password input field
 * @param {HTMLImageElement} eyeIcon - The icon to toggle
 */
function setPasswordVisible(passwordField, eyeIcon) {
  passwordField.type = "text";
  eyeIcon.src = "../assets/icons/login_signup/visibility.svg";
}

/**
 * Sets the password input to hidden (password) and updates the eye icon.
 *
 * @param {HTMLInputElement} passwordField - The password input field
 * @param {HTMLImageElement} eyeIcon - The icon to toggle
 */
function setPasswordHidden(passwordField, eyeIcon) {
  passwordField.type = "password";
  eyeIcon.src = "../assets/icons/login_signup/visibility_off.svg";
}

/**
 * If the user focuses on the password field and it's empty, set an appropriate icon.
 */
function handleFocus() {
  let { passwordField, eyeIcon } = getContent();

  if (passwordField.value === "") {
    eyeIcon.src = "../assets/icons/login_signup/visibility_off.svg";
  }
}

/**
 * If the user leaves the password field empty, revert the icon to a lock image.
 */
function handleBlur() {
  let { passwordField, eyeIcon } = getContent();

  if (passwordField.value === "") {
    eyeIcon.src = "../assets/icons/login_signup/lock.svg";
  }
}

/**
 * Retrieves references to the password field and eye icon for toggling.
 *
 * @returns {object} - An object with { eyeIcon, passwordField } references.
 */
function getContent() {
  return {
    eyeIcon: document.getElementById("eye-icon"),
    passwordField: document.getElementById("password-login"),
  };
}

/**
 * Displays the registration success overlay.
 */
function successNotice() {
  document.getElementById("registrationOverlay").classList.toggle("d_none");
  let successContainer = document.getElementById("creationSuccessContainer");
  successContainer.classList.toggle("creationSuccessContainerClosed");
  successContainer.classList.toggle("creationSuccessContainer");
}

/**
 * Delays execution by a given number of milliseconds.
 *
 * @async
 * @param {number} ms - The number of milliseconds to wait
 * @returns {Promise<void>}
 */
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
