const $taskBtn = document.querySelector("#new-task-button");
const $newTask = document.querySelector("#new-task");
const $checkMark = document.querySelector("#tasks-container");
const $switchBtn = document.querySelector("#switch");
const $darkModeIcon = document.querySelector("#dark-mode");
const $ligthModeIcon = document.querySelector("#ligth-mode");
const $header = document.querySelector("header");
const tasksToggleGroup = document.querySelectorAll(".tasks-toggleGroup");
const newTask = document.querySelector("#new-task");
const tasksContainer = document.querySelector("#tasks-container");

document.addEventListener("DOMcontentLoaded", getLocalTasks());

function createTask() {
  const $taskContainer = document.querySelector("#tasks-container");
  const $taskDiv = document.createElement("div");
  const $taskLabel = document.createElement("label");
  const $taskInput = document.createElement("input");
  const $taskSpan = document.createElement("span");
  const $taskText = document.createElement("p");
  $taskText.textContent = $newTask.value;
  $taskDiv.className = "task";
  $taskLabel.className = "check-container";
  $taskInput.className = "task-checkbox";
  $taskSpan.className = "checkmark";
  $taskText.className = "task-text";
  $taskInput.type = "checkbox";
  $taskLabel.appendChild($taskInput);
  $taskLabel.appendChild($taskSpan);
  $taskDiv.appendChild($taskLabel);
  $taskDiv.appendChild($taskText);
  $taskContainer.appendChild($taskDiv);
}

$taskBtn.onclick = function (e) {
  if ($newTask.value === "") {
    return false;
  } else {
    createTask();
    saveLocalUncompletedTasks($newTask.value);
    $newTask.value = "";
  }
  handleTaskCounter();
  e.preventDefault();
};

$checkMark.onclick = function (e) {
  const path = e.path[2];
  const $selectedTask = path.lastChild;
  if (e.target.classList.contains("checkmark")) {
    if ($selectedTask.classList.contains("completed")) {
      path.classList.remove("task-completed");
      $selectedTask.classList.remove("completed");
      removeCompletedLocalTask(path.textContent);
      saveLocalUncompletedTasks(path.textContent);
    } else {
      $selectedTask.classList.add("completed");
      path.classList.add("task-completed");
      saveLocalCompletedTasks(path.textContent);
      removeLocalUncompletedTasks(path.textContent);
    }
    handleTaskCounter();
  }
};

function handleTaskCounter() {
  let $taskCounter = document.querySelector("#task-counter");
  let completedTasks = document.querySelectorAll(".completed");
  let totalTasks = document.querySelectorAll(".task-text");
  $taskCounter.textContent = totalTasks.length - completedTasks.length;
}

const $clearCompletedBtn = document.querySelector("#clear-completed-tasks");
$clearCompletedBtn.onclick = function () {
  localStorage.removeItem("completedTasks");
  let completed = document.querySelectorAll(".task-completed");
  completed.forEach((task) => {
    task.remove();
  });
};

const $completedTasksBtn = document.querySelector("#completed-tasks-btn");
$completedTasksBtn.onclick = function () {
  const $task = document.querySelectorAll(".task");
  $task.forEach((task) => {
    if (task.classList.contains("task-completed")) {
      task.style.display = "block";
    }
    if (!task.classList.contains("task-completed")) {
      task.style.display = "none";
    }
  });
};

const $allTasksBtn = document.querySelector("#all-tasks-btn");
$allTasksBtn.onclick = function () {
  const $task = document.querySelectorAll(".task");
  $task.forEach((task) => {
    task.style.display = "block";
  });
};

const $activeTasksBtn = document.querySelector("#active-tasks-btn");
$activeTasksBtn.onclick = function () {
  const $task = document.querySelectorAll(".task");
  $task.forEach((task) => {
    if (!task.classList.contains("task-completed")) {
      task.style.display = "block";
    }
    if (task.classList.contains("task-completed")) {
      task.style.display = "none";
    }
  });
};

$switchBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  $header.classList.toggle("dark");
  $darkModeIcon.classList.toggle("hide");
  $ligthModeIcon.classList.toggle("hide");
  newTask.classList.toggle("dark");
  tasksContainer.classList.toggle("dark");
  tasksToggleGroup.forEach((group) => {
    group.classList.toggle("dark");
  });
});

function saveLocalUncompletedTasks(task) {
  let uncompletedTasks;
  if (localStorage.getItem("uncompletedTasks") === null) {
    uncompletedTasks = [];
  } else {
    uncompletedTasks = JSON.parse(localStorage.getItem("uncompletedTasks"));
  }
  uncompletedTasks.push(task);
  localStorage.setItem("uncompletedTasks", JSON.stringify(uncompletedTasks));
}

function saveLocalCompletedTasks(completedTask) {
  let completedTasks;
  if (localStorage.getItem("completedTasks") === null) {
    completedTasks = [];
  } else {
    completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
  }
  if (!completedTasks.includes(completedTask)) {
    completedTasks.push(completedTask);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }
}

function getLocalTasks() {
  const localUncompletedTasks = JSON.parse(
    localStorage.getItem("uncompletedTasks")
  );
  const localCompletedTasks = JSON.parse(
    localStorage.getItem("completedTasks")
  );
  if (localUncompletedTasks != null) {
    setLocalUncompletedTasks(localUncompletedTasks);
  }
  if (localCompletedTasks != null) {
    setLocalCompletedTasks(localCompletedTasks);
  }
}

function setLocalUncompletedTasks(localUncompletedTasks) {
  localUncompletedTasks.forEach((task) => {
    const $taskContainer = document.querySelector("#tasks-container");
    const $taskDiv = document.createElement("div");
    const $taskLabel = document.createElement("label");
    const $taskInput = document.createElement("input");
    const $taskSpan = document.createElement("span");
    const $taskText = document.createElement("p");
    $taskText.textContent = task;
    $taskDiv.className = "task";
    $taskLabel.className = "check-container";
    $taskInput.className = "task-checkbox";
    $taskSpan.className = "checkmark";
    $taskText.className = "task-text";
    $taskInput.type = "checkbox";
    $taskLabel.appendChild($taskInput);
    $taskLabel.appendChild($taskSpan);
    $taskDiv.appendChild($taskLabel);
    $taskDiv.appendChild($taskText);
    $taskContainer.appendChild($taskDiv);
  });
}

function setLocalCompletedTasks(localCompletedTasks) {
  localCompletedTasks.forEach((task) => {
    const $taskContainer = document.querySelector("#tasks-container");
    const $taskDiv = document.createElement("div");
    const $taskLabel = document.createElement("label");
    const $taskInput = document.createElement("input");
    const $taskSpan = document.createElement("span");
    const $taskText = document.createElement("p");
    $taskText.textContent = task;
    $taskDiv.className = "task task-completed";
    $taskLabel.className = "check-container";
    $taskInput.className = "task-checkbox";
    $taskSpan.className = "checkmark";
    $taskText.className = "task-text completed";
    $taskInput.type = "checkbox";
    $taskLabel.appendChild($taskInput);
    $taskLabel.appendChild($taskSpan);
    $taskDiv.appendChild($taskLabel);
    $taskDiv.appendChild($taskText);
    $taskContainer.appendChild($taskDiv);
    $taskInput.checked = true;
  });
}

function removeCompletedLocalTask(task) {
  completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
  let index = completedTasks.indexOf(task);
  completedTasks.splice(index, 1);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function removeLocalUncompletedTasks(task) {
  uncompletedTasks = JSON.parse(localStorage.getItem("uncompletedTasks"));
  let index = uncompletedTasks.indexOf(task);
  uncompletedTasks.splice(index, 1);
  localStorage.setItem("uncompletedTasks", JSON.stringify(uncompletedTasks));
}
