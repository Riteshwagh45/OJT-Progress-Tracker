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

  const task = {
    title,
    date,
    category,
    status
  };

  tasks.push(task);

  // Save to Local Storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Display Tasks
  displayTasks();

  // Reset Form
  taskForm.reset();
});


// Display Tasks Function
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

        <p><strong>Status:</strong> ${task.status}</p>

      </div>

    `;
  });

}