/* ==========================================
        RicozOps Projects Module v2.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
            BAR CHART
    ========================================== */

    const projectChart = document.getElementById("projectChart");

    if (projectChart) {

        new Chart(projectChart, {

            type: "bar",

            data: {

                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"
                ],

                datasets: [{

                    label: "Completed Projects",

                    data: [8, 12, 10, 16, 20, 18],

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
            DOUGHNUT CHART
    ========================================== */

    const budgetChart = document.getElementById("budgetChart");

    if (budgetChart) {

        new Chart(budgetChart, {

            type: "doughnut",

            data: {

                labels: [

                    "Development",

                    "Marketing",

                    "Testing",

                    "HR"

                ],

                datasets: [{

                    data: [

                        45,

                        20,

                        25,

                        10

                    ],

                    backgroundColor: [

                        "#2563EB",

                        "#22C55E",

                        "#F59E0B",

                        "#EF4444"

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
            COUNTER ANIMATION
    ========================================== */

    const counters = document.querySelectorAll(".stat-info h2");

    counters.forEach(counter => {

        const target = parseInt(counter.innerText.replace(/\D/g, "")) || 0;

        let count = 0;

        const speed = Math.max(1, Math.ceil(target / 100));

        const updateCounter = () => {

            if (count < target) {

                count += speed;

                if (count > target) count = target;

                counter.innerText = count;

                requestAnimationFrame(updateCounter);

            }

        };

        updateCounter();

    });

});
/* ==========================================
        LIVE SEARCH
========================================== */

const searchInput = document.querySelector("#projectSearch");

if(searchInput){

    searchInput.addEventListener("keyup", function(){

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll(".project-table tbody tr");

        rows.forEach(row=>{

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(value) ? "" : "none";

        });

    });

}

/* ==========================================
        PROJECT STATUS FILTER
========================================== */

const statusFilter = document.querySelector("#statusFilter");

if(statusFilter){

    statusFilter.addEventListener("change",function(){

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll(".project-table tbody tr");

        rows.forEach(row=>{

            const status = row.querySelector(".status").innerText.toLowerCase();

            if(value==="all"){

                row.style.display="";

            }

            else{

                row.style.display=status.includes(value) ? "" : "none";

            }

        });

    });

}

/* ==========================================
        VIEW PROJECT
========================================== */

document.querySelectorAll(".action-btn.view").forEach(btn=>{

    btn.addEventListener("click",()=>{

        showToast("Opening Project Details...","success");

    });

});

/* ==========================================
        EDIT PROJECT
========================================== */

document.querySelectorAll(".action-btn.edit").forEach(btn=>{

    btn.addEventListener("click",()=>{

        showToast("Project Edit Mode Enabled","info");

    });

});

/* ==========================================
        DELETE PROJECT
========================================== */

document.querySelectorAll(".action-btn.delete").forEach(btn=>{

    btn.addEventListener("click",()=>{

        if(confirm("Delete this project?")){

            btn.closest("tr").remove();

            showToast("Project Deleted Successfully","error");

        }

    });

});

/* ==========================================
        TOAST NOTIFICATION
========================================== */

function showToast(message,type){

    const toast=document.createElement("div");

    toast.className="toast "+type;

    toast.innerHTML=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },3000);

}
/* ==========================================
        EXPORT EXCEL (CSV)
========================================== */

const excelBtn = document.querySelector(".excel-btn");

if (excelBtn) {

    excelBtn.addEventListener("click", () => {

        showToast("Excel Export Started...", "success");

        let csv = [];

        document.querySelectorAll(".project-table tr").forEach(row => {

            let rowData = [];

            row.querySelectorAll("th,td").forEach(col => {

                rowData.push(col.innerText.replace(/\n/g, " "));

            });

            csv.push(rowData.join(","));

        });

        const csvFile = new Blob([csv.join("\n")], {
            type: "text/csv"
        });

        const downloadLink = document.createElement("a");

        downloadLink.download = "Projects_Report.csv";

        downloadLink.href = window.URL.createObjectURL(csvFile);

        downloadLink.click();

    });

}

/* ==========================================
        EXPORT PDF
========================================== */

const pdfBtn = document.querySelector(".pdf-btn");

if (pdfBtn) {

    pdfBtn.addEventListener("click", () => {

        showToast("PDF Export Feature Coming Soon", "info");

        window.print();

    });

}

/* ==========================================
        ANIMATE PROGRESS BAR
========================================== */

document.querySelectorAll(".progress-fill").forEach(bar => {

    const width = bar.style.width;

    bar.style.width = "0%";

    setTimeout(() => {

        bar.style.width = width;

        bar.style.transition = "1.5s";

    }, 300);

});

/* ==========================================
        WELCOME MESSAGE
========================================== */

setTimeout(() => {

    showToast("Welcome to RicozOps Projects 🚀", "success");

}, 800);

/* ==========================================
        LOADING EFFECT
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* ==========================================
        SAVE FILTERS
========================================== */

if (searchInput) {

    searchInput.value = localStorage.getItem("projectSearch") || "";

    searchInput.addEventListener("keyup", () => {

        localStorage.setItem(
            "projectSearch",
            searchInput.value
        );

    });

}

if (statusFilter) {

    statusFilter.value =
        localStorage.getItem("projectStatus") || "all";

    statusFilter.addEventListener("change", () => {

        localStorage.setItem(
            "projectStatus",
            statusFilter.value
        );

    });

}
async function fetchEmployees() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch("https://ricozops-1.onrender.com/api/employees", {

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const data = await response.json();

        const manager = document.getElementById("project_manager");

        manager.innerHTML =
            '<option value="">Select Project Manager</option>';

        data.employees.forEach(emp => {

            manager.innerHTML += `
                <option value="${emp.full_name}">
                    ${emp.full_name}
                </option>
            `;

        });

    } catch (err) {

        console.log("Employee Load Error:", err);

    }

}
/* ==========================================
        BUTTON RIPPLE EFFECT
========================================== */

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", function (e) {

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

console.log("🚀 RicozOps Projects Module Loaded Successfully");
async function loadProjects() {

    try {

        const response = await fetch("https://ricozops-1.onrender.com/api/projects");

        const data = await response.json();

        const tbody = document.getElementById("projectTableBody");

        tbody.innerHTML = "";
        document.getElementById("projectCount").innerText =
    `Showing ${data.projects.length} Project${data.projects.length > 1 ? "s" : ""}`;
// ===== Project Statistics =====

const totalProjects = data.projects.length;

const completedProjects =
    data.projects.filter(p => p.status === "Completed").length;

const runningProjects =
    data.projects.filter(p => p.status === "In Progress").length;

const delayedProjects =
    data.projects.filter(p => p.status === "Delayed").length;

const totalBudget =
    data.projects.reduce((sum, p) => sum + Number(p.budget || 0), 0);

document.getElementById("totalProjects").innerText =
    totalProjects;

document.getElementById("completedProjects").innerText =
    completedProjects;

document.getElementById("runningProjects").innerText =
    runningProjects;

document.getElementById("delayedProjects").innerText =
    delayedProjects;

document.getElementById("totalBudget").innerText =
    "₹" + totalBudget.toLocaleString("en-IN");
        data.projects.forEach(project => {

            tbody.innerHTML += `
                <tr>

                    <td>
                        <div class="project-info">
                            <img src="../assets/images/project1.jpg"
     alt="${project.project_name}"
     onerror="this.src='../assets/images/project1.jpg'">
                            <div>
                                <strong>${project.project_name}</strong>
                                <small>${project.project_code}</small>
                            </div>
                        </div>
                    </td>

                    <td>${project.client_name}</td>

                    <td>${project.employee_name || project.project_manager}</td>

                    <td>
                        <div class="progress-box">

                            <div class="progress-bar">

                                <div class="progress-fill"
                                style="width:${project.progress}%"></div>

                            </div>

                            <small>${project.progress}%</small>

                        </div>
                    </td>

                    <td>₹${Number(project.budget).toLocaleString("en-IN")}</td>

                    <td>${new Date(project.end_date).toLocaleDateString("en-GB")}</td>

                    <td>

                       <span class="status ${project.status.toLowerCase().replace(" ","-")}">
    ${project.status}
</span>
<td>
    <span class="priority ${project.priority.toLowerCase()}">
        ${project.priority}
    </span>
</td>
                    </td>

                    <td>

    <button class="action-btn view" onclick="viewProject(${project.id})">
        👁
    </button>

    <button class="action-btn edit" onclick="editProject(${project.id})">
        ✏️
    </button>

    <button class="action-btn delete" onclick="deleteProject(${project.id})">
        🗑
    </button>

</td>

                    </td>

                </tr>
            `;

        });

    } catch (err) {

        console.log(err);

    }

}


window.addEventListener("DOMContentLoaded", () => {

    loadProjects();

    fetchEmployees();

    fetchDepartments();





    const newProjectBtn = document.querySelector(".new-project-btn");

    if (newProjectBtn) {

        newProjectBtn.addEventListener("click", () => {

            console.log("New Project Clicked");

            document.getElementById("projectModal").classList.add("active");

        });

    }

});
const addBtn = document.querySelector(".add-btn");

if (addBtn) {
    addBtn.addEventListener("click", () => {
        console.log("Header New Project Clicked");
        document.getElementById("projectModal").classList.add("active");
    });
}
document.getElementById("closeProjectModal").addEventListener("click", () => {

    document.getElementById("projectModal").classList.remove("active");

});
async function fetchDepartments() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch("https://ricozops-1.onrender.com/api/departments", {

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const data = await response.json();

        const department = document.getElementById("department_id");
console.log(department);
        department.innerHTML =
            '<option value="">Select Department</option>';

        data.departments.forEach(dep => {

            department.innerHTML += `
                <option value="${dep.id}">
                    ${dep.department_name}
                </option>
            `;

        });

    } catch (err) {

        console.log("Department Load Error:", err);

    }

}
// ================= EDIT PROJECT =================

async function editProject(id) {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch("https://ricozops-1.onrender.com/api/projects");

        const data = await response.json();

        const project = data.projects.find(p => p.id == id);

        if (!project) return;

        document.getElementById("project_db_id").value = project.id;
        document.getElementById("project_name").value = project.project_name;
        document.getElementById("project_code").value = project.project_code;
        document.getElementById("client_name").value = project.client_name;
        document.getElementById("project_manager").value = project.project_manager;
        document.getElementById("start_date").value = project.start_date.substring(0,10);
        document.getElementById("end_date").value = project.end_date.substring(0,10);
        document.getElementById("budget").value = project.budget;
        document.getElementById("progress").value = project.progress;
document.getElementById("priority").value = project.priority;
        document.getElementById("status").value = project.status;
        document.getElementById("description").value = project.description || "";

        document.getElementById("modalTitle").innerText = "Update Project";
        document.getElementById("saveProjectBtn").innerText = "Update Project";

        document.getElementById("projectModal").classList.add("active");

    } catch(err) {

        console.log(err);

    }

}
const projectForm = document.getElementById("projectForm");



projectForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");
    const id = document.getElementById("project_db_id").value;

    const isEdit = id !== "";

    const project = {

        project_name: document.getElementById("project_name").value,
        project_code: document.getElementById("project_code").value,
        client_name: document.getElementById("client_name").value,
        department_id: document.getElementById("department_id").value,
        project_manager: document.getElementById("project_manager").value,
        start_date: document.getElementById("start_date").value,
        end_date: document.getElementById("end_date").value,
        budget: document.getElementById("budget").value,
progress: document.getElementById("progress").value,
priority: document.getElementById("priority").value,
status: document.getElementById("status").value,
description: document.getElementById("description").value

    };

    console.log(project);
try {

    const response = await fetch(

        isEdit
            ? `https://ricozops-1.onrender.com/api/projects/update/${id}`
            : "https://ricozops-1.onrender.com/api/projects/add",

        {

            method: isEdit ? "PUT" : "POST",

            headers: {

                "Content-Type": "application/json",
                "Authorization": "Bearer " + token

            },

            body: JSON.stringify(project)

        }

    );

    const data = await response.json();

    console.log(data);
alert(JSON.stringify(data));

    if (data.success) {

        document.getElementById("projectModal").classList.remove("active");

        projectForm.reset();

        document.getElementById("project_db_id").value = "";

        document.getElementById("modalTitle").innerText = "Add Project";

        document.getElementById("saveProjectBtn").innerText = "Save Project";

        loadProjects();

    }

} catch (err) {

    console.log(err);

    alert("Error Saving Project");

}
});
// ================= DELETE PROJECT =================

async function deleteProject(id) {

    if (!confirm("Are you sure you want to delete this project?")) return;

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(

            `https://ricozops-1.onrender.com/api/projects/delete/${id}`,

            {
                method: "DELETE",

                headers: {
                    "Authorization": "Bearer " + token
                }

            }

        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            loadProjects();

        }

    } catch (err) {

        console.log(err);

        alert("Error deleting project");

    }

}
// ================= VIEW PROJECT =================

async function viewProject(id) {

    try {

        const response = await fetch("https://ricozops-1.onrender.com/api/projects");

        const data = await response.json();

        const project = data.projects.find(p => p.id == id);

        if (!project) return;

        alert(
`Project Name : ${project.project_name}

Project Code : ${project.project_code}

Client : ${project.client_name}

Project Manager : ${project.project_manager}

Start Date : ${project.start_date.substring(0,10)}

End Date : ${project.end_date.substring(0,10)}

Budget : ₹${project.budget}

Status : ${project.status}

Description : ${project.description || "N/A"}`
        );

    } catch (err) {

        console.log(err);

        alert("Error loading project");

    }

}
document.querySelector(".export-btn").addEventListener("click", () => {

    window.location.href = "reports.html";

});