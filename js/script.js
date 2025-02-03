function d_none(enterid) {
  document.getElementById(enterid).classList.toggle("d_none");
}

function noBubble(event) {
  event.stopPropagation();
}

function changeNavbarItems(id) {
  window.location.href = `../html/${id}.html`;
}

function logout(){
  localStorage.removeItem("userKey");
  openLoginHTML();
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