let tasks = [];
let subtasks = [];
let subtaskInputs = [];
let contacts = [];
let taskKey = 0;
let assigneeEditKey = [];
let selectedContactsIDs = [];
let selectedAssignee = [];
let newPrio = "";
//let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
let bgcolors = [
  { id: 0, rgba: "rgba(255, 105, 135, 1)" },
  { id: 1, rgba: "rgba(255, 180, 120, 1)" },
  { id: 2, rgba: "rgba(186, 85, 211, 1)" },
  { id: 3, rgba: "rgba(100, 200, 250, 1)" },
  { id: 4, rgba: "rgba(60, 179, 113, 1)" },
  { id: 5, rgba: "rgb(153, 197, 43)" },
  { id: 6, rgba: "rgba(218, 165, 32, 1)" },
  { id: 7, rgba: "rgb(205, 127, 224)" },
  { id: 8, rgba: "rgba(138, 43, 226, 1)" },
  { id: 9, rgba: "rgba(255, 165, 0, 1)" },
];
let tagColors = ["rgba(0, 56, 255, 1)", "rgba(31, 215, 193, 1)"];

async function loadDataBoard() {
  await getContacts();
  await getTasks();
  renderTasks();
  renderContacts(contacts, "contacts-checkbox");
  minDate("date");
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

async function loadDataAddTask() {
  await getContacts();
  renderContacts(contacts, "contacts-checkbox");
  setButtonColor("Medium", "#FFA800");
  minDate("date");
}

/**
 * Fetches all contacts from the Firebase Realtime DB and populates the global 'contacts' array.
 *
 * @async
 * @param {string} [path='contacts/'] - The path to the contacts collection in Firebase.
 * @returns {Promise<void>}
 */
async function getContacts(path = `contacts/`) {
  contacts = [];
  let response = await fetch(BASE_URL + path + ".json");
  let contactData = await response.json();
  if (contactData != 0) {
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
}

/**
 * Fetches all tasks from the Firebase Realtime DB and populates the global 'tasks' array.
 * Also processes subtasks and assigned contacts from the fetched data.
 *
 * @async
 * @param {string} [path='tasks/'] - The path to the tasks collection in Firebase.
 * @returns {Promise<void>}
 */
async function getTasks(path = `tasks/`) {
  tasks = [];
  let response = await fetch(BASE_URL + path + ".json");
  let tasksData = await response.json();
  if (tasksData != null) {
    Object.entries(tasksData).forEach(([id, content]) => {
      let subtasksArray = [];
      if (content.subtask) {
        subtasksArray = Object.entries(content.subtask)
          .filter(([key, value]) => value !== null && value !== undefined)
          .map(([subtaskId, subtaskContent]) => ({
            id: subtaskId,
            checked: subtaskContent.checked,
            text: subtaskContent.text,
          }));
      }
      let contactArray = [];
      if (content.contact) {
        contactArray = Object.entries(content.contact)
          .filter(([key, value]) => value !== null && value !== undefined)
          .map(([assigneeId, assigneeContent]) => ({
            "assigneeId": assigneeId,
            "mainContactId": assigneeContent.id,
          }));
      }
      tasksPush(tasks, id, content, subtasksArray, contactArray);
    });
  }
}

/**
 * Builds a Task object from the downloaded data and pushes it into the global tasks array.
 *
 * @param {Array} tasks - Reference to the global tasks array.
 * @param {string} id - The Firebase ID of the task.
 * @param {object} content - The raw task data from Firebase.
 * @param {Array} subtasksArray - Array of parsed subtask objects.
 * @param {Array} contactArray - Array of assigned contact objects.
 */
function tasksPush(tasks, id, content, subtasksArray, contactArray){
tasks.push({
  id: id,
  status: content.status,
  category: content.category,
  title: content.title,
  description: content.description,
  subtasks: subtasksArray,
  assigned: contactArray,
  prio: content.prio,
  date: content.date,
});
}