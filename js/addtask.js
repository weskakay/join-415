let taskStatus = "todo";
let selectedPrio = undefined;

function generateContactsHTML(contacts) {
  return contacts
    .map((contact) =>
      listContactsAddtask(
        contact.id,
        contact.name,
        contact.colorId,
        currentUser,
      ),
    )
    .join("");
}

async function renderContacts(filteredContacts, divId) {
  let sortedContacts = await sortContacts(filteredContacts);
  let list = document.getElementById(divId);

  list.innerHTML = generateContactsHTML(sortedContacts);
  list.style.display = "none";
}

function filterContacts(contactsCheck) {
  let searchTerm = document.getElementById(contactsCheck);
  searchTerm = searchTerm.value.toLowerCase();
  if (searchTerm === "") {
    renderContacts();
    return;
  }

  let filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().startsWith(searchTerm),
  );

  renderContacts(filteredContacts);
}

function toggleCheckbox(id) {
  if (selectedContactsIDs.some((obj) => obj.id === id)) {
    selectedContactsIDs = selectedContactsIDs.filter((obj) => obj.id !== id);
  } else {
    selectedContactsIDs.push({ id: id });
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

function renderAssignedContacts() {
  let contactInfo = contacts.filter((contact) =>
    selectedContactsIDs.some((selected) => selected.id === contact.id),
  );
  let content = document.getElementById("assignedContacts");
  content.innerHTML = contactInfo
    .map((contact) => listAssingedContacts(contact.name, contact.colorId))
    .join("");
}

function setButtonColor(selectedButton, colorCode) {
  resetButtonColors();
  let activeButton = document.getElementById(`button${selectedButton}`);
  if (!activeButton) return;

  let img = activeButton.querySelector("img");
  if (!img) return;

  activeButton.style.backgroundColor = colorCode;
  activeButton.style.color = "#FFFFFF";

  img.style.filter =
    "brightness(0) saturate(100%) invert(93%) sepia(100%) saturate(0%) hue-rotate(141deg) brightness(104%) contrast(101%)";

  selectedPrio = selectedButton.toLowerCase();
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

function selectInput(inputId, add, check) {
  showButtons(add, check);
  let input = document.getElementById(inputId);
  input.focus();
  input.select();
}

function showButtons(add, check) {
  let checkCross = document.getElementById(check);
  let addIcon = document.getElementById(add);
  checkCross.style.display = "flex";
  addIcon.style.display = "none";
}

function hideButtons(inputId, cross, add) {
  let input = document.getElementById(inputId);
  let checkCross = document.getElementById(cross);
  let addIcon = document.getElementById(add);
  setTimeout(() => {
    checkCross.style.display = "none";
    addIcon.style.display = "flex";
    input.blur();
    input.value = "";
  }, 150);
}

function clearInput() {
  let content = document.getElementById("subtaskInput");
  content.value = "";
  content.focus();
  content.select();
}

function confirmInput() {
  let input = document.getElementById("subtaskInput");
  if (input.value.trim() !== "") {
    subtaskInputs.push({
      text: input.value.trim(),
      checked: 0,
    });
    renderSubtasks();
    clearInput();
  }
}

function renderSubtasks() {
  let list = document.getElementById("subtaskList");
  list.innerHTML = "";

  for (let i = 0; i < subtaskInputs.length; i++) {
    let content = subtaskInputs[i].text;
    list.innerHTML += listSubtasks(i, content);
  }
}

function editListItem(index) {
  let listItem = document.getElementById(`listItem-${index}`);
  let editIcon = document.getElementById(`editIcon-${index}`);
  let checkIcon = document.getElementById(`checkIcon-${index}`);

  listItem.setAttribute("contenteditable", "true");
  listItem.focus();

  editIcon.style.display = "none";
  checkIcon.style.display = "block";
}

function updateListItem(index) {
  let listItem = document.getElementById(`listItem-${index}`);
  let editIcon = document.getElementById(`editIcon-${index}`);
  let checkIcon = document.getElementById(`checkIcon-${index}`);

  subtaskInputs[index].text = listItem.innerText.trim();

  listItem.setAttribute("contenteditable", "false");

  editIcon.style.display = "block";
  checkIcon.style.display = "none";

  renderSubtasks();
}

function handleEnter(event, index) {
  if (event.key === "Enter") {
    event.preventDefault();
    updateListItem(index);
  }
}

function deleteListItem(index) {
  subtaskInputs.splice(index, 1);
  renderSubtasks();
}

/**
 * Clears all input fields in the Add Task form.
 */
function resetAllInputs() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("contact-search").value = "";
  document.getElementById("date").value = "";
  document.getElementById("inputCategory").selectedIndex = 0;
  document.getElementById("subtaskInput").value = "";
  resetButtonColors();
  selectedPrio = "";
  subtaskInputs = [];
  selectedContactsIDs = [];
  renderAssignedContacts();
  renderSubtasks();
}

async function getTaskData() {
  if (validateData()) {
    let data = prepareTaskData();
    try {
      await update_data("tasks", data);
      resetAllInputs();
      window.location.href = `../html/board.html`;
    } catch (error) {
      console.error("Error saving task:", error);
    }
  } else {
    return;
  }
}

function prepareTaskData() {
  let title = document.getElementById("taskTitle").value;
  let description = document.getElementById("taskDescription").value;
  let contact = selectedContactsIDs;
  let date = document.getElementById("date").value;
  let prio = selectedPrio;
  let category = document.getElementById("inputCategory").value;
  let subtask = subtaskInputs;

  return {
    title,
    description,
    contact,
    date,
    prio,
    category,
    subtask,
    status: stautsEmpty(taskStatus),
  };
}

function stautsEmpty(stauts) {
  if (!stauts) {
    return (taskStatus = "todo");
  }
  return taskStatus;
}

function validateRequiredFields() {
  let requiredFields = document.querySelectorAll("[required]");

  for (let field of requiredFields) {
    if (!field.value.trim()) {
      alert(
        `Das Feld ${field.previousElementSibling.textContent.trim()} ist erforderlich.`,
      );
      field.focus();
      return false;
    }
  }

  return true;
}

function validateContacts() {
  if (
    !selectedContactsIDs ||
    !Array.isArray(selectedContactsIDs) ||
    selectedContactsIDs.length === 0
  ) {
    alert("Bitte wähle mindestens einen Kontakt aus.");
    document.getElementById("contact-search").focus();
    return false;
  }
  return true;
}

function validateCategory() {
  let category = document.getElementById("inputCategory").value;

  if (!category) {
    alert("Das Feld Kategorie ist erforderlich.");
    document.getElementById("inputCategory").focus();
    return false;
  }

  return true;
}

function validatePriority() {
  if (!selectedPrio) {
    alert("Bitte wähle eine Priorität aus.");
    return false;
  }
  return true;
}

function validateData() {
  return (
    validateRequiredFields() &&
    validateContacts() &&
    validateCategory() &&
    validatePriority()
  );
}

function openContactsList(listId) {
  document.getElementById(listId).style.display = "block";
}

function closeContactsList(listId) {
  document.getElementById(listId).style.display = "none";
}

function selectCheckBox(checkboxId, contactId) {
  let checkStatus = document.getElementById(checkboxId);
  if (checkStatus.checked == true) {
    checkStatus.checked = false;
  } else {
    checkStatus.checked = true;
  }
  toggleCheckbox(contactId);
}
