let users = [];

let userKeys = [];

const BASE_URL =
  "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";

function init() {
  getUsers();
}

async function getUsers(path = `user/`) {
  users = [];
  let response = await fetch(BASE_URL + path + ".json");
  let userData = await response.json();
  if (userData == null) {
    return;
  } else {
    users.push(...Object.values(userData));
    userKeys.push(...Object.keys(userData));
    renderContacts();
    console.log(userKeys);
  }
}

function renderContacts() {
  document.getElementById("contactsList").innerHTML = "";
  for (let indexContacts = 0; indexContacts < users.length; indexContacts++) {
    let userName = users[indexContacts].name;
    let userEmail = users[indexContacts].email;
    document.getElementById("contactsList").innerHTML += listContactData(
      userName,
      userEmail,
      indexContacts
    );
  }
}

function openContactDetails(indexContacts) {
  document.getElementById("contactsDetailsDisplay").innerHTML = "";
  let userName = users[indexContacts].name;
  let userEmail = users[indexContacts].email;
  let userPhone = users[indexContacts].phone;
  document.getElementById("contactsDetailsDisplay").innerHTML =
    contactsFullDetails(userName, userEmail, userPhone, indexContacts);
}

async function getContactData() {
  let name = document.getElementById("nameInput").value;
  let email = document.getElementById("mailInput").value;
  let phone = document.getElementById("telInput").value;
  await update_data(
    (path = `user/`),
    (data = { name: name, email: email, phone: phone })
  );
  getUsers();
  clearInput();
  d_none("overlay");
}

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

async function deleteUser(path) {
  await delete_data(path);
  getUsers();
}

function d_none(enterid) {
  document.getElementById(enterid).classList.toggle("d_none");
}

function noBubble(event) {
  event.stopPropagation();
}

function clearInput() {
  document.getElementById("nameInput").value = "";
  document.getElementById("mailInput").value = "";
  document.getElementById("telInput").value = "";
}

function changeNavbarItems(id) {
  window.location.href = `../html/${id}.html`;
}
