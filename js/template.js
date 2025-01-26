function insertContactData(userName, userEmail) {
  return `
    <div class="contactsContainer">
        <div>
            <img src="../assets/icons/add_task/user_image.svg" alt="">
        </div>
        <div>
            <p class="weight400 size20">${userName}</p>
            <p class="weight400 size16">${userEmail}</p>
        </div>
    </div>
    `;
}
