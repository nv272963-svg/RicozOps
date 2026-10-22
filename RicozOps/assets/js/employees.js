/* ==========================================
      RicozOps Employee Management v2.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Employees Module Loaded Successfully");

    // ==============================
    // Welcome Notification
    // ==============================

    setTimeout(() => {

        showToast("Welcome to Employee Management");

    }, 600);

});



/* ==========================================
            DARK MODE
========================================== */

const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const icon = themeBtn.querySelector("i");

        if (document.body.classList.contains("dark")) {

            icon.classList.remove("fa-moon");

            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");

            icon.classList.add("fa-moon");

        }

    });

}



/* ==========================================
        EMPLOYEE SEARCH
========================================== */

const searchInput = document.getElementById("employeeSearch");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let rows = document.querySelectorAll(".employee-table tbody tr");

        rows.forEach(row => {

            row.style.display =
                row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

        });

    });

}



/* ==========================================
        DELETE EMPLOYEE
========================================== */

document.querySelectorAll(".delete").forEach(button => {

    button.addEventListener("click", function () {

        if (confirm("Delete this employee?")) {

            this.closest("tr").remove();

            showToast("Employee Deleted");

        }

    });

});



/* ==========================================
            VIEW BUTTON
========================================== */

document.querySelectorAll(".view").forEach(button => {

    button.addEventListener("click", function () {

        const name =
            this.closest("tr").children[2].innerText;

        alert("Employee Profile\n\n" + name);

    });

});



/* ==========================================
            EDIT BUTTON
========================================== */

document.querySelectorAll(".edit").forEach(button => {

    button.addEventListener("click", function () {

        const name =
            this.closest("tr").children[2].innerText;

        alert("Edit Employee\n\n" + name);

    });

});



/* ==========================================
            TOAST
========================================== */

function showToast(message) {

    let toast = document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}
/* ==========================================
            DEPARTMENT PIE CHART
========================================== */

const departmentCanvas = document.getElementById("departmentChart");

