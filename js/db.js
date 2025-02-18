let tasks = [];

let contacts = [];

let urgencySymbols = [
  "../assets/icons/add_task/prio-low-icon.svg",
  "../assets/icons/add_task/prio-medium-icon.svg",
  "../assets/icons/add_task/prio-urgent-icon.svg",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function loadDataBoard() {
  await getContacts();
  await getTasks();
  renderTasks();
}

async function loadDataContacts() {
  await getContacts();
  orderContactsBoard();
}

async function loadDataSummary() {
  await getContacts();
  await getTasks();
  showTaskNumbers();
}

async function getContacts(path = `contacts/`) {
  contacts = [];
  let response = await fetch(BASE_URL + path + ".json");
  let contactData = await response.json();
  Object.entries(contactData).forEach(([id, details]) => {
    contacts.push({
      id: id,
      name: details.name,
      email: details.email,
      phone: details.phone,
      colorId: details.colorId,
      initials: getInitials(details.name),
    });
  });
}

async function getTasks(path = `tasks/`) {
  tasks = [];
  let response = await fetch(BASE_URL + path + ".json");
  let tasksData = await response.json();
  Object.entries(tasksData).forEach(([id, content]) => {
    tasks.push({
      id: id,
      status: content.status,
      category: content.category,
      title: content.title,
      description: content.description,
      subtasks: content.subtask,
      assigned: content.contact,
      prio: content.prio,
      date: content.date,
    });
  });
}
