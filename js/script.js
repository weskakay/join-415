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
  window.location.href = "";
}

function openPrivacyPolicy() {
  window.location.href = "";
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

function findLastContactIndex() {
  let lastId = lastContact.id;
  let myId = (item) => item.id == lastId;
  let foundId = contacts.findIndex(myId);
  openContactDetails(foundId);
  console.log(lastId);
  console.log(foundId);
}
