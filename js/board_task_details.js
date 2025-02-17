let assigneeEditKey = [];
let taskKey = "";

function getTaskData(taskId) {
  let targetId = taskId;
  taskKey = Object.keys(tasks).find((key) => tasks[key].id == targetId);
  let setPrio = tasks[taskKey].prio;
  clearTaskDetails();
  getTag(taskKey);
  getHeader(taskKey);
  getDescription(taskKey);
  getTaskDataDom(targetId, taskKey);
  getDueDate(taskKey);
  getPriority(setPrio);
  getAssigneeContainer(taskKey);
  getSubtaskContainer(taskKey, taskId);
}

function getTaskDataDom(targetId, taskKey) {
  document.getElementById("taskDetailsButtons").innerHTML =
    detailsEditDeleteButtons(targetId);
}

function getTag(taskKey) {
  let taskTag = tasks[taskKey].category;
  document.getElementById("tagContainer").innerHTML = detailsTagInsert(taskTag);
}

function getHeader(taskKey) {
  let cleanHeader = tasks[taskKey].title;
  document.getElementById("taskDetailsHeader").innerHTML =
    detailsHeaderInsert(cleanHeader);
}

function getDescription(taskKey) {
  let cleanDescription = tasks[taskKey].description;
  document.getElementById("taskDetailDescription").innerHTML =
    detailsDescriptionInsert(cleanDescription);
}

function getDueDate(taskKey) {
  let cleanDate = tasks[taskKey].date.split("-").reverse().join("/");
  document.getElementById("dueDateTR").innerHTML =
    detailsDueDateInsert(cleanDate);
}

function getPriority(setPrio) {
  let cleanPriority =
    String(setPrio).charAt(0).toUpperCase() + String(setPrio).slice(1);
  document.getElementById("priorityDetailsTR").innerHTML =
    detailsPriorityInsert(cleanPriority);
  getPrioImage(setPrio);
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

function getAssigneeContainer(taskKey) {
  document.getElementById("assigneeDetails").innerHTML =
    assigneeContainerInsert();
  getAssigneeData(taskKey);
}

function getAssigneeData(taskKey) {
  assigneeEditKey = [];
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
      assigneeEditKey.push(assigneeKey);
      let assignee = contactsBoard[assigneeKey].name;
      let assigneeInitials = contactsBoard[assigneeKey].initials;
      let assigneeColor = contactsBoard[assigneeKey].colorId;
      document.getElementById("assigneeList").innerHTML +=
        detailsAssigneesInsert(assignee, assigneeInitials, assigneeColor);
    }
  }
}

function getSubtaskContainer(taskKey, taskId) {
  document.getElementById("subtaskContainer").innerHTML =
    detailsSubtaskContainer();
  getSubtaskData(taskKey, taskId);
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
  document.getElementById("dueDateTR").innerHTML = "";
  document.getElementById("priorityDetailsTR").innerHTML = "";
  document.getElementById("tagContainer").innerHTML = "";
  document.getElementById("assigneeDetails").innerHTML = "";
  document.getElementById("subtaskContainer").innerHTML = "";
  document.getElementById("taskDetailsButtons").innerHTML = "";
}

//edit task window from here on

function editTaskDetails() {
  editTag();
  editHeader();
  editDescription();
  editDueDate();
  editPriority();
  editAssignee();
  editSubtasks();
}

function editTag() {
  document.getElementById("tagContainer").innerHTML = "";
}

function editHeader() {
  let headerText = document.getElementById("detailsHeader").innerHTML;
  document.getElementById("taskDetailsHeader").innerHTML =
    insertEditHeader(headerText);
}

function editDescription() {
  let descriptionText = document.getElementById("detailsDescription").innerHTML;
  document.getElementById("taskDetailDescription").innerHTML =
    insertEditDescription(descriptionText);
}

function editDueDate() {
  let dueDateText = document.getElementById("dueDateDetails").innerHTML;
  let fixedDateFormat = dueDateText.split("/").reverse().join("-");
  document.getElementById("dueDateTR").innerHTML =
    insertEditDueDate(fixedDateFormat);
}

function editPriority() {
  document.getElementById("priorityDetailsTR").innerHTML = insertEditPriority();
}

function editAssignee() {
  document.getElementById("assigneeDetails").innerHTML = insertEditAssignee();
  editAssigneeList();
  editAssigneeImage();
}

function editAssigneeList() {
  for (
    let indexAssList = 0;
    indexAssList < contactsBoard.length;
    indexAssList++
  ) {
    let cleanedContact = contactsBoard[indexAssList].name;
    let cleanedContactId = contactsBoard[indexAssList].id;
    document.getElementById("editAssigneeList").innerHTML +=
      insertAssigneeSelectionList(cleanedContact, cleanedContactId);
  }
}

function editAssigneeImage() {
  for (let indexFind = 0; indexFind < assigneeEditKey.length; indexFind++) {
    let assigneeImageColor = contactsBoard[assigneeEditKey[indexFind]].colorId;
    let assigneeImageInitials =
      contactsBoard[assigneeEditKey[indexFind]].initials;
    document.getElementById("editAssigneeImage").innerHTML +=
      insertEditAssigneeImage(assigneeImageColor, assigneeImageInitials);
  }
}

function editSubtasks() {
  document.getElementById("subtaskContainer").innerHTML =
    insertSubtaskContainer();
  editSubtasksList();
}

function editSubtasksList() {
  for (
    let indexTaskKey = 0;
    indexTaskKey < tasks[taskKey].subtasks.length;
    indexTaskKey++
  ) {
    let subtaskText = tasks[taskKey].subtasks[indexTaskKey].text;
    document.getElementById("substaskListDetails").innerHTML +=
      insertSubtasksList(subtaskText);
  }
}

//update & delete task

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
