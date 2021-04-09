const $taskBtn = document.querySelector("#new-task-button");
const $newTask = document.querySelector("#new-task");
const $tasks = document.querySelector("#tasks-container");
const $switchBtn = document.querySelector('#switch')
const $darkModeIcon = document.querySelector('#dark-mode')
const $ligthModeIcon = document.querySelector('#ligth-mode')
const $header = document.querySelector('header')

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
    $newTask.value = "";
  }
  handleTaskCounter();
  e.preventDefault();
};

$tasks.onclick = function (e) {
  const path = e.path[2];
  console.log(path);
  const $selectedTask = path.lastChild;
  if (e.target.classList.contains("checkmark")) {
    if ($selectedTask.classList.contains("completed")) {
      path.classList.remove("task-completed");
      $selectedTask.classList.remove("completed");
    } else {
      $selectedTask.classList.add("completed");
      path.classList.add("task-completed");
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
  let completed = document.querySelectorAll(".task-completed");
  completed.forEach((task) => {
    task.remove();
  });
};

const $completedTasksBtn = document.querySelector("#completed-tasks-btn");
$completedTasksBtn.onclick = function () {
  const $task = document.querySelectorAll(".task");
  console.log("clicked");
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
  console.log("click");
  $task.forEach((task) => {
    if (!task.classList.contains("task-completed")) {
      task.style.display = "block";
    }
    if (task.classList.contains("task-completed")) {
      task.style.display = "none";
    }
  });
};






$switchBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  $header.classList.toggle('dark')
  $darkModeIcon.classList.toggle('hide')
  $ligthModeIcon.classList.toggle('hide')
})
