let contacts = [];
let lastContact = [];

async function init() {
  await getCurrentUser();
  getContacts();
}

async function getContacts(path = `contacts/`) {
  contacts = [];
  lastContact = [];
  let response = await fetch(BASE_URL + path + ".json");
  let contactData = await response.json();
  if (!contactData) {
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
    groupContacts();
    console.log(contacts);
  }
}

function groupContacts() {
  sortContacts(contacts);
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
        globalIndex,
        currentUser
      );
      globalIndex++;
    }
  }
}

function openContactDetails(indexContacts) {
  document.getElementById("detailsProfile").innerHTML = "";
  document.getElementById("detailsContact").innerHTML = "";
  let detailsMobile = document.getElementById("contactsDetailsMobile");
  let contact = contacts[indexContacts];

  detailsMobile.classList.remove("d_none");
  document.getElementById("detailsProfile").innerHTML = detailsProfileInsert(
    contact,
    indexContacts
  );
  document.getElementById("detailsContact").innerHTML =
    detailsContactInsert(contact);
}

async function getContactData(inputName, inputEmail, inputPhone, overId) {
  if (
    [inputName, inputEmail, inputPhone].some((input, i) =>
      [checkName, checkEmail, checkPhone][i](input)
    )
  ) {
    return;
  }

  await userCreateSuccess(inputName, inputEmail, inputPhone);
  await getContacts();
  cleanWindow(inputName, inputEmail, inputPhone, overId);
}

async function userCreateSuccess(inputName, inputEmail, inputPhone) {
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
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function cleanWindow(inputName, inputEmail, inputPhone, overId) {
  clearInput(inputName, inputEmail, inputPhone);
  d_none(overId);
  showCreationHint(
    "createdInfo",
    "createdContactInfoIn",
    "createdContactInfoOut"
  );
  toggleStyleChange(
    "contactWindow",
    "addContactWindowClosed",
    "addContactWindow"
  );
  showContactDetails("contactsDisplay", "detailsWindowClosed", "detailsWindow");
  findLastContactIndex();
}

function findLastContactIndex() {
  let lastId = lastContact.id;
  let myId = (item) => item.id == lastId;
  let foundId = contacts.findIndex(myId);
  openContactDetails(foundId);
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
    editUserSuccess(name, email, tel, id, indexContacts);
  }
}

async function editUserSuccess(name, email, tel, id, indexContacts) {
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
  toggleStyleChange("editWindow", "addContactWindowClosed", "addContactWindow");
  openContactDetails(indexContacts);
  clearInput(name, email, tel);
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

function toggleStyleChange(windowId, styleA, styleB) {
  document.getElementById(windowId).classList.toggle(styleA);
  document.getElementById(windowId).classList.toggle(styleB);
}

async function showContactDetails(windowId, styleA, styleB) {
  if (
    document.getElementById(windowId).classList ==
    "contactsDisplay detailsWindow"
  ) {
    toggleStyleChange(windowId, styleA, styleB);
    await delay(0.1);
    toggleStyleChange(windowId, styleA, styleB);
  } else {
    toggleStyleChange(windowId, styleA, styleB);
  }
}

function closeDetailsMenu(windowId, styleA, styleB) {
  if (
    window.innerWidth <= 960 &&
    document.getElementById("editButtonsPosition").classList ==
      "editButtonsPositionOpen"
  ) {
    toggleStyleChange(windowId, styleA, styleB);
  }
}

function hideDetails(windowId, styleA, styleB) {
  if (
    document.getElementById(windowId).classList ==
    "contactsDisplay detailsWindow"
  ) {
    toggleStyleChange(windowId, styleA, styleB);
  }
}

async function contactNoAction(windowId, styleA, styleB, styleC) {
  toggleStyleChange(windowId, styleA, styleC);
  await delay(0.1);
  toggleStyleChange(windowId, styleC, styleB);
}

async function delay(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function showCreationHint(windowId, styleA, styleB) {
  toggleStyleChange(windowId, styleA, styleB);
  await delay(3);
  toggleStyleChange(windowId, styleA, styleB);
}

function mobileContactDetails(windowId, styleA, styleB) {
  if (window.innerWidth < 960) {
    toggleStyleChange(windowId, styleA, styleB);
  }
}

function changeMobileDesktop(windowId, styleA, styleB) {
  let windowWidth = window.innerWidth;
  let detailsClass = document.getElementById(windowId).classList;
  if (windowWidth >= 961 && detailsClass == styleA) {
    toggleStyleChange(windowId, styleA, styleB);
  }
}
