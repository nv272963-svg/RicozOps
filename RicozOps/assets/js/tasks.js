/* ==========================================
        RicozOps Task Module v2.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
            WEEKLY TASK CHART
    ========================================== */

    const taskChart = document.getElementById("taskChart");

    if (taskChart) {

        new Chart(taskChart, {

            type: "bar",

            data: {

                labels: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ],

                datasets: [{

                    label: "Tasks Completed",

                    data: [15, 22, 18, 26, 31, 24],

                    backgroundColor: "#2563EB",

                    borderRadius: 8

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        });

    }

    /* ==========================================
            TASK DISTRIBUTION PIE CHART
    ========================================== */

    const taskPieChart = document.getElementById("taskPieChart");

    if (taskPieChart) {

        new Chart(taskPieChart, {

            type: "doughnut",

            data: {

                labels: [

                    "Completed",

                    "In Progress",

                    "Pending"

                ],

                datasets: [{

                    data: [

                        55,

                        30,

                        15

                    ],

                    backgroundColor: [

                        "#22C55E",

                        "#2563EB",

                        "#F59E0B"

                    ]

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }

    /* ==========================================
            DARK MODE
    ========================================== */

    const themeBtn = document.querySelector(".theme-btn");

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

        if (themeBtn) {

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        }

    }

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {

                localStorage.setItem("theme", "dark");

                themeBtn.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';

            } else {

                localStorage.setItem("theme", "light");

                themeBtn.innerHTML =
                    '<i class="fa-solid fa-moon"></i>';

            }

        });

    }

    /* ==========================================
            STATISTICS COUNTER
    ========================================== */

    const counters = document.querySelectorAll(".stat-info h2");

    counters.forEach(counter => {

        const target =
            parseInt(counter.innerText.replace(/\D/g, "")) || 0;

        let count = 0;

        const speed = Math.max(1, Math.ceil(target / 80));

        function updateCounter() {

            if (count < target) {

                count += speed;

                if (count > target) {

                    count = target;

                }

                counter.innerText = count;

                requestAnimationFrame(updateCounter);

            }

        }

        updateCounter();

    });

});
/* ==========================================
        LIVE TASK SEARCH
========================================== */

const taskSearch = document.querySelector("#taskSearch");

if (taskSearch) {

    taskSearch.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".task-card").forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(value) ? "" : "none";

        });

    });

}

/* ==========================================
        PRIORITY FILTER
========================================== */

const priorityFilter = document.querySelector("#priorityFilter");

if (priorityFilter) {

    priorityFilter.addEventListener("change", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".task-card").forEach(card => {

            const priority = card.querySelector(".priority");

            if (!priority) return;

            if (value === "all") {

                card.style.display = "";

            } else {

                card.style.display =
                    priority.innerText.toLowerCase().includes(value)
                        ? ""
                        : "none";

            }

        });

    });

}

/* ==========================================
        STATUS FILTER
========================================== */

const statusFilter = document.querySelector("#statusFilter");

if (statusFilter) {

    statusFilter.addEventListener("change", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".kanban-column").forEach(column => {

            const heading =
                column.querySelector(".column-header h2")
                .innerText
                .toLowerCase();

            if (value === "all") {

                column.style.display = "";

            }

            else if (value === "todo" &&
                     heading.includes("to do")) {

                column.style.display = "";

            }

            else if (value === "progress" &&
                     heading.includes("progress")) {

                column.style.display = "";

            }

            else if (value === "completed" &&
                     heading.includes("completed")) {

                column.style.display = "";

            }

            else {

                column.style.display = "none";

            }

        });

    });

}

/* ==========================================
        EMPLOYEE FILTER
========================================== */

const employeeFilter = document.querySelector("#employeeFilter");

if (employeeFilter) {

    employeeFilter.addEventListener("change", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".task-card").forEach(card => {

            const employee =
                card.querySelector(".task-footer small");

            if (!employee) return;

            if (value === "all") {

                card.style.display = "";

            } else {

                card.style.display =
                    employee.innerText.toLowerCase().includes(value)
                        ? ""
                        : "none";

            }

        });

    });

}

/* ==========================================
        VIEW TASK
========================================== */

document.querySelectorAll(".view-task").forEach(btn => {

    btn.addEventListener("click", () => {

        showToast("Opening Task Details...", "success");

    });

});

/* ==========================================
        EDIT TASK
========================================== */

document.querySelectorAll(".edit-task").forEach(btn => {

    btn.addEventListener("click", () => {

        showToast("Edit Mode Enabled", "info");

    });

});

/* ==========================================
        DELETE TASK
========================================== */

document.querySelectorAll(".delete-task").forEach(btn => {

    btn.addEventListener("click", () => {

        if (confirm("Delete this task?")) {

            btn.closest(".task-card").remove();

            showToast("Task Deleted Successfully", "error");

        }

    });

});

