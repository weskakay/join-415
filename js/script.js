let media = window.matchMedia("(max-width: 960px)");

let currentUser = null;

function pageLoadHandler(id) {
  mobileMediaQuery();
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

function openLoginHTML() {
  window.location.href = "../html/login.html";
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

function mobileMediaQuery() {
  let header = document.getElementsByClassName("navbar");
  let footer = document.getElementsByClassName("footer_nav");

  if (media.matches) {
    for (let index = 0; index < header.length; index++) {
      header[index].classList.add("d_none");
      footer[index].classList.remove("d_none");
    }
  } else {
    for (let index = 0; index < header.length; index++) {
      header[index].classList.remove("d_none");
      footer[index].classList.add("d_none");
    }
  }
}

mobileMediaQuery();
media.addEventListener("change", mobileMediaQuery);

function getTimeGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let greeting;

  if (hours >= 3 && hours < 12) {
    greeting = "Good morning,";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Hello,";
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
