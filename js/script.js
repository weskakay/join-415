let media = window.matchMedia("(max-width: 960px)");

let currentUser = null;

function pageLoadHandler(id) {
  mediaQuery();
  getTimeGreeting();
  loadCurrentUser(id);
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
  window.location.href = "../html/login.html";
}

async function logOut() {
  let user = {
    name: ""
  }
  await edit_data("/current-user", user);
  openLoginHTML();
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

const BASE_URL =
  "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";

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

async function delete_data(path) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
  return await response.json();
}

async function edit_data(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}

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
  }, 500);
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
    if (boardSearch) boardSearch.classList.add("d_none");
    if (mobileSearch) mobileSearch.classList.remove("d_none");
    if (addTaskSpan) addTaskSpan.classList.add("d_none");
  } else {
    if (boardSearch) boardSearch.classList.remove("d_none");
    if (mobileSearch) mobileSearch.classList.add("d_none");
    if (addTaskSpan) addTaskSpan.classList.remove("d_none");
  }
}

// Funktion muss ausgeblendet sein, da sonst in Mobile die User Details nicht angezeigt werden

function contactsMedia() {
  let details = document.getElementById("contactsDetailsMobile");
  let editWindow = document.getElementById("editWindow");
  let contactWindow = document.getElementById("contactWindow");

  if (media.matches) {
    if (details) details.classList.add("d_none");
    if (editWindow) editWindow.classList.add("d_none");
    if (contactWindow) contactWindow.classList.add("d_none");
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
  if (content) {
    content.textContent = greeting;
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
  if (content) {
    content.innerHTML = currentUser.name;
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