/* ==========================================
        TOAST NOTIFICATION
========================================== */

function showToast(message, type) {

    const toast = document.createElement("div");

    toast.className = "toast " + type;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}
/* ==========================================
        EXPORT CSV
========================================== */

const exportCSV = document.querySelector(".excel-btn");

if (exportCSV) {

    exportCSV.addEventListener("click", () => {

        showToast("CSV Export Started", "success");

        console.log("Export CSV");

    });

}

/* ==========================================
        EXPORT PDF
========================================== */

const exportPDF = document.querySelector(".pdf-btn");

if (exportPDF) {

    exportPDF.addEventListener("click", () => {

        showToast("PDF Export Started", "info");

        console.log("Export PDF");

    });

}

/* ==========================================
        PROGRESS BAR ANIMATION
========================================== */

document.querySelectorAll(".progress-fill").forEach(bar => {

    const width = bar.dataset.width || "0";

    bar.style.width = "0%";

    setTimeout(() => {

        bar.style.width = width + "%";

    }, 400);

});

/* ==========================================
        SAVE FILTERS
========================================== */

const filters = [

    "#statusFilter",

    "#priorityFilter",

    "#employeeFilter"

];

filters.forEach(id => {

    const element = document.querySelector(id);

    if (!element) return;

    const saved = localStorage.getItem(id);

    if (saved) {

        element.value = saved;

    }

    element.addEventListener("change", () => {

        localStorage.setItem(id, element.value);

    });

});

