const BASE_URL =
  "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";
let media = window.matchMedia("(max-width: 960px)");
let currentUser = null;

async function pageLoadHandler(id) {
  mediaQuery();
  getTimeGreeting();
  await loadCurrentUser(id);
  if (id === "contacts") {
    loadDataContacts();
  }
  if (id === "addtask") {
    loadDataAddTask();
  }
  if (id === "board") {
    loadDataBoard();
  }
  if (id === "summary") {
    loadDataSummary();
  }
}

function d_none(enterid) {
  document.getElementById(enterid).classList.toggle("d_none");
}

function noBubble(event) {
  event.stopPropagation();
}

function prevent(event) {
  event.preventDefault();
}

function changeNavbarItems(id) {
  window.location.href = `../html/${id}.html`;
}

function openHelp() {
  window.location.href = "../html/help.html";
}

function openLoginHTML() {
  window.location.href = "./html/login.html";
}

async function logOut() {
  let user = {
    name: "",
  };
  await edit_data("/current-user", user);
  changeNavbarItems("login");
}

function openSignUpHTML() {
  window.location.href = "../html/signup.html";
}

function openSummary() {
  window.location.href = "../html/summary.html";
}

function openLegalNotice() {
  window.location.href = "../html/legal_notice.html";
}

function openPrivacyPolicy() {
  window.location.href = "../html/privacy_policy.html";
}

function openAddTask(status) {
  if (window.innerWidth < 960) {
    window.location.href = "../html/addtask.html";
  } else {
    openAddTaskOverlay(status);
  }
}

function greetingAnimation() {
  if (window.innerWidth < 960) {
    setTimeout(() => {
      changeNavbarItems("summary");
    }, 2900);
  } else {
    changeNavbarItems("summary");
  }
}

/**
 * Sends a POST request to Firebase at the specified path, creating a new entry.
 *
 * @async
 * @param {string} [path=""] - The path in the Firebase Realtime DB (e.g. 'contacts/')
 * @param {object} [data={}] - The data to store
 * @returns {Promise<object>} - The response from Firebase, often containing a generated key
 */
async function update_data(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

/**
 * Deletes data at the specified path in the Firebase Realtime DB.
 *
 * @async
 * @param {string} path - The path where data should be removed (e.g. 'contacts/<id>')
 * @returns {Promise<object>} - The JSON response from Firebase
 */
async function delete_data(path) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
  return await response.json();
}

/**
 * Sends a PUT request to the specified path in Firebase (replacing existing data).
 *
 * @async
 * @param {string} [path=""] - The path in the Firebase Realtime DB
 * @param {object} [data={}] - The data to replace at that path
 * @returns {Promise<object>} - The updated data from Firebase
 */
