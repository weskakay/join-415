let tasks = [];
let contacts = [];
let cleanTasks = [];
/**
 * Fetches tasks from the database and stores them in the tasks array.
 * @param {string} [path='tasks/'] - The API path to fetch tasks.
 */

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
    });
  });
}

async function getTasks(path = `tasks/`) {
  getContacts();
  tasks = [];
  cleanTasks = [];
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
      assingned: content.contact,
      prio: content.prio,
    });
  });
  renderTasks();
}

function renderTasks() {
  let todo = document.getElementById("board_todo");
  let progress = document.getElementById("board_progress");
  let feedback = document.getElementById("board_feedback");
  let done = document.getElementById("board_done");

  let tasksTodo = {};
  for (let i = 0; i < tasks.length; i++) {
    (todo.innerHTML += listTasks(tasks[i], i)),
      getAssignedContacts(tasks[i].assingned, i);
  }
}

function getAssignedContacts(contactIDs, index) {
  let content = document.getElementById("card_contact_" + index);
  content.innerHTML = "";

  let assingnedContacts = contacts.filter((contact) =>
    contactIDs.includes(contact.id)
  );
  for (let i = 0; i < assingnedContacts.length; i++) {
    content.innerHTML += listCardContacts(assingnedContacts[i]);
  }
}

function truncateText(text) {
  return text.length > 48 ? text.substring(0, 48) + "..." : text;
}

/**
 * Filters tasks based on search input and updates the board.
 * Shows a message if no tasks match the search criteria.
 */
function searchTasks() {
  let searchInput = document
    .querySelector("#board-search-container input")
    .value.toLowerCase();
  let taskContainers = document.querySelectorAll(".board-card");
  let noResultsMessage = document.getElementById("no-results-message");
  let foundTasks = false;

  taskContainers.forEach((task) => {
    let title = task
      .querySelector(".card-title-discription p.weight700")
      .innerText.toLowerCase();
    let description = task
      .querySelector(".card-title-discription p.weight400")
      .innerText.toLowerCase();

    if (title.includes(searchInput) || description.includes(searchInput)) {
      task.style.display = "flex";
      foundTasks = true;
    } else {
      task.style.display = "none";
    }
  });

  if (!foundTasks) {
    noResultsMessage.style.display = "block";
  } else {
    noResultsMessage.style.display = "none";
  }
}
/**
 * Allows task elements to be dropped into a new column.
 * @param {Event} ev - The drag event.
 */
function allowDrop(ev) {
  ev.preventDefault();
}
/**
 * Stores the ID of the dragged task element.
 * @param {Event} ev - The drag start event.
 */
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
/**
 * Handles the drop event, moves the task to the new column, and saves its position.
 * @param {Event} ev - The drop event.
 * @param {string} targetColumn - The ID of the target column where the task should be moved.
 */
function drop(ev) {
  ev.preventDefault();
  const draggedElement = document.getElementById(
    ev.dataTransfer.getData("text")
  );
  const dropTarget = ev.target.closest(".board-card-container");

  if (dropTarget) {
    dropTarget.appendChild(draggedElement);
  }
}
/**
 * Displays the "No tasks" message if a column is empty.
 * @param {string} id - The ID of the board column.
 */
function showNoTask(id) {
  let container = document.getElementById(`board_${id}`);
  let content = document.getElementById(`no-task-${id}`);

  console.log(container.children.length);

  if ((container.children.length = 1)) {
    content.style.display = "flex";
  }
}
/**
 * Opens the "Add Task" overlay and hides the left navbar.
 */
function openAddTaskOverlay() {
  document.getElementById("addTaskOverlay").classList.remove("hidden");
}
/**
 * Closes the "Add Task" overlay and makes the left navbar visible again.
 */
function closeAddTaskOverlay() {
  document.getElementById("addTaskOverlay").classList.add("hidden");
}

/**
 * Event listener for search input
 */
document.addEventListener("DOMContentLoaded", () => {
  let searchInput = document.querySelector("#board-search-container input");
  let boardWrapper = document.querySelector(".board-wrapper");

  if (searchInput) {
    searchInput.addEventListener("input", searchTasks);

    let noResultsMessage = document.createElement("div");
    noResultsMessage.id = "no-results-message";
    noResultsMessage.innerText = "No results found.";
    noResultsMessage.style.display = "none";
    noResultsMessage.style.textAlign = "center";
    noResultsMessage.style.marginTop = "20px";
    noResultsMessage.style.fontSize = "18px";
    noResultsMessage.style.color = "#8B0000";

    boardWrapper.appendChild(noResultsMessage);
  }
});

function getTaskData(taskId) {
  clearTaskDetails();
  document.getElementById("taskDetailsHeader").innerHTML =
    cleanTasks[taskId].title;
  document.getElementById("taskDetailDescription").innerHTML =
    cleanTasks[taskId].description;
  document.getElementById("dueDateDetails").innerHTML = cleanTasks[taskId].date
    .split("-")
    .reverse()
    .join("/");
  document.getElementById("priorityDetails").innerHTML =
    cleanTasks[taskId].prio;
  document.getElementById("taskTagDetails").innerHTML =
    cleanTasks[taskId].category;
  getAssigneeData(taskId);
  getSubtaskData(taskId);
}

function getAssigneeData(taskId) {
  for (
    let indexAssignee = 0;
    indexAssignee < cleanTasks[taskId].contact.length;
    indexAssignee++
  ) {
    let assigneeId = cleanTasks[taskId].contact[indexAssignee];
    let assignee = cleanContacts[assigneeId].name;
    document.getElementById("assigneeDetails").innerHTML +=
      detailsAssigneesInsert(assignee);
  }
}

function getSubtaskData(taskId) {
  for (
    let indexSubtask = 0;
    indexSubtask < cleanTasks[taskId].subtask.length;
    indexSubtask++
  ) {
    let subtaskList = cleanTasks[taskId].subtask[indexSubtask];
    document.getElementById("substaskListDetails").innerHTML +=
      detailsSubtaskInsert(subtaskList);
  }
}

function clearTaskDetails() {
  document.getElementById("taskDetailsHeader").innerHTML = "";
  document.getElementById("taskDetailDescription").innerHTML = "";
  document.getElementById("dueDateDetails").innerHTML = "";
  document.getElementById("priorityDetails").innerHTML = "";
  document.getElementById("taskTagDetails").innerHTML = "";
  document.getElementById("assigneeDetails").innerHTML = "";
  document.getElementById("substaskListDetails").innerHTML = "";
}
