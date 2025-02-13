let tasksNumbersList = [];

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

async function tasksNumbers(path = `tasks/`) {
  tasksNumbersList = [];
  let response = await fetch(BASE_URL + path + ".json");
  let tasksData = await response.json();
  if (tasksData == null) {
    document.getElementById("").innerHTML = "";
    document.getElementById("").innerHTML = "";
    return;
  } else {
    Object.entries(tasksData).forEach(([id, content]) => {
      tasksNumbersList.push({
        id: id,
        category: content.category,
        title: content.title,
        discription: content.discription,
        prio: content.prio,
        assingned: content.assingned,
        subtasks: content.sub,
        date: content.date,
      });
    });
  }
  showTaskNumbers();
}

function showTaskNumbers() {
  let priorities = [];
  let dates = [];
  document.getElementById("tasks_board").innerHTML = tasksNumbersList.length;
  for (let indexTasks = 0; indexTasks < tasksNumbersList.length; indexTasks++) {
    priorities.push(tasksNumbersList[indexTasks].prio.trim());
    dates.push(tasksNumbersList[indexTasks].date);
  }
  showurgentNumber(priorities);
  showClosestDate(dates);
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
