const $taskBtn = document.querySelector("#new-task-button");
const $newTask = document.querySelector("#new-task");
const $tasks = document.querySelector("#tasks-container");
const $task = document.querySelector(".task");
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
      $selectedTask.classList.remove("completed");
    } else {
      $selectedTask.classList.add("completed");
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

function showCompletedTasks() {
  const completedBtn = document.querySelector("#completed-task-btn");
}