if (departmentCanvas) {

    new Chart(departmentCanvas, {

        type: "pie",

        data: {

            labels: [

                "Development",
                "HR",
                "Marketing",
                "Finance",
                "Support"

            ],

            datasets: [{

                data: [45, 15, 18, 12, 10],

                backgroundColor: [

                    "#2563EB",
                    "#22C55E",
                    "#F59E0B",
                    "#EF4444",
                    "#7C3AED"

                ],

                borderWidth: 2

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
            MONTHLY HIRING CHART
========================================== */

const hiringCanvas = document.getElementById("hiringChart");

if (hiringCanvas) {

    new Chart(hiringCanvas, {

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

                label: "Employees Hired",

                data: [

                    5,
                    8,
                    6,
                    12,
                    10,
                    14

                ],

                backgroundColor: "#2563EB",

                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

/* ==========================================
            STAT COUNTER ANIMATION
========================================== */

function animateCounter(element, target) {

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 80));

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(timer);

        }

        element.textContent = current;

    }, 20);

}

document.querySelectorAll(".stat-info h2").forEach((item) => {

    const number = parseInt(item.textContent);

    if (!isNaN(number)) {

        item.textContent = "0";

        animateCounter(item, number);

    }

});

/* ==========================================
        NOTIFICATION BADGE PULSE
========================================== */

const notificationBadge = document.querySelector(".notification span");

if (notificationBadge) {

    setInterval(() => {

        notificationBadge.style.transform = "scale(1.3)";

        setTimeout(() => {

            notificationBadge.style.transform = "scale(1)";

        }, 300);

    }, 2500);

}
/* ==========================================
        EXPORT BUTTONS
========================================== */

const exportPDF = document.querySelector(".pdf-btn");

if (exportPDF) {

    exportPDF.addEventListener("click", () => {

        showToast("PDF Export feature will be connected with backend.");

    });

}

const exportExcel = document.querySelector(".excel-btn");

if (exportExcel) {

    exportExcel.addEventListener("click", () => {

        showToast("Excel Export feature will be connected with backend.");

    });

}

/* ==========================================
        ADD EMPLOYEE
========================================== */

const addEmployeeBtn = document.querySelector("#addEmployeeBtn");

if (addEmployeeBtn) {

    addEmployeeBtn.addEventListener("click", () => {

        console.log("Add Employee Button Clicked");

        showToast("Add Employee page coming soon.");

    });

}

/* ==========================================
        PROFILE MENU
========================================== */

const profile = document.querySelector(".profile");

if (profile) {

    profile.addEventListener("click", () => {

        showToast("Profile Menu");

    });

}

/* ==========================================
        SAVE DARK MODE
========================================== */

const body = document.body;

if(localStorage.getItem("theme") === "dark"){

    body.classList.add("dark");

    const icon = document.querySelector("#themeToggle i");

    if(icon){

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    }

}

if(themeBtn){

    themeBtn.addEventListener("click",()=>{

        if(body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

        }

        else{

            localStorage.setItem("theme","light");

        }

    });

}

/* ==========================================
        TABLE ROW HOVER EFFECT
========================================== */

document.querySelectorAll(".employee-table tbody tr").forEach(row=>{

    row.addEventListener("mouseenter",()=>{

        row.style.transform="scale(1.01)";

    });

    row.addEventListener("mouseleave",()=>{

        row.style.transform="scale(1)";

    });

});

/* ==========================================
        AUTO REFRESH TIME
========================================== */

function updateTime(){

    const now=new Date();

    console.log("Last Updated : "+now.toLocaleTimeString());

}

setInterval(updateTime,60000);

/* ==========================================
        MODULE READY
========================================== */

console.log("====================================");

console.log(" RicozOps Employee Module Loaded ");

console.log(" Version : 2.0 ");

console.log(" Status : Ready ");

console.log("====================================");
/* ==========================================
        LOAD EMPLOYEES FROM DATABASE
========================================== */

async function loadEmployees() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch("https://ricozops-1.onrender.com/api/employees", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();
        console.log("Status:", response.status);
console.log("Response:", data);


        console.log("Employees:", data);

        if (!data.success) {
            return;
        }

        const tbody = document.getElementById("employeeTableBody");
console.log("TBODY =", tbody);
console.log("Employees =", data.employees);
        tbody.innerHTML = "";
console.log(data.employees);

        data.employees.forEach(emp => {
            console.log("Appending:", emp.full_name);
            console.log(emp);
console.log("Employee Object:", emp);
console.log("Keys:", Object.keys(emp));
            tbody.innerHTML += `
                <tr>

                    <td>
                        <img src="../assets/images/user1.png" class="emp-photo">
                    </td>

                    <td>${emp.employee_id}</td>

                    <td><strong>${emp.full_name}</strong></td>

                    <td>${emp.department}</td>

                    <td>${emp.designation}</td>

                    <td>${emp.email}</td>

                    <td>${emp.phone}</td>

                    <td>₹${Number(emp.salary).toLocaleString("en-IN")}</td>

                    <td>${new Date(emp.joining_date).toLocaleDateString("en-GB")}</td>

                    <td>
                        <span class="status active">
                            ${emp.status || "Active"}
                        </span>
                    </td>

                    <td>
                        <button class="action-btn view" data-id="${emp.id}">👁</button>

<button class="action-btn edit" data-id="${emp.id}">✏️</button>

<button class="action-btn delete" data-id="${emp.id}">🗑</button>
                    </td>

                </tr>
            `;

        });
// ================= VIEW =================
document.querySelectorAll(".view").forEach(button => {

    button.addEventListener("click", function () {

        const row = this.closest("tr");

        alert("Employee : " + row.cells[2].innerText);

    });

});

// ================= EDIT =================
document.querySelectorAll(".edit").forEach(button => {

    button.addEventListener("click", function () {

        const row = this.closest("tr");

        // Hidden ID
        document.getElementById("employee_db_id").value = this.dataset.id;

        // Form Fields
        document.getElementById("employee_id").value = row.cells[1].innerText;
        document.getElementById("full_name").value = row.cells[2].innerText;
        document.getElementById("department").value = row.cells[3].innerText;
        document.getElementById("designation").value = row.cells[4].innerText;
        document.getElementById("email").value = row.cells[5].innerText;
        document.getElementById("phone").value = row.cells[6].innerText;

        // Salary (₹ aur comma hatao)
        document.getElementById("salary").value =
            row.cells[7].innerText.replace("₹", "").replace(/,/g, "");

        // Date ko yyyy-mm-dd me convert karo
        const date = row.cells[8].innerText.split("/");
        document.getElementById("joining_date").value =
            `${date[2]}-${date[1]}-${date[0]}`;

        // Modal title aur button text change
        document.getElementById("modalTitle").innerText = "Edit Employee";
        document.getElementById("saveEmployeeBtn").innerText = "Update Employee";

        // Popup open
        document.getElementById("employeeModal").classList.add("active");

    });

});

// ================= DELETE =================
document.querySelectorAll(".delete").forEach(button => {

    button.addEventListener("click", async function () {

        if (!confirm("Delete this employee?")) return;

        const id = this.dataset.id;
        const token = localStorage.getItem("token");

        try {

            const response = await fetch(`https://ricozops-1.onrender.com/api/employees/delete/${id}`, {

                method: "DELETE",

                headers: {
                    "Authorization": "Bearer " + token
                }

            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {

                this.closest("tr").remove();

            }

        } catch (err) {

            console.log(err);

        }

    });

});
    } catch (err) {

        console.log(err);

    }

}

window.addEventListener("DOMContentLoaded", loadEmployees);
/* ==========================================
        ADD EMPLOYEE MODAL
========================================== */

const addBtn = document.getElementById("addEmployeeBtn");
const modal = document.getElementById("employeeModal");
const closeBtn = document.getElementById("closeModal");

if (addBtn) {

    addBtn.addEventListener("click", () => {

        modal.classList.add("active");

    });

}

if (closeBtn) {

    closeBtn.addEventListener("click", () => {

        modal.classList.remove("active");

    });

}

// Modal ke bahar click karne par close ho
window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

});
/* ==========================================
        SAVE EMPLOYEE
========================================== */

const employeeForm = document.getElementById("employeeForm");

if (employeeForm) {

    employeeForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");
const id = document.getElementById("employee_db_id").value;

const isEdit = id !== "";
        const employee = {

            employee_id: document.getElementById("employee_id").value,

            full_name: document.getElementById("full_name").value,

            email: document.getElementById("email").value,

            phone: document.getElementById("phone").value,

            department: document.getElementById("department").value,

            designation: document.getElementById("designation").value,

            salary: document.getElementById("salary").value,

            joining_date: document.getElementById("joining_date").value,
            status: document.getElementById("status").value
        };

        try {

           const response = await fetch(

    isEdit
        ? `https://ricozops-1.onrender.com/api/employees/update/${id}`
        : "https://ricozops-1.onrender.com/api/employees/add",

    {

        method: isEdit ? "PUT" : "POST",

        headers: {

            "Content-Type": "application/json",

            "Authorization": "Bearer " + token

        },

        body: JSON.stringify(employee)

    }

);

            const data = await response.json();

            alert(data.message);

           if (data.success) {

    alert(isEdit ? "Employee Updated Successfully" : "Employee Added Successfully");

    modal.classList.remove("active");

    employeeForm.reset();

    document.getElementById("employee_db_id").value = "";

    document.getElementById("modalTitle").innerText = "Add Employee";

    document.getElementById("saveEmployeeBtn").innerText = "Save Employee";

    loadEmployees();

}

        } catch (err) {

            console.log(err);

            alert("Error adding employee");

        }

    });

}