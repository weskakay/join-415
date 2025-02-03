let buttonClicked = 0;
let contactsLoaded = false;

const BASE_URL =
  "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";

async function getTaskData() {
  let title = document.getElementById("taskTitle").value;
  let description = document.getElementById("taskDescription").value;
  let contact = document.getElementById("").value;
  let date = document.getElementById("").value;
  let prio = document.getElementById("").value;
  let category = document.getElementById("inputCategory").value;
  let subtask = document.getElementById("").value;

  let data = {
    title,
    description,
    contact,
    date,
    prio,
    category,
    subtask,
  };

  await update_data((path = `tasks/`), (data = {}));
}

async function update_data(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function getContacts(path = `contacts/`) {
  contacts = [];
  let response = await fetch(BASE_URL + path + ".json");
  let contactData = await response.json();

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

function sortContacts() {
  contacts.sort((a, b) =>
    a.name.localeCompare(b.name, "de", { sensitivity: "base" })
  );
  renderContacts();
}

function renderContacts() {
  for (let i = 0; i < contacts.length; i++) {
    let contactName = contacts[i].name;
    let initials = getInitials(contactName);

    console.log(initials);
    console.log(contactName);

    document.getElementById("contacts-checkbox").innerHTML += /*html*/ `
  <li><input type="checkbox" />${initials}</li>

    `;
  }
  buttonClicked = 1;
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}

function toggleCheckbox() {
  let checkbox = document.getElementById("contacts-checkbox");

  checkbox.style.display =
    checkbox.style.display === "block" ? "none" : "block";

  if (!contactsLoaded) {
    getContacts();
    contactsLoaded = true;
  }
}
