let tasks = [];
/**
 * Fetches tasks from the database and stores them in the tasks array.
 * @param {string} [path='tasks/'] - The API path to fetch tasks.
 */
async function getTasks(path = `tasks/`) {
  tasks = [];
  let response = await fetch(BASE_URL + path + ".json");
  let tasksData = await response.json();
  if (tasksData == null) {
    document.getElementById("").innerHTML = "";
    document.getElementById("").innerHTML = "";
    return;
  } else {
    Object.entries(tasksData).forEach(([id, content]) => {
      tasks.push({
        id: id,
        category: content.category,
        title: content.title,
        discription: content.discription,
        prio: content.prio,
        assingned: content.assingned,
        subtasks: content.sub,
      });
    });
    sortContacts();
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
 * Enables horizontal scrolling in the board container using the mouse wheel.
 */
document.addEventListener("DOMContentLoaded", () => {
  let container = document.querySelector('.board-card-container');
  if (container) {
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY * 2;
    });
  } else {
    console.error("Element '.board-card-container' nicht gefunden!");
  }
});