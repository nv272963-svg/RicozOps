const API_URL = "http://localhost:5000/api";
/* ==========================================
   RicozOps Dashboard v3.0
========================================== */
// ===============================
// LOGIN CHECK
// ===============================

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
    window.location.href = "login.html";
}

document.getElementById("userName").textContent = user.full_name;
document.getElementById("welcomeUser").textContent = `${user.full_name} 👋`;


// ============================
// GLOBAL VARIABLES
// ============================

window.analyticsData = null;
window.dashboardData = null;

// ============================
// LOAD DASHBOARD STATS
// ============================

async function loadDashboard() {

    try {

       const response = await fetch(
`${API_URL}/dashboard/stats`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const result = await response.json();

        if (!result.success) return;

        window.dashboardData = result.dashboard;

        document.getElementById("totalEmployees").innerHTML =
            result.dashboard.totalEmployees;

        document.getElementById("totalProjects").innerHTML =
            result.dashboard.totalProjects;

        document.getElementById("totalTasks").innerHTML =
            result.dashboard.totalTasks;

        document.getElementById("totalRevenue").innerHTML =
            "₹" +
            Number(result.dashboard.totalRevenue).toLocaleString("en-IN");

    } catch (err) {

        console.log(err);

    }

}

// ============================
// LOAD ANALYTICS
// ============================

async function loadAnalytics() {

    try {

        const response = await fetch(
`${API_URL}/dashboard/analytics`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const result = await response.json();

        if (!result.success) return;

        window.analyticsData = result.analytics;

        createRevenueChart();

        createProjectChart();
        createEmployeeChart();
        createTaskChart();
        } catch (err) {

        console.log(err);

    }

}

// ============================
// INITIALIZE DASHBOARD
// ============================

window.addEventListener("DOMContentLoaded", async () => {

    await loadDashboard();

    await loadAnalytics();

    await loadRecentActivities();

});
// ============================
// Revenue Chart
// ============================

function createRevenueChart() {

    const revenueCanvas = document.getElementById("revenueChart");

    if (!revenueCanvas || !window.analyticsData) return;

    const oldChart = Chart.getChart(revenueCanvas);

    if (oldChart) oldChart.destroy();

    const revenueLabels = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const revenueData = new Array(12).fill(0);

    window.analyticsData.revenue.forEach(item => {

        revenueData[item.month - 1] = Number(item.revenue);

    });

    new Chart(revenueCanvas, {

        type: "line",

        data: {

            labels: revenueLabels,

            datasets: [{

                label: "Revenue",

                data: revenueData,

                borderColor: "#2563eb",

                backgroundColor: "rgba(37,99,235,.15)",

                fill: true,

                tension: 0.4

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}
// ============================
// Project Status Chart
// ============================

function createProjectChart() {
console.log("Project Chart Function Called");
console.log(window.analyticsData.projectStatus);

    const projectCanvas = document.getElementById("projectChart");

    if (!projectCanvas || !window.analyticsData) return;

    const oldChart = Chart.getChart(projectCanvas);

    if (oldChart) oldChart.destroy();

    let completed = 0;
    let running = 0;
    let pending = 0;

    window.analyticsData.projectStatus.forEach(item => {

        if (item.status === "Completed")
            completed = Number(item.total);

        if (item.status === "In Progress")
            running = Number(item.total);

        if (item.status === "Pending")
            pending = Number(item.total);

    });
console.log(completed, running, pending);
    new Chart(projectCanvas, {

        type: "doughnut",

        data: {

            labels: [
                "Completed",
                "Running",
                "Pending"
            ],

            datasets: [{

                data: [
                    completed,
                    running,
                    pending
                ],

                backgroundColor: [
                    "#22c55e",
                    "#2563eb",
                    "#f59e0b"
                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
// ============================
// Employee Growth Chart
// ============================

function createEmployeeChart() {

    const employeeCanvas = document.getElementById("employeeChart");

    if (!employeeCanvas) return;

    const oldChart = Chart.getChart(employeeCanvas);

    if (oldChart) oldChart.destroy();

    new Chart(employeeCanvas, {

        type: "bar",

        data: {

            labels: [
                "HR",
                "Dev",
                "QA",
                "Support",
                "Sales"
            ],

            datasets: [{

                label: "Employees",

                data: [12, 42, 15, 18, 20],

                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6"
                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}
// ============================
// Task Completion Chart
// ============================

function createTaskChart() {

    const taskCanvas = document.getElementById("taskChart");

    if (!taskCanvas) return;

    const oldChart = Chart.getChart(taskCanvas);

    if (oldChart) oldChart.destroy();

    new Chart(taskCanvas, {

        type: "pie",

        data: {

            labels: [
                "Completed",
                "In Progress",
                "Pending"
            ],

            datasets: [{

                data: [72, 18, 10],

                backgroundColor: [
                    "#22c55e",
                    "#2563eb",
                    "#f59e0b"
                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}
// ============================
// Employee Growth Chart (Live)
// ============================

function createEmployeeChart() {

    const employeeCanvas = document.getElementById("employeeChart");

    if (!employeeCanvas || !window.analyticsData) return;

    const oldChart = Chart.getChart(employeeCanvas);

    if (oldChart) oldChart.destroy();

    const labels = [];
    const data = [];

    window.analyticsData.departments.forEach(item => {

        labels.push(item.department);

        data.push(Number(item.total));

    });

    new Chart(employeeCanvas, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                label: "Employees",

                data: data,

                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#06b6d4",
                    "#a855f7",
                    "#84cc16"
                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}
// ============================
// Task Completion Chart (Live)
// ============================

function createTaskChart() {

    const taskCanvas = document.getElementById("taskChart");

    if (!taskCanvas || !window.analyticsData) return;

    const oldChart = Chart.getChart(taskCanvas);

    if (oldChart) oldChart.destroy();

    let completed = 0;
    let inProgress = 0;
    let pending = 0;

    window.analyticsData.taskStatus.forEach(item => {

        if (item.status === "Completed") {
            completed = Number(item.total);
        }

        if (item.status === "In Progress") {
            inProgress = Number(item.total);
        }

        if (item.status === "Pending") {
            pending = Number(item.total);
        }

    });

    new Chart(taskCanvas, {

        type: "pie",

        data: {

            labels: [
                "Completed",
                "In Progress",
                "Pending"
            ],

            datasets: [{

                data: [
                    completed,
                    inProgress,
                    pending
                ],

                backgroundColor: [
                    "#22c55e",
                    "#2563eb",
                    "#f59e0b"
                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}
// ============================
// Load Recent Activities
// ============================

async function loadRecentActivities() {

    try {

        const response = await fetch(
            "https://ricozops-1.onrender.com/api/dashboard/activities",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const result = await response.json();

        if (!result.success) return;

        const timeline = document.querySelector(".timeline");

        if (!timeline) return;

        timeline.innerHTML = "";

        result.activities.forEach(activity => {

            timeline.innerHTML += `
                <div class="timeline-item">

                    <div class="timeline-icon ${activity.type}">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>

                    <div class="timeline-content">
                        <h4>${activity.title}</h4>
                        <p>${activity.description}</p>
                        <span>${activity.time}</span>
                    </div>

                </div>
            `;

        });

    } catch (err) {

        console.log(err);

    }

}
document.querySelector(".notification").addEventListener("click", () => {

    window.location.href = "notifications.html";

});
// Quick Actions

document.querySelectorAll(".action-card")[0].onclick = () => {
    window.location.href = "employees.html";
};

document.querySelectorAll(".action-card")[1].onclick = () => {
    window.location.href = "projects.html";
};

document.querySelectorAll(".action-card")[2].onclick = () => {
    window.location.href = "tasks.html";
};

document.querySelectorAll(".action-card")[3].onclick = () => {
    alert("Export Report Feature Coming Soon");
};

document.querySelectorAll(".action-card")[4].onclick = () => {
    window.location.href = "mailto:";
};

document.querySelectorAll(".action-card")[5].onclick = () => {
    alert("Schedule Meeting Feature Coming Soon");
};
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "login.html";
        }
    });
}
function renderCalendar() {

    const month = document.getElementById("calendarMonth");
    const body = document.getElementById("calendarBody");

    if (!month || !body) return;

    const today = new Date();

    const year = today.getFullYear();
    const monthIndex = today.getMonth();
    const date = today.getDate();

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    month.innerText = `${months[monthIndex]} ${year}`;

    const firstDay = new Date(year, monthIndex, 1).getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();

    let html = "<tr>";

    for (let i = 0; i < firstDay; i++) {
        html += "<td></td>";
    }

    for (let d = 1; d <= totalDays; d++) {

        if ((firstDay + d - 1) % 7 === 0 && d !== 1) {
            html += "</tr><tr>";
        }

        if (d === date) {
            html += `<td class="today">${d}</td>`;
        } else {
            html += `<td>${d}</td>`;
        }
    }

    html += "</tr>";

    body.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", renderCalendar);
