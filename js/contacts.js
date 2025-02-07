let contacts = [];

let lastContact = [];

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function init() {
  getContacts();
}

async function getContacts(path = `contacts/`) {
  contacts = [];
  lastContact = [];
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
        colorId: details.colorId,
      });
    });

    lastContact = contacts[contacts.length - 1];

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
      document.getElementById("contactsList").innerHTML += listContactData(
        contact,
        globalIndex
      );
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
  document.getElementById("detailsProfile").innerHTML = "";
  document.getElementById("detailsContact").innerHTML = "";

  let contact = contacts[indexContacts];

  document.getElementById("detailsProfile").innerHTML = detailsProfileInsert(
    contact,
    indexContacts
  );
  document.getElementById("detailsContact").innerHTML =
    detailsContactInsert(contact);
}

async function getContactData(
  inputName,
  inputEmail,
  inputPhone,
  overId,
  windowId
) {
  if (checkName(inputName) === true) {
    return;
  } else if (checkEmail(inputEmail) === true) {
    return;
  } else if (checkPhone(inputPhone) === true) {
    return;
  } else {
    let name = document.getElementById(inputName).value.trim();
    let email = document.getElementById(inputEmail).value.trim();
    let phone = document.getElementById(inputPhone).value.trim();

    await update_data(
      (path = `contacts/`),
      (data = {
        name: name,
        email: email,
        phone: phone,
        colorId: getRandomNumber(),
      })
    );
    await getContacts();
    clearInput(inputName, inputEmail, inputPhone);
    d_none(overId);
    showCreationHint();
    contactCreatedEdited(windowId);
    showContactDetails("contactsDisplay");
    findLastContactIndex();
  }
}

function checkName(insertedName) {
  let nameInput = document.getElementById(insertedName);
  let name = document.getElementById(insertedName).value.trim();
  let namePattern = new RegExp(nameInput.pattern);
  if (!name) {
    nameInput.setCustomValidity("Please insert a name");
    nameInput.reportValidity();
    return true;
  } else if (!namePattern.test(name)) {
    nameInput.setCustomValidity("Please insert first and last name");
    nameInput.reportValidity();
    return true;
  }
}

function checkEmail(inputId) {
  let mailInput = document.getElementById(inputId);
  if (!mailInput) {
    console.error("Element not found:", inputId);
    return false;
  }

  let email = mailInput.value.trim();
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    mailInput.setCustomValidity("Please insert an email");
  } else if (!emailPattern.test(email)) {
    mailInput.setCustomValidity(
      "Please insert a valid email format, e.g.: name@email.com"
    );
  } else {
    mailInput.setCustomValidity("");
    return false;
  }

  mailInput.reportValidity();
  return true;
}

function checkPhone(insertedPhone) {
  let telInput = document.getElementById(insertedPhone);
  let phone = document.getElementById(insertedPhone).value.trim();
  let telPattern = new RegExp(telInput.pattern);
  if (!phone) {
    telInput.setCustomValidity("Please insert a number");
    telInput.reportValidity();
    return true;
  } else if (!telPattern.test(phone)) {
    telInput.setCustomValidity(
      "Please insert a valid phone number, e.g.: +49123456789"
    );
    telInput.reportValidity();
    return true;
  }
}

async function deleteContact(path) {
  await delete_data(path);
  window.location.reload();
  getContacts();
}

async function editUser(name, email, tel, id, indexContacts) {
  if (checkName("nameInputEdit") === true) {
    return;
  } else if (checkEmail("mailInputEdit") === true) {
    return;
  } else if (checkPhone("telInputEdit") === true) {
    return;
  } else {
    let changeName = document.getElementById(name).value;
    let changeEmail = document.getElementById(email).value;
    let changeTel = document.getElementById(tel).value;

    await edit_data(
      (path = `contacts/` + id),
      (data = {
        name: changeName,
        email: changeEmail,
        phone: changeTel,
        colorId: contacts[indexContacts].colorId,
      })
    );
    await getContacts();
    d_none("overlayEdit");
    openContactDetails(indexContacts);
    clearInput(name, email, tel);
  }
}

function clearInput(name, email, tel) {
  document.getElementById(name).value = "";
  document.getElementById(email).value = "";
  document.getElementById(tel).value = "";
}

function openCreateOverlay() {
  document.getElementById("overlay").innerHTML = overlayCreateUser();
}

function openEditOverlay(indexContacts) {
  document.getElementById("editInitialsColor").innerHTML = "";
  document.getElementById("editForm").innerHTML = "";
  document.getElementById("editButtons").innerHTML = "";

  let contact = contacts[indexContacts];
  document.getElementById("editForm").innerHTML = editFormInsert(contact);
  document.getElementById("editInitialsColor").innerHTML =
    editInitialsInsert(contact);

  document.getElementById("editButtons").innerHTML = editButtonsInsert(
    contact,
    indexContacts
  );
}

function contactCreatedEdited(windowId) {
  document.getElementById(windowId).classList.toggle("addContactWindowClosed");
  document.getElementById(windowId).classList.toggle("addContactWindow");
}

async function showContactDetails(windowId) {
  if (
    document.getElementById(windowId).classList ==
    "contactsDisplay detailsWindow"
  ) {
    document.getElementById(windowId).classList.toggle("detailsWindow");
    document.getElementById(windowId).classList.toggle("detailsWindowClosed");
    await delay(0.1);
    document.getElementById(windowId).classList.toggle("detailsWindowClosed");
    document.getElementById(windowId).classList.toggle("detailsWindow");
  } else {
    document.getElementById(windowId).classList.toggle("detailsWindowClosed");
    document.getElementById(windowId).classList.toggle("detailsWindow");
  }
}

function hideDetails(windowId) {
  if (
    document.getElementById(windowId).classList ==
    "contactsDisplay detailsWindow"
  ) {
    document.getElementById(windowId).classList.toggle("detailsWindowClosed");
    document.getElementById(windowId).classList.toggle("detailsWindow");
  }
}

async function contactNoAction(windowId) {
  document.getElementById(windowId).classList.toggle("addContactWindow");
  document
    .getElementById(windowId)
    .classList.toggle("addContactWindowNoAction");
  await delay(0.1);
  document.getElementById(windowId).classList.toggle("addContactWindowClosed");
  document
    .getElementById(windowId)
    .classList.toggle("addContactWindowNoAction");
}

async function delay(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function showCreationHint() {
  document
    .getElementById("createdInfo")
    .classList.toggle("createdContactInfoIn");
  document
    .getElementById("createdInfo")
    .classList.toggle("createdContactInfoOut");
  await delay(3);
  document
    .getElementById("createdInfo")
    .classList.toggle("createdContactInfoOut");
  document
    .getElementById("createdInfo")
    .classList.toggle("createdContactInfoIn");
}
