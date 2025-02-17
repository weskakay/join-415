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

function listContactHeader(letter) {
  return `
    <div class="contactsHeader size20"><p>${letter}</p></div>
    <div class="contactsSeperator"></div>
  `;
}

function listContactData(contact, index, currentUser) {
  return `
    <div
      class="contactsContainer"
      tabindex="0"
      onclick="mobileContactDetails('contactsDetailsMobile', 'contactsDetails', 'contactsDetailsOpen'), openContactDetails(${index}), showContactDetails('contactsDisplay', 'detailsWindowClosed', 'detailsWindow'), noBubble(event)"
    >
      <div class="background-contacts" style="background-color: ${
        bgcolors[contact.colorId].rgba
      };">
        ${getInitials(contact.name)}
      </div>
      <div class="contactsContainerUserinfo">
        <p class="weight400 size20">${contact.name}${
    currentUser.name === contact.name ? " (You)" : ""
  }</p>
        <a class="weight400 size16 emailLink"
          >${contact.email}</a
        >
      </div>
    </div>
  `;
}

function detailsProfileInsert(contact, index) {
  return `
    <div
      class="background-contacts bg-details"
      style="background-color: ${bgcolors[contact.colorId].rgba};"
    >
      ${getInitials(contact.name)}
    </div>
    <div class="detailsName">
      <listedName>${contact.name}</listedName>
      <div id="editButtonsPosition" class="editButtonsPosition">
        <div class="detailsEdit">
          <button
            onclick="d_none('overlayEdit'), openEditOverlay(${index}), toggleStyleChange('editWindow', 'addContactWindowClosed', 'addContactWindow')"
          >
            <img src="../assets/icons/contacts/edit.svg" alt="Edit Symbol" />
            <p class="weight400 size16 colorDarkBlue">Edit</p>
          </button>
          <button onclick="deleteContact('contacts/${contacts[index].id}')">
            <img
              src="../assets/icons/contacts/delete.svg"
              alt="Delete Symbol"
            />
            <p class="weight400 size16 colorDarkBlue">Delete</p>
          </button>
        </div>
      </div>
      <div
        class="openContactMenu"
        onclick="toggleStyleChange('editButtonsPosition', 'editButtonsPosition', 'editButtonsPositionOpen'), noBubble(event)"
      >
        <button>
          <img
            src="../assets/icons/contacts/Menu_Contact_options.svg"
            alt="Open Menu Button"
          />
        </button>
      </div>
    </div>
  `;
}

function detailsContactInsert(contact) {
  return `
    <p class="weight700 size16">Email</p>
    <a class="weight400 size16 emailLink" href="mailto:${contact.email}"
      >${contact.email}</a
    >
    <p class="weight700 size16">Phone</p>
    <a class="weight400 size16 phoneLink" href="tel:${contact.phone}"
      >${contact.phone}</a
    >
  `;
}

function listContactsAddtask(id, name, colorId, currentUser) {
  let checked = selectedContactsIDs.includes(id) ? "checked" : "";

  return /*html*/ `
    <li>
      <input type="checkbox" 
        id="checkbox-${id}" 
        class="add-task-checkmark" 
        value="${id}" 
        ${checked} 
        onclick="toggleCheckbox('${id}')"
      />
      <div class="background-contacts bg-contact-chechbox" style="background-color: ${
        bgcolors[colorId].rgba
      };">
        ${getInitials(name)}
      </div>
      <p class="checkbox-name size20">${name}${
    currentUser.name === name ? " (You)" : ""
  }</p>
    </li>`;
}

function listAssingedContacts(name, colorId) {
  return /*html*/ `<div class="background-contacts bg-contact-chechbox" style="background-color: ${
    bgcolors[colorId].rgba
  };">${getInitials(name)}</div>`;
}

