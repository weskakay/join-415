let tasks = [];

const BASE_URL =
  "https://join-415-default-rtdb.europe-west1.firebasedatabase.app/";

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

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

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

function showNoTask(id) {
  let container = document.getElementById(`board_${id}`);
  let content = document.getElementById(`no-task-${id}`);

  console.log(container.children.length);

  if ((container.children.length = 1)) {
    content.style.display = "flex";
  }
}
