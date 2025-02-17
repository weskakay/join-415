function getTaskData(taskId) {
  let targetId = taskId;
  let taskKey = Object.keys(tasks).find((key) => tasks[key].id == targetId);
  let setPrio = tasks[taskKey].prio;
  clearTaskDetails();
  getTaskDataDom(targetId, taskKey, setPrio);
  getAssigneeData(taskKey);
  getSubtaskData(taskKey, taskId);
  getPrioImage(setPrio);
}

function getTaskDataDom(targetId, taskKey, setPrio) {
  document.getElementById("taskDetailsHeader").innerHTML = tasks[taskKey].title;
  document.getElementById("taskDetailDescription").innerHTML =
    tasks[taskKey].description;
  document.getElementById("dueDateDetails").innerHTML = tasks[taskKey].date
    .split("-")
    .reverse()
    .join("/");
  document.getElementById("priorityDetails").innerHTML =
    String(setPrio).charAt(0).toUpperCase() + String(setPrio).slice(1);
  document.getElementById("taskTagDetails").innerHTML = tasks[taskKey].category;
  document.getElementById("taskDetailsButtons").innerHTML =
    detailsEditDeleteButtons(targetId);
}

function getPrioImage(setPrio) {
  let prioUrl = document.getElementById("priorityIcon");
  switch (setPrio) {
    case "low":
      prioUrl.src = urgencySymbols[0];
      break;
    case "medium":
      prioUrl.src = urgencySymbols[1];
      break;
    case "urgent":
      prioUrl.src = urgencySymbols[2];
  }
}

function getAssigneeData(taskKey) {
  for (
    let indexAssignee = 0;
    indexAssignee < tasks[taskKey].assigned.length;
    indexAssignee++
  ) {
    let assigneeId = tasks[taskKey].assigned[indexAssignee];
    let assigneeKey = Object.keys(contactsBoard).find(
      (key) => contactsBoard[key].id == assigneeId
    );
    if (contactsBoard[assigneeKey] == undefined) {
      continue;
    } else {
      let assignee = contactsBoard[assigneeKey].name;
      document.getElementById("assigneeDetails").innerHTML +=
        detailsAssigneesInsert(assignee);
    }
  }
}

function getSubtaskData(taskKey, taskId) {
  if (tasks[taskKey].subtasks == undefined) {
    return;
  } else {
    for (
      let indexSubtask = 0;
      indexSubtask < tasks[taskKey].subtasks.length;
      indexSubtask++
    ) {
      let subtaskList = tasks[taskKey].subtasks[indexSubtask].text;
      document.getElementById("substaskListDetails").innerHTML +=
        detailsSubtaskInsert(subtaskList, indexSubtask, taskId);
    }
  }
  getSubtaskStatus(taskKey);
}

function getSubtaskStatus(taskKey) {
  for (
    let indexSubStatus = 0;
    indexSubStatus < tasks[taskKey].subtasks.length;
    indexSubStatus++
  ) {
    let subtaskStatus = tasks[taskKey].subtasks[indexSubStatus].checked;

    let statusCheck = document.getElementById(`subtaskCheck${indexSubStatus}`);
    switch (subtaskStatus) {
      case 0:
        statusCheck.checked = false;
        break;
      case 1:
        statusCheck.checked = true;
    }
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
  document.getElementById("priorityIcon").src = "";
  document.getElementById("taskDetailsButtons").innerHTML = "";
}

async function subtaskStatusChange(indexSubtask, taskKey, subtaskId) {
  let checkStatus = document.getElementById(subtaskId);
  let statusChange = 0;
  if (checkStatus.checked == true) {
    statusChange = 1;
  } else {
    statusChange = 0;
  }
  await patch_data(
    (path = `tasks/${taskKey}/subtask/${indexSubtask}`),
    (data = {
      checked: statusChange,
    })
  );
  getTasks();
}

async function deleteTask(path) {
  await delete_data(path);
  window.location.reload();
}

function editTaskDetails() {
  document.getElementById("tagContainer").classList.toggle("d_none");
  editTaskDetailsDom();
}

function editTaskDetailsDom() {
  editHeader();
  editDescription();
  editDueDate();
}

function editHeader() {
  let headerText = document.getElementById("taskDetailsHeader").innerHTML;
  document.getElementById("taskDetailsHeader").innerHTML =
    insertEditHeader(headerText);
}

function editDescription() {
  let descriptionText = document.getElementById(
    "taskDetailDescription"
  ).innerHTML;
  document.getElementById("taskDetailDescription").innerHTML =
    insertEditDescription(descriptionText);
}

function editDueDate() {
  document.getElementById("dueDateTD").classList.toggle("d_none");
  let dueDateText = document.getElementById("dueDateDetails").innerHTML;
  let fixedDateFormat = dueDateText.split("/").reverse().join("-");
  document.getElementById("dueDateDetails").innerHTML =
    insertEditDueDate(fixedDateFormat);
}

function resetEditWindow() {
  if (
    document.getElementById("tagContainer").classList == "tagContainer d_none"
  ) {
    document.getElementById("dueDateTD").classList.toggle("d_none");
    document.getElementById("tagContainer").classList.toggle("d_none");
  }
}