function editFormInsert(contact) {
  return `
    <input
      id="nameInputEdit"
      class="weight400 size20"
      type="text"
      required
      placeholder="Name"
      pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{1,30} [A-Za-zÀ-ÖØ-öø-ÿ]{1,30}"
      value="${contact.name}"
    />
    <input
      id="mailInputEdit"
      class="weight400 size20"
      type="email"
      placeholder="Email"
      pattern="[^@s]+@[^@s]"
      value="${contact.email}"
    />
    <input
      id="telInputEdit"
      class="weight400 size20"
      type="tel"
      required
      placeholder="Phone"
      pattern="[0-9]{4,20}"
      value="${contact.phone}"
    />
  `;
}

function editButtonsInsert(contact, index) {
  return `
    <button
      class="add-task-button-clear"
      onclick="deleteContact('contacts/${contact.id}'), d_none('overlayEdit'), clearInput('nameInputEdit', 'mailInputEdit', 'telInputEdit'), toggleStyleChange('editWindow', 'addContactWindowClosed', 'addContactWindow') "
    >
      Delete
    </button>
    <button
      class="add-task-button-create"
      onclick="editUser('nameInputEdit', 'mailInputEdit', 'telInputEdit', '${contact.id}', '${index}'), d_none('editWindow')"
    >
      Save<img src="../assets/icons/add_task/check-icon.svg" />
    </button>
  `;
}

function editInitialsInsert(contact) {
  return `
    <div class="background-contacts bg-details" style="background-color: ${
      bgcolors[contact.colorId].rgba
    };">
      ${getInitials(contact.name)}
    </div>
  `;
}

function listSubtasks(i, content) {
  return /*html*/ `
      <div class="list-item-container">
        <li class="subtask-list-items" id="listItem-${i}" contenteditable="false" onblur="updateListItem(${i})"  onkeydown="handleEnter(event, ${i})">${content}</li>
        <div class="list-icons-wrapper">
          <div class="list-icons">
            <img src="../assets/icons/add_task/edit.svg" alt="Edit" class="edit-icon" onclick="editListItem(${i})" id="editIcon-${i}">
            <img src="../assets/icons/add_task/check-icon.svg" alt="Check" class="check-icon" onclick="updateListItem(${i})" id="checkIcon-${i}" style="display: none;">
          </div>
          <div class="list-icon-seperator"></div>
          <div class="list-icons">
            <img src="../assets/icons/add_task/delete.svg" alt="Delete" onclick="deleteListItem(${i})">
          </div>
        </div>
      </div>
    `;
}

function listTasks(task, i, category) {
  return /*html*/ `
    <div
      class="board-card"
      id="${task.id}"
      draggable="true"
      ondragstart="drag(event)"
      onclick="getTaskData(this.id), toggleStyleChange('taskDetailsWindow', 'addContactWindowClosed', 'addContactWindow'), d_none('overlayTasksDetail')"
    >
      <div class="crad-category size16 ${category}">${task.category}</div>
      <div class="card-title-discription">
        <p class="size16 weight700">${task.title}</p>
        <p class="size16 weight400 colorGrey">
          ${truncateText(
            task.description === undefined ? "" : task.description
          )}
        </p>
      </div>
      <div class="crad-subtask-wrapper" id="subtaskStatus-${i}">
        <div class="subtask-progressbar">
          <div class="subtask-progress" id="subtaskProgress-${i}"></div>
        </div>
        <p class="size12" id="subtaskDone-${i}"></p>
      </div>
      <div class="crad-footer">
        <div class="card-assignedto" id="cardContact-${i}"></div>
        <img src="../assets/icons/add_task/prio-${task.prio}-icon.svg" />
      </div>
    </div>
  `;
}

function listCardContacts(contact) {
  return /*html*/ `
          <div class="background-contacts card-contact-bg" style="background-color:${
            bgcolors[contact.colorId].rgba
          };">${getInitials(contact.name)}</div>
          `;
}

//from here task details window

function detailsTagInsert(taskTag) {
  return `
    <div class="tag">
      <p class="size23">${taskTag}</p>
    </div>
  `;
}

function detailsHeaderInsert(cleanHeader) {
  return `
  <p id="detailsHeader" class="weight700 size61">${cleanHeader}</p>
  `;
}

