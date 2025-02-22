let subtaskRef= document.getElementById('subtaskInput');

document.addEventListener("click", function (event) {
  let list = document.getElementById("contacts-checkbox");
  let searchBox = document.getElementById("contact-search");

  if (!list.contains(event.target) && event.target !== searchBox) {
    list.style.display = "none";
  }
});


 if(subtaskRef) {subtaskRef.addEventListener("blur", function (event) {
    setTimeout(() => {
      let checkIcon = document.getElementById("checkCross");

      if (document.activeElement !== checkIcon) {
        hideButtons();
      }
    }, 100);
  })};

if(subtaskRef) {subtaskRef.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      confirmInput();
    }
  })};
