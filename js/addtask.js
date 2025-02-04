let contacts = [];
let selectedContactsIDs = [];

const BASE_URL =
  "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";

async function getTaskData() {
  let title = document.getElementById("taskTitle").value;
  let description = document.getElementById("taskDescription").value;
  let contact = document.getElementById("contact").value;
  let date = document.getElementById("date").value;
  let prio = document.getElementById("priority").value;
  let category = document.getElementById("inputCategory").value;
  let subtask = document.getElementById("subtask").value;

  let data = {
    title,
    description,
    contact,
    date,
    prio,
    category,
    subtask,
  };

  await updateData("tasks/", data);
}

async function updateData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function getContacts(path = "contacts/") {
  let response = await fetch(`${BASE_URL}${path}.json`);
  let contactData = await response.json();

  contacts = Object.entries(contactData).map(([id, details]) => ({
    id,
    name: details.name,
    email: details.email,
    phone: details.phone,
  }));
}

function renderContacts(filteredContacts = contacts) {
  filteredContacts.sort((a, b) =>
    a.name.localeCompare(b.name, "de", { sensitivity: "base" })
  );

  let list = document.getElementById("contacts-checkbox");

  list.innerHTML = filteredContacts
    .map((contact) => listContactsAddtask(contact))
    .join("");

  list.style.display = "block";
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}

function filterContacts() {
  let searchTerm = document.getElementById("contact-search");
  searchTerm = searchTerm.value.toLowerCase();
  if (searchTerm === "") {
    renderContacts();
    return;
  }

  let filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().startsWith(searchTerm)
  );

  renderContacts(filteredContacts);
}

function toggleCheckbox(id) {
  if (selectedContactsIDs.includes(id)) {
    selectedContactsIDs = selectedContactsIDs.filter(
      (contactId) => contactId !== id
    );
  } else {
    selectedContactsIDs.push(id);
  }
  renderAssignedContacts(id);
  return;
}

function setCheckbox(id) {
  let checkbox = document.getElementById(`checkbox-${id}`);
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
  }
  toggleCheckbox(id);
}

document.addEventListener("click", function (event) {
  let list = document.getElementById("contacts-checkbox");
  let searchBox = document.getElementById("contact-search");

  if (!list.contains(event.target) && event.target !== searchBox) {
    list.style.display = "none";
  }
});

function renderAssignedContacts() {
  let contactInfo = contacts.filter((contact) =>
    selectedContactsIDs.includes(contact.id)
  );

  let content = document.getElementById("assignedContacts");
  content.innerHTML = contactInfo
    .map((contact) => listAssingedContacts(contact))
    .join("");
}

function setButtonColor(selectedButton) {
  resetButtonColors();
  let activeButton = document.getElementById(`button${selectedButton}`);
  if (!activeButton) return;

  let img = activeButton.querySelector("img");
  if (!img) return;

  const colors = {
    Urgent: "rgba(255, 61, 0, 1)",
    Medium: "rgba(255, 168, 0, 1)",
    Low: "rgba(122, 226, 41, 1)",
  };

  activeButton.style.backgroundColor = colors[selectedButton] || colors["Low"];
  activeButton.style.color = "rgba(255, 255, 255, 1)";

  img.style.filter =
    "brightness(0) saturate(100%) invert(93%) sepia(100%) saturate(0%) hue-rotate(141deg) brightness(104%) contrast(101%)";
}

function resetButtonColors() {
  let buttons = document.querySelectorAll("[id^='button']");

  buttons.forEach((button) => {
    button.style.backgroundColor = "rgba(255, 255, 255, 1)";
    button.style.color = "rgba(0, 0, 0, 1)";

    let img = button.querySelector("img");

    if (img) {
      img.style.filter = "none";
    }
  });
}
