function listContactData(userName, userEmail, indexContacts) {
  return `
    <div class="contactsContainer" onclick="openContactDetails(${indexContacts})">
        <div>
            <img src="../assets/icons/add_task/user_image.svg" alt="Profile Picture">
        </div>
        <div>
            <p class="weight400 size20">${userName}</p>
            <a class="weight400 size16 emailLink" href="mailto:${userEmail}">${userEmail}</p>
        </div>
    </div>
    `;
}

function contactsFullDetails(userName, userEmail, userPhone, indexContacts) {
  return `
        <div class="detailsProfile">
            <img
            src="../assets/icons/add_task/user_image.svg"
            alt="Profile Picture"
            />
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
                    <button onclick="deleteUser('user/${users[indexContacts].id}')">
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
