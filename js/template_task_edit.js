//from here task details window

function detailsTagInsert(taskTag) {
  return `
    <div class="tag">
      <p class="size23">${taskTag}</p>
    </div>
  `;
}

function detailsHeaderInsert(cleanHeader) {
  return `
  <p id="detailsHeader" class="weight700 size61">${cleanHeader}</p>
  `;
}

function detailsDescriptionInsert(cleanDescription) {
  return `
  <p id="detailsDescription" class="weight400 size20">${cleanDescription}</p>
  `;
}

function detailsDueDateInsert(cleanDate) {
  return `
    <td class="weight400 size20 colorDarkBlue">Due Date:</td>
    <td id="dueDateDetails" class="weight400 size20">${cleanDate}</td>
  `;
}

function detailsPriorityInsert(cleanPriority) {
  return `
    <td class="weight400 size20 colorDarkBlue">Priority:</td>
    <td class="displayFlex">
      <p class="weight400 size20">${cleanPriority}</p>
      <img id="priorityIcon" src="" alt="Priority Icon" />
    </td>
  `;
}

function assigneeContainerInsert() {
  return `
    <p class="weight400 size20 colorDarkBlue">Assigned to:</p>
    <div id="assigneeList" class="assigneeList"></div>
  `;
}

function detailsAssigneesInsert(assignee, assigneeInitials, assigneeColor) {
  return `
    <div class="assignee">
      <div class="background-contacts" style="background-color: ${bgcolors[assigneeColor].rgba}">
        <p class="weight400 size12">${assigneeInitials}</p>
      </div>
      <p class="weight400 size19">${assignee}</p>
    </div>
  `;
}

function detailsSubtaskContainer() {
  return `
    <p class="weight400 size20 colorDarkBlue">Substasks</p>
    <div id="substaskListDetails" class="subtaskList"></div>
  `;
}

function detailsSubtaskInsert(indexSubtask, subtaskList, subtaskId, taskId) {
  return `
    <div class="subtask">
      <input
        onclick="subtaskStatusChange('${subtaskId}', '${taskId}', this.id)"
        id="subtaskCheck${indexSubtask}"
        type="checkbox"
      />
      <p class="weight400 size16">${subtaskList}</p>
    </div>
  `;
}

function detailsEditDeleteButtons(targetId) {
  return `
    <div class="detailsEdit">
      <button onclick="deleteTask('tasks/${targetId}')">
        <img src="../assets/icons/contacts/delete.svg" alt="Delete Symbol" />
        <p class="weight400 size16 colorDarkBlue">Delete</p>
      </button>
      <button onclick="editTaskDetails()">
        <img src="../assets/icons/contacts/edit.svg" alt="Edit Symbol" />
        <p class="weight400 size16 colorDarkBlue">Edit</p>
      </button>
    </div>
  `;
}

//from here task edit window
function insertEditHeader(headerText) {
  return `
    <p class="weight400 size16">Title</p>
    <div class="add-task-input-fields">
      <input id="inputTitleEdit" value="${headerText}" type="text" />
    </div>
  `;
}

function insertEditDescription(descriptionText) {
  return `
    <p class="weight400 size16">Description</p>
    <div class="add-task-input-fields">
      <textarea
        id="inputDescriptionEdit"
        type="text"
      >${descriptionText}</textarea>
    </div>
  `;
}

function insertEditDueDate(dueDateText) {
  return `
    <p class="weight400 size16">Due Date</p>
    <div class="add-task-input-fields">
      <input value="${dueDateText}"  type="date" id="inputDueDateEdit" />
    </div>
  `;
}