/* ==========================================
        RIPPLE EFFECT
========================================== */

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";

        ripple.style.top = (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/* ==========================================
        WELCOME TOAST
========================================== */

setTimeout(() => {

    showToast("Welcome to RicozOps Tasks Module 🚀", "success");

}, 700);

/* ==========================================
        LOADING COMPLETE
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    console.log("Task Module Loaded Successfully");

});
console.log(document.getElementById("addTaskBtn"));
const addTaskBtn = document.getElementById("addTaskBtn");

if (addTaskBtn) {

    addTaskBtn.addEventListener("click", () => {

        console.log("Create Task Clicked");

        document.getElementById("taskModal").classList.add("active");

    });

}
const newTaskBtn = document.querySelector(".new-task-btn");

if (newTaskBtn) {

    newTaskBtn.addEventListener("click", () => {
console.log("New Task Clicked");
        document.getElementById("taskModal").classList.add("active");

    });

}
// ================= SAVE TASK =================

window.addEventListener("DOMContentLoaded", () => {

    console.log("DOM Loaded");

    const taskForm = document.getElementById("taskForm");

    console.log(taskForm);

    taskForm.addEventListener("submit", async (e) => {
alert("Form Submitted");

        e.preventDefault();

        console.log("Task Form Submitted");
        const token = localStorage.getItem("token");

const task = {

    task_title: document.getElementById("task_title").value,
    description: document.getElementById("description").value,

    employee_id: document.getElementById("employee_id").value,

project_id: document.getElementById("project_id").value,

    priority: document.getElementById("priority").value,
    status: document.getElementById("status").value,

    start_date: new Date().toISOString().split("T")[0],
    due_date: document.getElementById("due_date").value

};
console.log(task);
const id = document.getElementById("task_db_id").value;

const isEdit = id !== "";

try {

    const response = await fetch(

        isEdit
            ? `https://ricozops-1.onrender.com/api/tasks/update/${id}`
            : "https://ricozops-1.onrender.com/api/tasks/add",

        {

            method: isEdit ? "PUT" : "POST",

            headers: {

                "Content-Type": "application/json",
                "Authorization": "Bearer " + token

            },

            body: JSON.stringify(task)

        }

    );

    const data = await response.json();

    console.log(data);

    if (data.success) {

        alert(isEdit ? "Task Updated Successfully" : "Task Added Successfully");

        document.getElementById("taskModal").classList.remove("active");

        taskForm.reset();

        document.getElementById("task_db_id").value = "";

        document.getElementById("modalTitle").innerText = "Add Task";

        document.getElementById("saveTaskBtn").innerText = "Save Task";

        loadTasks();

    }

} catch (err) {

    console.log(err);

    alert("Error Saving Task");

}


    });

});
// ================= LOAD TASKS =================

async function loadTasks() {

    try {

        const response = await fetch("https://ricozops-1.onrender.com/api/tasks");

        const data = await response.json();

        const tbody = document.getElementById("taskTableBody");

        if (!tbody) {
            console.log("taskTableBody not found");
            return;
        }

        tbody.innerHTML = "";

        if(!data.success) return;

data.tasks.forEach(task=>{

            let html = "";

data.tasks.forEach(task => {

    html += `
<tr>
    <td>${task.task_title}</td>
    <td>${task.employee_name || "-"}</td>
    <td>${task.project_name || "-"}</td>
    <td>${task.priority}</td>
    <td>${task.status}</td>
    <td>${new Date(task.due_date).toLocaleDateString("en-GB")}</td>
    <td>


                <button class="action-btn view"
                    onclick="viewTask(${task.id})">👁</button>

                <button class="action-btn edit"
                    onclick="editTask(${task.id})">✏️</button>

                <button class="action-btn delete"
                    onclick="deleteTask(${task.id})">🗑</button>

            </td>

        </tr>
    `;

});

tbody.innerHTML = html; `
                <tr>
                    <td>${task.task_title}</td>
                    <td>${task.priority}</td>
                    <td>${task.status}</td>
                    <td>${new Date(task.due_date).toLocaleDateString("en-GB")}</td>
                    <td>
                        <button class="action-btn view"
onclick="viewTask(${task.id})">
👁
</button>
                        <button class="action-btn edit"
    onclick="console.log('Edit Clicked', ${task.id}); editTask(${task.id})">
    ✏️
</button>
                       <button class="action-btn delete"
        onclick="deleteTask(${task.id})">
    🗑
</button>
                    </td>
                </tr>
            `;

        });

    } catch (err) {

        console.log(err);

    }

}

window.addEventListener("DOMContentLoaded", () => {

    loadTasks();
    fetchEmployees();
    fetchProjects();
    loadProjectFilter();

});
window.addEventListener("DOMContentLoaded", fetchProjects);
// ================= EDIT TASK =================

async function editTask(id) {

    try {

        const response = await fetch("https://ricozops-1.onrender.com/api/tasks");

        const data = await response.json();

        const task = data.tasks.find(t => t.id == id);

        if (!task) return;

        document.getElementById("task_db_id").value = task.id;
        document.getElementById("task_title").value = task.task_title;
        document.getElementById("description").value = task.description || "";
        document.getElementById("employee_id").value = task.employee_id || "";
document.getElementById("project_id").value = task.project_id || "";
        document.getElementById("priority").value = task.priority;
        document.getElementById("status").value = task.status;
        document.getElementById("due_date").value = task.due_date.substring(0,10);

        document.getElementById("modalTitle").innerText = "Update Task";
        document.getElementById("saveTaskBtn").innerText = "Update Task";

        document.getElementById("taskModal").classList.add("active");

    } catch(err) {

        console.log(err);

    }

}
// ================= DELETE TASK =================

async function deleteTask(id) {

    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to delete this task?")) return;

    try {

        const response = await fetch(

            `https://ricozops-1.onrender.com/api/tasks/delete/${id}`,

            {

                method: "DELETE",

                headers: {

                    "Authorization": "Bearer " + token

                }

            }

        );

        const data = await response.json();

        console.log(data);

        if (data.success) {

            alert("Task Deleted Successfully");

            loadTasks();

        }

    } catch (err) {

        console.log(err);

        alert("Delete Failed");

    }

}
async function viewTask(id){

    const response=await fetch("https://ricozops-1.onrender.com/api/tasks");

    const data=await response.json();

    const task=data.tasks.find(t=>t.id==id);

    if(!task) return;

    alert(

`Task : ${task.task_title}

Priority : ${task.priority}

Status : ${task.status}

Due Date : ${task.due_date.substring(0,10)}

Description : ${task.description || "N/A"}`

    );

}
window.onclick=function(e){

if(e.target===document.getElementById("taskModal")){

document.getElementById("taskModal").classList.remove("active");

}

}
async function fetchEmployees() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "https://ricozops-1.onrender.com/api/employees",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const data = await response.json();
console.log(data);
        const employee = document.getElementById("employee_id");
console.log(employee);
        employee.innerHTML =
            '<option value="">Select Employee</option>';

        data.employees.forEach(emp => {

            employee.innerHTML += `
                <option value="${emp.id}">
                    ${emp.full_name}
                </option>
            `;

        });

    } catch (err) {

        console.log("Employee Load Error:", err);

    }

}
async function fetchProjects() {

    try {

        const response = await fetch("https://ricozops-1.onrender.com/api/projects");

        const data = await response.json();

        const project = document.getElementById("project_id");

        project.innerHTML =
            '<option value="">Select Project</option>';

        data.projects.forEach(proj => {

            project.innerHTML += `
                <option value="${proj.id}">
                    ${proj.project_name}
                </option>
            `;

        });

    } catch (err) {

        console.log("Project Load Error:", err);

    }

}
async function loadProjectFilter() {

    try {

        const response = await fetch("https://ricozops-1.onrender.com/api/projects");

        const data = await response.json();

        const projectFilter = document.getElementById("projectFilter");

        projectFilter.innerHTML =
            '<option value="">All Projects</option>';

        data.projects.forEach(project => {

            projectFilter.innerHTML += `
                <option value="${project.id}">
                    ${project.project_name}
                </option>
            `;

        });

    } catch (err) {

        console.log("Project Filter Error:", err);

    }

}