async function edit_data(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * Sends a PATCH request to update partially the data at the specified path in Firebase.
 *
 * @async
 * @param {string} [path=""] - The path in the Firebase Realtime DB
 * @param {object} [data={}] - The partial data to merge at that path
 * @returns {Promise<object>} - The updated data from Firebase
 */
async function patch_data(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PATCH",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}

function mediaQuery() {
  let header = document.getElementsByClassName("navbar");
  let footer = document.getElementsByClassName("footer_nav");
  let kanban = document.getElementsByClassName("kanban");
  let help = document.getElementsByClassName("help");
  let logo = document.getElementsByClassName("join-mobile-logo");
  loginMedia();
  summaryMedia();
  contactsMedia();
  boardMedia();
  mobileIntro();
  if (media.matches) {
    Array.from(header).forEach((el) => el.classList.add("d_none"));
    Array.from(footer).forEach((el) => el.classList.remove("d_none"));
    Array.from(kanban).forEach((el) => el.classList.add("d_none"));
    Array.from(help).forEach((el) => el.classList.add("d_none"));
    Array.from(logo).forEach((el) => el.classList.remove("d_none"));
  } else {
    Array.from(header).forEach((el) => el.classList.remove("d_none"));
    Array.from(footer).forEach((el) => el.classList.add("d_none"));
    Array.from(kanban).forEach((el) => el.classList.remove("d_none"));
    Array.from(help).forEach((el) => el.classList.remove("d_none"));
    Array.from(logo).forEach((el) => el.classList.add("d_none"));
  }
}

function mobileIntro() {
  let joinDesktop = document.getElementById("join-home");
  let joinMobile = document.getElementById("join-mobile-intro");
  let introBody = document.getElementById("intro-body");
  if (media.matches) {
    if (joinDesktop) joinDesktop.classList.add("d_none");
    if (joinMobile) joinMobile.classList.remove("d_none");
  } else {
    if (joinDesktop) joinDesktop.classList.remove("d_none");
    if (joinMobile) joinMobile.classList.add("d_none");
  }
  setTimeout(() => {
    if (introBody) introBody.style.backgroundColor = "white";
    if (joinMobile) joinMobile.classList.add("transition-active");
  }, 0);
}

function summaryMedia() {
  let welcome = document.getElementById("welcome-dash");
  let helpMenu = document.getElementById("help-menu");
  if (media.matches) {
    if (welcome) welcome.classList.add("d_none");
    if (helpMenu) helpMenu.classList.remove("d_none");
  } else {
    if (welcome) welcome.classList.remove("d_none");
    if (helpMenu) helpMenu.classList.add("d_none");
  }
}

function boardMedia() {
  let boardSearch = document.getElementById("board-search-container");
  let mobileSearch = document.getElementById("mobile-board-search");
  let addTaskSpan = document.getElementById("addtask-span");
  if (media.matches) {
    if (addTaskSpan) addTaskSpan.classList.add("d_none");
  } else {
    if (addTaskSpan) addTaskSpan.classList.remove("d_none");
  }
}

function contactsMedia() {
  /*let details = document.getElementById("contactsDetailsMobile");
  let editWindow = document.getElementById("editWindow");
  let contactWindow = document.getElementById("contactWindow");

  if (media.matches) {
    if (details) details.classList.add("d_none");
    if (editWindow) editWindow.classList.add("d_none");
    if (contactWindow) contactWindow.classList.add("d_none");
  }*/
}

function loginMedia() {
  let noUser = document.getElementById("no-user-container");
  let noUserMobile = document.getElementById("no-user-container-mobile");

  if (media.matches) {
    if (noUser) noUser.classList.add("d_none");
    if (noUserMobile) noUserMobile.classList.remove("d_none");
  } else {
    if (noUser) noUser.classList.remove("d_none");
    if (noUserMobile) noUserMobile.classList.add("d_none");
  }
}

mediaQuery();
media.addEventListener("change", mediaQuery);

function getTimeGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let greeting;

  if (hours >= 3 && hours < 12) {
    greeting = "Good morning,";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Good afternoon,";
  } else {
    greeting = "Good evening,";
  }

  let content = document.getElementById("greeting");
  let contentMobile = document.getElementById("greeting-mobile");

  if (window.innerWidth < 960) {
    if (contentMobile) contentMobile.textContent = greeting;
  } else {
    if (content) content.textContent = greeting;
  }
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}

async function getCurrentUser(id, path = "current-user") {
  let response = await fetch(`${BASE_URL}${path}.json`);
  currentUser = await response.json();
}

async function loadCurrentUser(id) {
  await getCurrentUser();
  renderCurrentUser(currentUser);
  renderInitials(id, currentUser);
}

function renderCurrentUser(currentUser) {
  let content = document.getElementById("user-name");
  let contentMobile = document.getElementById("user-name-mobile");

  if (window.innerWidth < 960) {
    if (contentMobile) contentMobile.innerHTML = currentUser.name;
  } else {
    if (content) content.innerHTML = currentUser.name;
  }
}

function renderInitials(id, currentUser) {
  let content = document.getElementById(`header-initials-${id}`);
  content.innerHTML = getInitials(currentUser.name);
}

function sortContacts(contacts) {
  return contacts.sort((a, b) =>
    a.name.localeCompare(b.name, "de", { sensitivity: "base" })
  );
}

async function checkLoggedIn() {
  await getCurrentUser();
  if (currentUser.name.length > 0) {
    return true;
  } else if (currentUser.name.length == 0) {
    return false;
  }
}

async function changeNavbar(styleID) {
  let styleDiv = document.getElementsByClassName("loggedOutButtons");
  let desktopID = document.getElementById("desktop-nav");
  let footerID = document.getElementById("mobile-footer");
  let profile = document.getElementsByClassName("profileSection");
  let help = document.getElementsByClassName("help");
  footerID.innerHTML = "";
  desktopID.innerHTML = "";
  changeNavbarExecute(styleDiv, desktopID, footerID, profile, help, styleID);
}

async function changeNavbarExecute(
  styleDiv,
  desktopID,
  footerID,
  profile,
  help,
  styleID
) {
  if (await checkLoggedIn()) {
    footerID.innerHTML = mobileFooterLoggedIn();
    desktopID.innerHTML = desktopNavbarLoggedIn();
    for (let index = 0; index < profile.length; index++) {
      profile[index].classList.remove("d_none");
      help[index].classList.add("d_none");
    }
  } else {
    desktopID.innerHTML = desktopNavbarLoggedOut();
    footerID.innerHTML = mobileFooterLoggedOut();
    styleDiv[styleID].style.backgroundColor = "rgba(9, 25, 49, 1)";
    for (let index = 0; index < profile.length; index++) {
      profile[index].classList.add("d_none");
    }
  }
}
