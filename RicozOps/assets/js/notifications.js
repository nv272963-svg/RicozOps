/* ==========================================================
   RicozOps ERP
   Notifications Module
   Version : 4.0 Final
========================================================== */

/* ==========================================================
   API CONFIG
========================================================== */

const API_URL = "https://ricozops-1.onrender.com/api";

/* ==========================================================
   GLOBAL VARIABLES
========================================================== */

let notifications = [];
let filteredNotifications = [];

let currentFilter = "all";
let currentPriority = "all";
let searchText = "";

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.clear();

    console.log("====================================");
    console.log(" RicozOps Notifications Module ");
    console.log("====================================");

    initializeApplication();

});

/* ==========================================================
   INITIALIZE APPLICATION
========================================================== */

function initializeApplication() {

    console.log("Initializing...");

    initializeFilters();

    initializeSearch();

    initializeTheme();

    initializeButtons();

    loadNotifications();

}

/* ==========================================================
   LOAD NOTIFICATIONS
========================================================== */

async function loadNotifications() {

    showLoader();

    try {

        const response = await fetch(`${API_URL}/notifications`);

        const result = await response.json();

        console.log("API Response :", result);

        if (!result.success) {

            showEmptyState();

            return;

        }

        notifications = result.notifications;

        filteredNotifications = [...notifications];

        updateStatistics();

        renderNotifications();

        renderChart();

    }

    catch (error) {

        console.error("Load Error :", error);

        showEmptyState();

    }

}

/* ==========================================================
   UPDATE STATISTICS
========================================================== */

function updateStatistics() {

    const total = notifications.length;

    const unread = notifications.filter(n => n.is_read == 0).length;

    const read = notifications.filter(n => n.is_read == 1).length;

    const important = notifications.filter(n => n.priority === "high").length;

    document.getElementById("notificationCount").textContent = unread;

    const cards = document.querySelectorAll(".stat-card h2");

    if (cards.length >= 4) {

        cards[0].textContent = total;
        cards[1].textContent = read;
        cards[2].textContent = unread;
        cards[3].textContent = important;

    }

}

/* ==========================================================
   SHOW LOADER
========================================================== */

function showLoader() {

    const container = document.getElementById("notificationList");

    if (!container) return;

    container.innerHTML = `

        <div class="notification-card">

            <div class="notification-content">

                <h3>
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Loading Notifications...
                </h3>

            </div>

        </div>

    `;

}

/* ==========================================================
   EMPTY STATE
========================================================== */

function showEmptyState() {

    const container = document.getElementById("notificationList");

    if (!container) return;

    container.innerHTML = `

        <div class="notification-card empty-state">

            <div class="notification-content">

                <h3>No Notifications Found</h3>

                <p>No notification available.</p>

            </div>

        </div>

    `;

}
/* ==========================================================
   RENDER NOTIFICATIONS
========================================================== */