function detailsDescriptionInsert(cleanDescription) {
  return `
  <p id="detailsDescription" class="weight400 size20">${cleanDescription}</p>
  `;
}

function detailsDueDateInsert(cleanDate) {
  return `
    <td class="weight400 size20 colorDarkBlue">Due Date:</td>
    <td id="dueDateDetails" class="weight400 size20">${cleanDate}</td>
  `;
}

function detailsPriorityInsert(cleanPriority) {
  return `
    <td class="weight400 size20 colorDarkBlue">Priority:</td>
    <td class="displayFlex">
      <p class="weight400 size20">${cleanPriority}</p>
      <img id="priorityIcon" src="" alt="Priority Icon" />
    </td>
  `;
}

function assigneeContainerInsert() {
  return `
    <p class="weight400 size20 colorDarkBlue">Assigned to:</p>
    <div id="assigneeList" class="assigneeList"></div>
  `;
}

function detailsAssigneesInsert(assignee, assigneeInitials, assigneeColor) {
  return `
    <div class="assignee">
      <div class="background-contacts" style="background-color: ${bgcolors[assigneeColor].rgba}">
        <p class="weight400 size12">${assigneeInitials}</p>
      </div>
      <p class="weight400 size19">${assignee}</p>
    </div>
  `;
}

function detailsSubtaskInsert(subtaskList, indexSubtask, taskId) {
  return `
    <div class="subtask">
      <input
        onclick="subtaskStatusChange('${indexSubtask}', '${taskId}', this.id)"
        id="subtaskCheck${indexSubtask}"
        type="checkbox"
      />
      <p class="weight400 size16">${subtaskList}</p>
    </div>
  `;
}

function detailsEditDeleteButtons(targetId) {
  return `
    <div class="detailsEdit">
      <button onclick="deleteTask('tasks/${targetId}')">
        <img src="../assets/icons/contacts/delete.svg" alt="Delete Symbol" />
        <p class="weight400 size16 colorDarkBlue">Delete</p>
      </button>
      <button onclick="editTaskDetails()">
        <img src="../assets/icons/contacts/edit.svg" alt="Edit Symbol" />
        <p class="weight400 size16 colorDarkBlue">Edit</p>
      </button>
    </div>
  `;
}

//from here task edit window
function insertEditHeader(headerText) {
  return `
    <p class="weight400 size16"">Title</p>
    <input id="inputTitleEdit" type="text" value="${headerText}" />
  `;
}

function insertEditDescription(descriptionText) {
  return `
    <p class="weight400 size16">Description</p>
    <input id="inputDescriptionEdit" type="text" value="${descriptionText}" />
  `;
}

function insertEditDueDate(dueDateText) {
  return `
    <p class="weight400 size16">Due Date</p>
    <input id="inputDueDateEdit" type="date" value="${dueDateText}" />
  `;
}

function insertEditPriority() {
  return `
    <p class="weight400 size16 colorLightGrey">Priority</p>
    <div class="buttonPrioContainer">
      <button>Low</button>
      <button>Medium</button>
      <button>Urgent</button>
    </div>
  `;
}

function insertEditAssignee() {
  return `
    <p class="weight400 size16 colorLightGrey">Assigned to</p>
    <select name="assignees" id="editAssigneeList" name="color">
      <option value="" disabled selected hidden>
        Select contacts to assign
      </option>
    </select>
    <div class="displayFlex" id="editAssigneeImage"></div>
  `;
}

function insertAssigneeList(cleanedContact, cleanedContactId) {
  return ` 
    <option value="${cleanedContactId}">${cleanedContact}</option> `;
}

function insertEditAssigneeImage(assigneeImageColor, assigneeImageInitials) {
  return `
    <div
      class="background-contacts"
      style="background-color: ${bgcolors[assigneeImageColor].rgba}"
    >
      <p class="weight400 size12">${assigneeImageInitials}</p>
    </div>
  `;
}
