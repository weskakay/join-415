function listContactData(userName, userEmail, indexContacts, initials) {
  return /*html*/ `
    <div class="contactsContainer" tabindex="0" onclick="openContactDetails(${indexContacts})">
    <div class="background-contacts">${initials}</div>
        <div class="contactsContainerUserinfo"> 
            <p class="weight400 size20">${userName}</p>
            <a class="weight400 size16 emailLink" href="mailto:${userEmail}">${userEmail}</a>
        </div>
    </div>
    `;
}

function contactsFullDetails(
  userName,
  userEmail,
  userPhone,
  indexContacts,
  initials
) {
  return /*html*/ `
        <div class="detailsProfile">
        <div class="background-contacts bg-details">${initials}</div>
            <div class="detailsName">
                <p class="weight500 size47">${userName}</p>
                <div class="detailsEdit">
                    <button>
                        <img
                            src="../assets/icons/contacts/edit.svg"
                            alt="Edit Symbol"
                        />
                        <p class="weight400 size16 colorDarkBlue">Edit</p>
                    </button>
                    <button onclick="deleteContact('contacts/${contacts[indexContacts].id}')">
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