function renderNotifications() {

    const container = document.getElementById("notificationList");

    if (!container) return;

    container.innerHTML = "";

    if (filteredNotifications.length === 0) {

        showEmptyState();
        return;

    }

    filteredNotifications.forEach(notification => {

        const iconClass =
            notification.type === "success" ? "success" :
            notification.type === "warning" ? "warning" :
            notification.type === "danger" ? "danger" :
            "info";

        const card = `

        <div class="notification-card ${notification.is_read ? "read" : "unread"} ${notification.priority}">

            <div class="notification-icon ${iconClass}">
                <i class="fa-solid fa-bell"></i>
            </div>

            <div class="notification-content">

                <h3>${notification.title}</h3>

                <p>${notification.message}</p>

                <small>${notification.employee_name}</small>

                <br>

                <small class="time">
                    ${new Date(notification.created_at).toLocaleString()}
                </small>

            </div>

            <div class="notification-actions">

                ${
                    notification.is_read
                    ?
                    `<span class="read-badge">
                        <i class="fa-solid fa-circle-check"></i>
                        Read
                    </span>`
                    :
                    `<button class="read-btn"
                        data-id="${notification.id}">
                        <i class="fa-solid fa-check"></i>
                    </button>`
                }

                <button class="delete-btn"
                    data-id="${notification.id}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

        container.insertAdjacentHTML("beforeend", card);

    });

    attachNotificationEvents();

}
/* ==========================================================
   INITIALIZE BUTTONS
========================================================== */

function initializeButtons() {

    /* Mark All Read */
    document.querySelector(".mark-all-btn")?.addEventListener("click", markAllRead);

    /* Clear All */
    document.querySelector(".clear-btn")?.addEventListener("click", clearAllNotifications);

    /* Quick Buttons */
    const quickBtns = document.querySelectorAll(".quick-btn");

    if (quickBtns.length >= 4) {

        quickBtns[0].addEventListener("click", markAllRead);

        quickBtns[1].addEventListener("click", clearAllNotifications);

        quickBtns[2].addEventListener("click", exportNotifications);

        quickBtns[3].addEventListener("click", loadNotifications);

    }

}
/* ==========================================================
   MARK ALL READ
========================================================== */

async function markAllRead() {

    if (notifications.length === 0) {

        alert("No notifications available.");
        return;

    }

    try {

        for (const notification of notifications) {

            if (notification.is_read == 0) {

                await fetch(`${API_URL}/notifications/read/${notification.id}`, {

                    method: "PUT"

                });

            }

        }

        alert("All notifications marked as read.");

        loadNotifications();

    }

    catch (err) {

        console.error(err);

    }

}
/* ==========================================================
   CLEAR ALL
========================================================== */

async function clearAllNotifications() {

    if (!confirm("Delete all notifications?")) return;

    try {

        for (const notification of notifications) {

            await fetch(`${API_URL}/notifications/${notification.id}`, {

                method: "DELETE"

            });

        }

        alert("All notifications deleted.");

        loadNotifications();

    }

    catch (err) {

        console.error(err);

    }

}
/* ==========================================================
   EXPORT
========================================================== */

function exportNotifications() {

    if (notifications.length === 0) {

        alert("Nothing to export.");
        return;

    }

    let csv = "ID,Title,Message,Employee,Read\n";

    notifications.forEach(n => {

        csv += `${n.id},"${n.title}","${n.message}","${n.employee_name}",${n.is_read}\n`;

    });

    const blob = new Blob([csv], {

        type: "text/csv"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "notifications.csv";

    a.click();

}
/* ==========================================================
   FILTER BUTTONS
========================================================== */

function initializeFilters() {

    document.querySelectorAll(".filter-btn").forEach(button => {

        button.addEventListener("click", function () {

            document.querySelectorAll(".filter-btn")
                .forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");

            currentFilter = this.dataset.filter;

            applyFilters();

        });

    });

    document.getElementById("priorityFilter")
        .addEventListener("change", function () {

            currentPriority = this.value;

            applyFilters();

        });

}

/* ==========================================================
   SEARCH
========================================================== */

function initializeSearch() {

    const input = document.getElementById("notificationSearch");

    if (!input) return;

    input.addEventListener("keyup", function () {

        searchText = this.value.toLowerCase();

        applyFilters();

    });

}

/* ==========================================================
   APPLY FILTERS
========================================================== */

function applyFilters() {

    filteredNotifications = [...notifications];

    // Read Filter

    if (currentFilter === "read") {

        filteredNotifications =
            filteredNotifications.filter(n => n.is_read == 1);

    }

    // Unread Filter

    if (currentFilter === "unread") {

        filteredNotifications =
            filteredNotifications.filter(n => n.is_read == 0);

    }

    // Important Filter

    if (currentFilter === "important") {

        filteredNotifications =
            filteredNotifications.filter(n => n.priority === "high");

    }

    // Priority

    if (currentPriority !== "all") {

        filteredNotifications =
            filteredNotifications.filter(
                n => n.priority === currentPriority
            );

    }

    // Search

    if (searchText !== "") {

        filteredNotifications =
            filteredNotifications.filter(n =>

                n.title.toLowerCase().includes(searchText) ||

                n.message.toLowerCase().includes(searchText) ||

                n.employee_name.toLowerCase().includes(searchText)

            );

    }

    renderNotifications();

}

/* ==========================================================
   BUTTON EVENTS
========================================================== */

function attachNotificationEvents() {

    document.querySelectorAll(".read-btn").forEach(button => {

        button.onclick = () => {

            markNotificationRead(button.dataset.id);

        };

    });

    document.querySelectorAll(".delete-btn").forEach(button => {

        button.onclick = () => {

            deleteNotification(button.dataset.id);

        };

    });

}
/* ==========================================================
   MARK SINGLE NOTIFICATION READ
========================================================== */

async function markNotificationRead(id) {

    try {

        const response = await fetch(
            `${API_URL}/notifications/read/${id}`,
            {
                method: "PUT"
            }
        );

        const result = await response.json();

        if (result.success) {

            loadNotifications();

        } else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to mark notification.");

    }

}

/* ==========================================================
   DELETE SINGLE NOTIFICATION
========================================================== */

async function deleteNotification(id) {

    if (!confirm("Delete this notification?")) return;

    try {

        const response = await fetch(
            `${API_URL}/notifications/${id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (result.success) {

            loadNotifications();

        } else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete notification.");

    }

}
/* ==========================================================
   MARK NOTIFICATION AS READ
========================================================== */

async function markNotificationRead(id) {

    try {

        const response = await fetch(

            `${API_URL}/notifications/read/${id}`,

            {
                method: "PUT"
            }

        );

        const result = await response.json();

        if (result.success) {

            loadNotifications();

        }
        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================================
   DELETE NOTIFICATION
========================================================== */

async function deleteNotification(id) {

    if (!confirm("Delete this notification?")) return;

    try {

        const response = await fetch(

            `${API_URL}/notifications/${id}`,

            {
                method: "DELETE"
            }

        );

        const result = await response.json();

        if (result.success) {

            loadNotifications();

        }
        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================================
   HEADER BUTTONS
========================================================== */

function initializeButtons() {

    /* ----------------------------
       MARK ALL READ
    ---------------------------- */

    const markAllBtn = document.querySelector(".mark-all-btn");

    if (markAllBtn) {

        markAllBtn.onclick = async () => {

            try {

                await fetch(

                    `${API_URL}/notifications/read-all`,

                    {
                        method: "PUT"
                    }

                );

                loadNotifications();

            }

            catch (error) {

                console.error(error);

            }

        };

    }

    /* ----------------------------
       CLEAR ALL
    ---------------------------- */

    const clearBtn = document.querySelector(".clear-btn");

    if (clearBtn) {

        clearBtn.onclick = async () => {

            if (!confirm("Delete all notifications?")) return;

            try {

                await fetch(

                    `${API_URL}/notifications`,

                    {
                        method: "DELETE"
                    }

                );

                loadNotifications();

            }

            catch (error) {

                console.error(error);

            }

        };

    }

    /* ----------------------------
       REFRESH
    ---------------------------- */

    document.querySelectorAll(".quick-btn")[3].onclick = () => {

        loadNotifications();

    };

    /* ----------------------------
       EXPORT JSON
    ---------------------------- */

    document.querySelectorAll(".quick-btn")[2].onclick = () => {

        const data = JSON.stringify(notifications, null, 2);

        const blob = new Blob(

            [data],

            {
                type: "application/json"
            }

        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "notifications.json";

        a.click();

        URL.revokeObjectURL(url);

    };

}

/* ==========================================================
   THEME
========================================================== */

function initializeTheme() {

    const button = document.querySelector(".theme-btn");

    if (!button) return;

    button.onclick = () => {

        document.body.classList.toggle("dark");

        const icon = button.querySelector("i");

        if (document.body.classList.contains("dark")) {

            icon.className = "fa-solid fa-sun";

        }

        else {

            icon.className = "fa-solid fa-moon";

        }

    };

}
/* ==========================================================
   CHART.JS
========================================================== */

let notificationChart = null;

function renderChart() {

    const canvas = document.getElementById("notificationChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const total = notifications.length;

    const read = notifications.filter(n => n.is_read == 1).length;

    const unread = notifications.filter(n => n.is_read == 0).length;

    const important = notifications.filter(n => n.priority === "high").length;

    if (notificationChart) {

        notificationChart.destroy();

    }

    notificationChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Total",
                "Read",
                "Unread",
                "Important"

            ],

            datasets: [

                {

                    label: "Notifications",

                    data: [

                        total,
                        read,
                        unread,
                        important

                    ],

                    backgroundColor: [

                        "#2563EB",
                        "#22C55E",
                        "#F59E0B",
                        "#EF4444"

                    ],

                    borderRadius: 8

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        stepSize: 1

                    }

                }

            }

        }

    });

}

/* ==========================================================
   AUTO REFRESH (Optional)
========================================================== */

// Uncomment if required
// setInterval(loadNotifications, 30000);

/* ==========================================================
   WINDOW RESIZE
========================================================== */

window.addEventListener("resize", () => {

    if (notificationChart) {

        notificationChart.resize();

    }

});

/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

window.addEventListener("error", function (e) {

    console.error("Global Error :", e.message);

});

/* ==========================================================
   MODULE READY
========================================================== */

console.log("======================================");
console.log("RicozOps Notifications Ready");
console.log("Version : 4.0 Final");
console.log("======================================");