const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Get tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks when page loads
displayTasks();


// Add Task
taskForm.addEventListener("submit", function (e) {

  e.preventDefault();

  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const status = document.getElementById("status").value;
  const notes = document.getElementById("notes").value;

  const task = {
    title,
    date,
    category,
    status,
    notes
  };

  tasks.push(task);

  // Save to Local Storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Display Tasks
  displayTasks();

  // Reset Form
  taskForm.reset();
});


// Display Tasks
function displayTasks() {

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    let statusClass = "";

    if (task.status === "Pending") {
      statusClass = "pending";
    }
    else if (task.status === "In Progress") {
      statusClass = "progress";
    }
    else {
      statusClass = "complete";
    }

    taskList.innerHTML += `

      <div class="task-card ${statusClass}">

        <h3>${task.title}</h3>

        <p><strong>Date:</strong> ${task.date}</p>

        <p><strong>Category:</strong> ${task.category}</p>

        <p><strong>Notes:</strong> ${task.notes}</p>

        <div class="status-dropdown">

          <label><strong>Status:</strong></label>

          <select onchange="updateStatus(${index}, this.value)">

            <option value="Pending"
              ${task.status === "Pending" ? "selected" : ""}>
              Pending
            </option>

            <option value="In Progress"
              ${task.status === "In Progress" ? "selected" : ""}>
              In Progress
            </option>

            <option value="Complete"
              ${task.status === "Complete" ? "selected" : ""}>
              Complete
            </option>

          </select>

        </div>

      </div>

    `;
  });

  // Summary Dashboard

  document.getElementById("totalTasks").innerText = tasks.length;

  const completedTasks =
    tasks.filter(task => task.status === "Complete").length;

  const pendingTasks =
    tasks.filter(task => task.status !== "Complete").length;

  document.getElementById("completedTasks").innerText = completedTasks;

  document.getElementById("pendingTasks").innerText = pendingTasks;
}


// Update Status
function updateStatus(index, newStatus) {

  tasks[index].status = newStatus;

  // Save updated tasks
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Refresh UI
  displayTasks();
}