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
      onclick="openContactDetails(${indexContacts})"
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

function contactsFullDetails(
  userName,
  userEmail,
  userPhone,
  indexContacts,
  initials,
) {
  return `
    <div class="detailsProfile">
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
            onclick="d_none('overlayEdit'), openEditOverlay(${indexContacts})"
          >
            <img src="../assets/icons/contacts/edit.svg" alt="Edit Symbol" />
            <p class="weight400 size16 colorDarkBlue">Edit</p>
          </button>
          <button
            onclick="deleteContact('contacts/${contacts[indexContacts].id}')"
          >
            <img
              src="../assets/icons/contacts/delete.svg"
              alt="Delete Symbol"
            />
            <p class="weight400 size16 colorDarkBlue">Delete</p>
          </button>
        </div>
      </div>
    </div>
    <p class="weight400 size20">Contact Information</p>
    <div class="detailsContact">
      <p class="weight700 size16">Email</p>
      <a class="weight400 size16 emailLink" href="mailto:${userEmail}"
        >${userEmail}</a
      >
      <p class="weight700 size16">Phone</p>
      <a class="weight400 size16 phoneLink" href="tel:${userPhone}"
        >${userPhone}</a
      >
    </div>
  `;
}

function overlayEditUser(
  contactName,
  contactEmail,
  contactPhone,
  indexContacts,
  initials,
  contactId,
) {
  return `
    <div class="addContactWindow" onclick="noBubble(event)">
      <div class="addContactsLogo">
        <div class="addContactsText">
          <p class="weight700 size61">Edit contact</p>
          <img
            class="addContactsJoin"
            src="../assets/icons/contacts/Capa 1.svg"
            alt="Logo Join"
          />
          <div class="separatorHorizontal"></div>
        </div>
      </div>
      <div class="addContacsInput">
        <div class="closeAddContact">
          <button
            onclick="d_none('overlayEdit'), clearInput('nameInputEdit', 'mailInputEdit', 'telInputEdit')"
          >
            <img
              src="../assets/icons/add_task/cross-icon.svg"
              alt="Close Button"
            />
          </button>
        </div>
        <div
          class="background-contacts bg-details"
          id="edit-bg-${indexContacts}"
        >
          ${initials}
        </div>
        <div class="addContactFull">
          <div class="dataInput">
            <form>
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
            </form>
          </div>
          <div class="add-task-bottom-buttons">
            <button
              class="add-task-button-clear"
              onclick="deleteContact('contacts/${contacts[indexContacts].id}'), d_none('overlayEdit'), clearInput('nameInputEdit', 'mailInputEdit', 'telInputEdit')"
            >
              Delete
            </button>
            <button
              class="add-task-button-create"
              onclick="editUser('nameInputEdit', 'mailInputEdit', 'telInputEdit', '${contactId}', '${indexContacts}')"
            >
              Save<img src="../assets/icons/add_task/check-icon.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function overlayCreateUser() {
  return `
      <div class="addContactWindow" onclick="noBubble(event) ">
        <div class="addContactsLogo">
          <div class="addContactsText">
            <p class="weight700 size61">Add contact</p>
            <p class="weight400 size27">Tasks are better with a team!</p>
            <img
              class="addContactsJoin"
              src="../assets/icons/contacts/Capa 1.svg"
              alt="Logo Join"
            />
            <div class="separatorHorizontal"></div>
          </div>
        </div>
        <div class="addContacsInput">
          <div class="closeAddContact">
            <button onclick="d_none('overlay'), clearInput('nameInput', 'mailInput', 'telInput')">
              <img
                src="../assets/icons/add_task/cross-icon.svg"
                alt="Close Button"
              />
            </button>
          </div>
          <div>
            <img src="../assets/icons/contacts/empty_profile.svg" alt="" />
          </div>
          <div class="addContactFull">
            <div class="dataInput">
              <form>
                <input
                  id="nameInput"
                  class="weight400 size20"
                  type="text"
                  required
                  placeholder="Name"
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{1,30} [A-Za-zÀ-ÖØ-öø-ÿ]{1,30}"
                />
                <input
                  id="mailInput"
                  class="weight400 size20"
                  type="email"
                  required
                  placeholder="Email"
                  pattern="[^@\s]+@[^@\s]"
                />
                <input
                  id="telInput"
                  class="weight400 size20"
                  type="tel"
                  required
                  placeholder="Phone"
                  pattern="[0-9]{4,20}"
                />
              </form>
            </div>
            <div class="add-task-bottom-buttons">
              <button
                class="add-task-button-clear"
                onclick="d_none('overlay'), clearInput('nameInput', 'mailInput', 'telInput')"
              >
                Cancel<img src="../assets/icons/add_task/cross-icon.svg" />
              </button>
              <button class="add-task-button-create" onclick="getContactData()">
                Create contact<img
                  src="../assets/icons/add_task/check-icon.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
}
