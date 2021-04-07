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

  e.preventDefault();
};

$tasks.onclick = function (e) {
  const path = e.path[2];
  const $selectedTask = path.lastChild;
  const p = document.querySelectorAll(".task-text");
  if (e.target.classList.contains("checkmark")) {
    if ($selectedTask.classList.contains("completed")) {
      $selectedTask.classList.remove("completed");
    } else {
      $selectedTask.classList.add("completed");
    }
  }
};
