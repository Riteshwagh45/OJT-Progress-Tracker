const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

displayTasks();

taskForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;
    const notes = document.getElementById("notes").value;

    const technologies = [];

    document.querySelectorAll(".tech:checked")
        .forEach((checkbox) => {
            technologies.push(checkbox.value);
        });

    const task = {
        title,
        date,
        category: technologies,
        status,
        notes
    };

    if (editIndex === -1) {
        tasks.push(task);
    } else {
        tasks[editIndex] = task;
        editIndex = -1;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    taskForm.reset();

    document.querySelectorAll(".tech").forEach((checkbox) => {
        checkbox.checked = false;
    });
});

function displayTasks() {

    taskList.innerHTML = "";

    const searchValue =
        document.getElementById("searchTask")
            ? document.getElementById("searchTask").value.toLowerCase()
            : "";

    tasks.forEach((task, index) => {

        const technologies =
            task.category.join(", ").toLowerCase();

        if (
            !task.title.toLowerCase().includes(searchValue) &&
            !technologies.includes(searchValue)
        ) {
            return;
        }

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

            <p><strong>Technologies:</strong> ${task.category.join(", ")}</p>

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

            <div class="action-buttons">

                <button class="edit-btn"
                onclick="editTask(${index})">
                Edit
                </button>

                <button class="delete-btn"
                onclick="deleteTask(${index})">
                Delete
                </button>

            </div>

        </div>
        `;
    });

    updateSummary();
}

function updateStatus(index, newStatus) {

    tasks[index].status = newStatus;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
    }
}

function editTask(index) {

    const task = tasks[index];

    document.getElementById("title").value = task.title;
    document.getElementById("date").value = task.date;
    document.getElementById("status").value = task.status;
    document.getElementById("notes").value = task.notes;

    document.querySelectorAll(".tech").forEach((checkbox) => {
        checkbox.checked =
            task.category.includes(checkbox.value);
    });

    editIndex = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function updateSummary() {

    document.getElementById("totalTasks").innerText =
        tasks.length;

    const completedTasks =
        tasks.filter(task =>
            task.status === "Complete"
        ).length;

    const pendingTasks =
        tasks.filter(task =>
            task.status !== "Complete"
        ).length;

    document.getElementById("completedTasks").innerText =
        completedTasks;

    document.getElementById("pendingTasks").innerText =
        pendingTasks;

    const percentage =
        tasks.length === 0
            ? 0
            : Math.round(
                (completedTasks / tasks.length) * 100
            );

    const progressFill =
        document.getElementById("progressFill");

    progressFill.style.width =
        percentage + "%";

    progressFill.innerText =
        percentage + "%";
}