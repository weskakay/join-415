function toggle_create_window() {
  document
    .getElementById("contactWindow")
    .classList.toggle("addContactWindowClosed");
  document.getElementById("contactWindow").classList.toggle("addContactWindow");
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
