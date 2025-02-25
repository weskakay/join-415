function showTaskNumbers() {
  let priorities = [];
  let dates = [];
  document.getElementById("tasks_board").innerHTML = tasks.length;
  for (let indexTasks = 0; indexTasks < tasks.length; indexTasks++) {
    priorities.push(tasks[indexTasks].prio.trim());
    dates.push(tasks[indexTasks].date);
  }
  showurgentNumber(priorities);
  showClosestDate(dates);
  countStatusTasks();
}

function showurgentNumber(priorities) {
  let urgentCount = 0;

  for (let indexUrgent = 0; indexUrgent < priorities.length; indexUrgent++) {
    if (priorities[indexUrgent] == "urgent") {
      urgentCount++;
    }
    document.getElementById("urgent").innerHTML = urgentCount;
  }
}

function showClosestDate(dates) {
  let sortedDates = dates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });
  let closestDate = new Date(sortedDates[0]);
  let splitDate = sortedDates[0].split("-");
  let splitDay = splitDate[2];
  let splitYear = splitDate[0];
  document.getElementById("deadline").innerHTML =
    months[closestDate.getMonth()] + " " + splitDay + ", " + splitYear;
}

function countStatusTasks() {
  let statusAmount = [];
  for (let indexStatus = 0; indexStatus < tasks.length; indexStatus++) {
    statusAmount.push(tasks[indexStatus].status);
  }
  let count = statusAmount.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  document.getElementById("tasks_to_do").innerHTML = count.todo;
  document.getElementById("tasks_done").innerHTML = count.done;
  document.getElementById("tasks_progress").innerHTML = count.progress;
  document.getElementById("tasks_awaiting").innerHTML = count.feedback;
}
