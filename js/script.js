function d_none(enterid) {
  document.getElementById(enterid).classList.toggle("d_none");
}

function noBubble(event) {
  event.stopPropagation();
}

function changeNavbarItems(id) {
  window.location.href = `../html/${id}.html`;
}
