let subtaskRef = document.getElementById("subtaskInput");
let subtaskRefEdit = document.getElementById("subtaskEditInput");

document.addEventListener("click", function (event) {
  let list = document.getElementById("contacts-checkbox");
  let searchBox = document.getElementById("contact-search");

  if (!list.contains(event.target) && event.target !== searchBox) {
    list.style.display = "none";
  }
});

subtaskRef.addEventListener("blur", (event) => {
  setTimeout(() => {
    let checkCross = document.getElementById("checkCross");
    let addIcon = document.getElementById("addIcon");
    checkCross.style.display = "none";
    addIcon.style.display = "block";
  }, 150);
});

subtaskRefEdit.addEventListener("blur", (event) => {
  setTimeout(() => {
    let checkCross = document.getElementById("checkCrossEdit");
    let addIcon = document.getElementById("addIconEdit");
    checkCross.style.display = "none";
    addIcon.style.display = "block";
  }, 150);
});

if (subtaskRef) {
  subtaskRef.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      confirmInput();
    }
  });
}
