function toggle_create_window() {
  document
    .getElementById("contactWindow")
    .classList.toggle("addContactWindowClosed");
  document.getElementById("contactWindow").classList.toggle("addContactWindow");
}

async function delay(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function showCreationHint() {
  document
    .getElementById("createdInfo")
    .classList.toggle("createdContactInfoIn");
  document
    .getElementById("createdInfo")
    .classList.toggle("createdContactInfoOut");
  await delay(3);
  document
    .getElementById("createdInfo")
    .classList.toggle("createdContactInfoOut");
  document
    .getElementById("createdInfo")
    .classList.toggle("createdContactInfoIn");
}

function d_none(enterid) {
  document.getElementById(enterid).classList.toggle("d_none");
}

function noBubble(event) {
  event.stopPropagation();
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

function openGuestLogin() {
  window.location.href = "../html/summary.html";
}
