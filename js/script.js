let users = [];

const BASE_URL =
  "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";

function init() {
  getUsers();
}

async function getUsers() {
  let response = await fetch(BASE_URL + ".json");
  users = await response.json();
  renderContacts();
}

function renderContacts() {
  for (
    let indexContacts = 0;
    indexContacts < users.user.length;
    indexContacts++
  ) {
    let userName = users.user[indexContacts].name;
    let userEmail = users.user[indexContacts].email;
    document.getElementById("contactsList").innerHTML += listContactData(
      userName,
      userEmail,
      indexContacts,
    );
  }
}

function openContactDetails(indexContacts) {
  let userName = users.user[indexContacts].name;
  let userEmail = users.user[indexContacts].email;
  let userPhone = users.user[indexContacts].phone;
  document.getElementById("contactsDetailsDisplay").innerHTML =
    contactsFullDetails(userName, userEmail, userPhone);
}

function getContactData() {
  let name = document.getElementById("nameInput").value;
  let email = document.getElementById("mailInput").value;
  let phone = document.getElementById("telInput").value;
  //clear input fields and close window

  update_data(
    (path = `user/`),
    (data = { "name": name, "email": email, "phone": phone }),
  );
  getUsers();
}

async function update_data(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}
