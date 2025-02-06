function listContactHeader(letter) {
  return `
    <div class="contactsHeader size20"><p>${letter}</p></div>
    <div class="contactsSeperator"></div>
  `;
}

function listContactData(userName, userEmail, indexContacts, initials) {
  return `
    <div
      class="contactsContainer"
      tabindex="0"
      onclick="openContactDetails(${indexContacts}), showContactDetails('contactsDisplay')"
    >
      <div class="background-contacts" id="bg-${indexContacts}">
        ${initials}
      </div>
      <div class="contactsContainerUserinfo">
        <p class="weight400 size20">${userName}</p>
        <a class="weight400 size16 emailLink" href="mailto:${userEmail}"
          >${userEmail}</a
        >
      </div>
    </div>
  `;
}

function detailsProfileInsert(userName, indexContacts, initials) {
  return `
    <div
      class="background-contacts bg-details"
      id="details-bg-${indexContacts}"
    >
      ${initials}
    </div>
    <div class="detailsName">
      <p class="weight500 size47">${userName}</p>
      <div class="detailsEdit">
        <button
          onclick="d_none('overlayEdit'), openEditOverlay(${indexContacts}), contactCreatedEdited('editWindow')"
        >
          <img src="../assets/icons/contacts/edit.svg" alt="Edit Symbol" />
          <p class="weight400 size16 colorDarkBlue">Edit</p>
        </button>
        <button
          onclick="deleteContact('contacts/${contacts[indexContacts].id}')"
        >
          <img src="../assets/icons/contacts/delete.svg" alt="Delete Symbol" />
          <p class="weight400 size16 colorDarkBlue">Delete</p>
        </button>
      </div>
    </div>
  `;
}

function detailsContactInsert(userEmail, userPhone) {
  return `
    <p class="weight700 size16">Email</p>
    <a class="weight400 size16 emailLink" href="mailto:${userEmail}"
      >${userEmail}</a
    >
    <p class="weight700 size16">Phone</p>
    <a class="weight400 size16 phoneLink" href="tel:${userPhone}"
      >${userPhone}</a
    >
  `;
}

function listContactsAddtask(contact) {
  let checked = selectedContactsIDs.includes(contact.id) ? "checked" : "";

  return /*html*/ `
    <li>
      <input type="checkbox" 
        id="checkbox-${contact.id}" 
        class="add-task-checkmark" 
        value="${contact.id}" 
        ${checked} 
        onclick="toggleCheckbox('${contact.id}')"
      />
      <div class="background-contacts bg-contact-chechbox">
        ${getInitials(contact.name)}
      </div>
      <p class="checkbox-name size20">${contact.name}</p>
    </li>`;
}

function listAssingedContacts(contact) {
  return /*html*/ `<div class="background-contacts bg-contact-chechbox">${getInitials(
    contact.name
  )}</div>`;
}

function editFormInsert(contactName, contactEmail, contactPhone) {
  return `
    <input
      id="nameInputEdit"
      class="weight400 size20"
      type="text"
      required
      placeholder="Name"
      pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{1,30} [A-Za-zÀ-ÖØ-öø-ÿ]{1,30}"
      value="${contactName}"
    />
    <input
      id="mailInputEdit"
      class="weight400 size20"
      type="email"
      placeholder="Email"
      pattern="[^@s]+@[^@s]"
      value="${contactEmail}"
    />
    <input
      id="telInputEdit"
      class="weight400 size20"
      type="tel"
      required
      placeholder="Phone"
      pattern="[0-9]{4,20}"
      value="${contactPhone}"
    />
  `;
}

function editButtonsInsert(contactId, indexContacts) {
  return `
    <button
      class="add-task-button-clear"
      onclick="deleteContact('contacts/${contactId}'), d_none('overlayEdit'), clearInput('nameInputEdit', 'mailInputEdit', 'telInputEdit'), contactCreatedEdited('editWindow') "
    >
      Delete
    </button>
    <button
      class="add-task-button-create"
      onclick="editUser('nameInputEdit', 'mailInputEdit', 'telInputEdit', '${contactId}', '${indexContacts}', contactCreatedEdited('editWindow'))"
    >
      Save<img src="../assets/icons/add_task/check-icon.svg" />
    </button>
  `;
}

function editInitialsInsert(initials, indexContacts) {
  return `
    <div class="background-contacts bg-details" id="edit-bg-${indexContacts}">
      ${initials}
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
