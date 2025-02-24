let subtaskRef = document.getElementById("subtaskInput");
let contactsInputRef = document.getElementById("contact-search");
let contactsCheckRef = document.getElementById("contacts-checkbox");

document.addEventListener("click", function (event) {
  let list = document.getElementById("contacts-checkbox");
  let searchBox = document.getElementById("contact-search");

  if (!list.contains(event.target) && event.target !== searchBox) {
    list.style.display = "none";
  }
});

if (subtaskRef) {
  subtaskRef.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      confirmInput();
    }
  });
}
