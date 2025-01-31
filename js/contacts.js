let contacts = [];

let contactKeys = [];

const BASE_URL =
  "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";

function init() {
  getContacts();
}

async function getContacts(path = `contacts/`) {
  contacts = [];
  let response = await fetch(BASE_URL + path + ".json");
  let contactData = await response.json();
  if (contactData == null) {
    document.getElementById("contactsList").innerHTML = "";
    document.getElementById("contactsDetailsDisplay").innerHTML = "";
    return;
  } else {
    Object.entries(contactData).forEach(([id, details]) => {
      contacts.push({
        id: id,
        name: details.name,
        email: details.email,
        phone: details.phone,
      });
    });
    sortContacts();
  }
}

function renderContacts() {
  document.getElementById("contactsList").innerHTML = "";
  for (let index = 0; index < contacts.length; index++) {
    let contactName = contacts[index].name;
    let contactEmail = contacts[index].email;
    document.getElementById("contactsList").innerHTML += listContactData(
      contactName,
      contactEmail,
      index,
      getInitials(contactName)
    );
  }
}

function sortContacts() {
  contacts.sort((a, b) =>
    a.name.localeCompare(b.name, "de", { sensitivity: "base" })
  );
  renderContacts();
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}

function openContactDetails(indexContacts) {
  document.getElementById("contactsDetailsDisplay").innerHTML = "";
  let contactName = contacts[indexContacts].name;
  let contactEmail = contacts[indexContacts].email;
  let contactPhone = contacts[indexContacts].phone;
  document.getElementById("contactsDetailsDisplay").innerHTML =
    contactsFullDetails(
      contactName,
      contactEmail,
      contactPhone,
      indexContacts,
      getInitials(contactName)
    );
}

async function getContactData() {
  let name = document.getElementById("nameInput").value;
  let email = document.getElementById("mailInput").value;
  let phone = document.getElementById("telInput").value;
  if (name == "" || email == "" || phone == "") {
    alert("Please insert name, email and phone details");
  } else if (name.length <= 3 || email <= 3 || phone <= 3) {
    alert("Your name, email and phone must be longer than 3 characters");
  } else {
    await update_data(
      (path = `contacts/`),
      (data = { name: name, email: email, phone: phone })
    );
    getContacts();
    clearInput();
    d_none("overlay");
  }
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

async function deleteContact(path) {
  await delete_data(path);
  document.getElementById("contactsDetailsDisplay").innerHTML = "";
  getContacts();
}

function clearInput() {
  document.getElementById("nameInput").value = "";
  document.getElementById("mailInput").value = "";
  document.getElementById("telInput").value = "";
}
