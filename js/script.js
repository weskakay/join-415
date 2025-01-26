let users = [];

const BASE_URL =
  "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";

function init() {
  getUsers();
}

async function getUsers() {
  let response = await fetch(BASE_URL + ".json");
  users = await response.json();
  console.log(users);
}