function insertEditPriority() {
  return `
    <p class="weight400 size16 colorLightGrey">Priority</p>
    <div class="add-task-input-fields">
      <div class="add-task-prio">
        <button
          class="button-prio-urgent"
          id="buttonUrgentEdit"
          onclick="setButtonColor('UrgentEdit', '#FF3D00')"
        >
          Urgent<img
            src="../assets/icons/add_task/prio-urgent-icon.svg"
            alt="Urgent priority"
          />
        </button>
        <button
          class="button-prio-medium"
          id="buttonMediumEdit"
          onclick="setButtonColor('MediumEdit', '#FFA800')"
        >
          Medium<img
            src="../assets/icons/add_task/prio-medium-icon.svg"
            alt="Medium priority"
          />
        </button>
        <button
          class="button-prio-low"
          id="buttonLowEdit"
          onclick="setButtonColor('LowEdit', '#7AE229')"
        >
          Low<img
            src="../assets/icons/add_task/prio-low-icon.svg"
            alt="Low priority"
          />
        </button>
      </div>
    </div>
  `;
}

function insertEditAssignee() {
  return `
    <div class="add-task-input-fields">
      <div>Assigned to<span class="add-task-required">*</span></div>
    </div>
    <div class="add-task-contacts">
      <input
        type="text"
        id="editAssigneesSearch"
        onclick="openContactsList('editAssigneesCheckbox')"
        oninput="filterContacts('editAssigneesCheckbox')"
        placeholder="Select contacts to assign"
      />
    </div>
    <div class="displayFlex" id="editAssigneeList"></div>
    <div class="displayFlex" id="editAssigneeImage"></div>
  `;
}

function insertEditAssigneeSelectionList() {
  return `
    <ul
      class="add-task-items"
      id="editAssigneesCheckbox"
      style="display: none"
    ></ul>
  `;
}
//inserts image of assigned user
function insertEditAssigneeImage(assigneeImageColor, assigneeImageInitials) {
  return `
    <div
      class="background-contacts"
      style="background-color: ${bgcolors[assigneeImageColor].rgba}"
    >
      <p class="weight400 size12">${assigneeImageInitials}</p>
    </div>
  `;
}

function insertSubtaskContainer(mainTaskKey) {
  return `
    <div class="add-task-input-fields">
      <p class="weight400 size16 colorLightGrey">Subtasks</p>
      <div class="add-task-input-subtasks">
        <input
          type="text"
          id="subtaskEditInput"
          placeholder="Add new subtask"
          onclick="showButtonEdit('addIconEdit','checkCrossEdit')"
        />
        <div class="add-task-subtasks-icons-wrapper">
          <div id="addIconEdit">
            <div class="add-task-subtasks-icon">
              <div
                class="add-task-subtasks-add"
                onclick="selectInputEdit('subtaskEditInput')"
              >
                <img
                  src="../assets/icons/add_task/add-icon.svg"
                  alt="Add subtask"
                />
              </div>
            </div>
          </div>
          <div class="add-task-subtasks-check-cross" id="checkCrossEdit">
            <div
              class="add-task-subtasks-icon"
              onclick="clearSubtaskInput('subtaskEditInput')"
            >
              <img src="../assets/icons/add_task/cross-icon.svg" alt="Cancel" />
            </div>
            <div class="add-task-subtasks-seperator"></div>
            <div
              class="add-task-subtasks-icon"
              onclick="addEditSubtask('subtaskEditInput', '${mainTaskKey}')"
            >
              <img
                class="add-task-subtasks-check"
                src="../assets/icons/add_task/check-icon.svg"
                alt="Confirm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="subtaskList">
      <ul id="substaskListDetails"></ul>
    </div>
  `;
}

function insertSubtasksList(subtaskText, subtaskId, mainTaskKey) {
  return `
    <div class="subtaskDetailsEdit">
      <li>${subtaskText}</li>
      <div class="subtaskEditButton">
        <button class="subtaskEdit">
          <img src="../assets/icons/contacts/edit.svg" alt="Edit Symbol" />
        </button>
        <div class="separator24"></div>
        <button
          class="subtaskDelete"
          onclick="deleteSubtask('tasks/${mainTaskKey}/subtask/${subtaskId}')"
        >
          <img src="../assets/icons/contacts/delete.svg" alt="Delete Symbol" />
        </button>
      </div>
    </div>
  `;
}
