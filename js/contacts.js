let bgcolors = [
  { id: 0, rgba: "rgba(255, 105, 135, 1)" },
  { id: 1, rgba: "rgba(255, 180, 120, 1)" },
  { id: 2, rgba: "rgba(186, 85, 211, 1)" },
  { id: 3, rgba: "rgba(100, 200, 250, 1)" },
  { id: 4, rgba: "rgba(60, 179, 113, 1)" },
  { id: 5, rgba: "rgb(153, 197, 43)" },
  { id: 6, rgba: "rgba(218, 165, 32, 1)" },
  { id: 7, rgba: "rgb(205, 127, 224)" },
  { id: 8, rgba: "rgba(138, 43, 226, 1)" },
  { id: 9, rgba: "rgba(255, 165, 0, 1)" },
];

let contacts = [];

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

function sortContacts() {
  contacts.sort((a, b) =>
    a.name.localeCompare(b.name, "de", { sensitivity: "base" })
  );
  groupContacts();
}

function groupContacts() {
  let grouped = {};

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let firstLetter = contact.name.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(contact);
  }

  let sortedGroups = Object.keys(grouped).sort();

  renderContacts(sortedGroups, grouped);
}

function renderContacts(sortedGroups, grouped) {
  document.getElementById("contactsList").innerHTML = "";

  let globalIndex = 0;

  for (let i = 0; i < sortedGroups.length; i++) {
    let letter = sortedGroups[i];

    document.getElementById("contactsList").innerHTML +=
      listContactHeader(letter);

    for (let j = 0; j < grouped[letter].length; j++) {
      let contact = grouped[letter][j];
      let contactName = contact.name;
      let contactEmail = contact.email;
      document.getElementById("contactsList").innerHTML += listContactData(
        contactName,
        contactEmail,
        globalIndex,
        getInitials(contactName)
      );
      getColorById(globalIndex);
      globalIndex++;
    }
  }
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
  getColorById(indexContacts);
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

async function put_data(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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

function getColorById(id) {
  let reducedId = id % 10;
  let color = bgcolors[reducedId];

  let element = document.getElementById(`bg-${id}`);
  let bgelement = document.getElementById(`details-bg-${id}`);
  let editbgelement = document.getElementById(`edit-bg-${id}`);

  if (bgelement === null && editbgelement === null) {
    element.style.backgroundColor = color.rgba;
  } else {
    if (bgelement !== null) {
      bgelement.style.backgroundColor = color.rgba;
    }
    if (editbgelement !== null) {
      editbgelement.style.backgroundColor = color.rgba;
    }
  }
}

function openCreateOverlay() {
  document.getElementById("overlay").innerHTML = overlayCreateUser();
}

function openEditOverlay(indexContacts) {
  document.getElementById("overlayEdit").innerHTML = "";
  let contactName = contacts[indexContacts].name;
  let contactEmail = contacts[indexContacts].email;
  let contactPhone = contacts[indexContacts].phone;
  document.getElementById("overlayEdit").innerHTML = overlayEditUser(
    contactName,
    contactEmail,
    contactPhone,
    indexContacts,
    getInitials(contactName)
  );
  getColorById(indexContacts);
}
