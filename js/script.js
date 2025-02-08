let media = window.matchMedia("(max-width: 428px)");

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

function openGuestLogin() {
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
  let header = document.getElementsByClassName('navbar');
  let footer = document.getElementsByClassName('footer_nav');

  if (media.matches) {
    for (let index = 0; index < header.length; index++) {
      header[index].classList.add('d_none');
      footer[index].classList.remove('d_none');
    }
  } else {
    for (let index = 0; index < header.length; index++) {
      header[index].classList.remove('d_none');
      footer[index].classList.add('d_none');
    }
  }
}

mobileMediaQuery();
media.addEventListener("change", mobileMediaQuery);
