// =========================================
// API URL
// =========================================

const API_URL = "http://localhost:5000/api";

// =========================================
// DOM Elements
// =========================================

const leaveTableBody = document.getElementById("leaveTableBody");

const leaveModal = document.getElementById("leaveModal");

const leaveForm = document.getElementById("leaveForm");

const addLeaveBtn = document.getElementById("addLeaveBtn");

const closeModal = document.getElementById("closeModal");

const cancelBtn = document.getElementById("cancelBtn");

const searchLeave = document.getElementById("searchLeave");

const exportLeaveBtn = document.getElementById("exportLeaveBtn");

// =========================================
// Dashboard Cards
// =========================================

const totalLeaves = document.getElementById("totalLeaves");

const pendingLeaves = document.getElementById("pendingLeaves");

const approvedLeaves = document.getElementById("approvedLeaves");

const rejectedLeaves = document.getElementById("rejectedLeaves");

// =========================================
// Global Variables
// =========================================

let leaveData = [];

let employeeData = [];

let editId = -1;
// =========================================
// Load Employees
// =========================================

async function loadEmployees() {

    try {

       const token = localStorage.getItem("token");

const response = await fetch(`${API_URL}/employees`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

        const result = await response.json();

        if (!result.success) {

            alert("Employees Not Found");

            return;

        }

        employeeData = result.employees;

        const employeeSelect = document.getElementById("employee_id");

        employeeSelect.innerHTML = `
            <option value="">Select Employee</option>
        `;

        employeeData.forEach(emp => {

            employeeSelect.innerHTML += `
                <option value="${emp.id}">
                    ${emp.full_name}
                </option>
            `;

        });

    }

    catch (error) {

        console.log("LOAD EMPLOYEE ERROR:", error);

    }

}
// =========================================
// Fetch Leaves
// =========================================

async function fetchLeaves() {

    try {

        const token = localStorage.getItem("token");

const response = await fetch(`${API_URL}/leaves`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

        const result = await response.json();

        if (!result.success) {

            alert("Leaves Not Found");

            return;

        }

       leaveData = result.leaves.map(item => ({
    ...item,
    start_date: item.start_date
        ? item.start_date.substring(0,10)
        : "",
    end_date: item.end_date
        ? item.end_date.substring(0,10)
        : ""
}));

        loadLeaves();

        updateCards();

    }

    catch (error) {

        console.log("FETCH LEAVES ERROR:", error);

    }

}
// =========================================
// Load Leave Table
// =========================================

function loadLeaves() {

    leaveTableBody.innerHTML = "";

    leaveData.forEach(item => {

        leaveTableBody.innerHTML += `

            <tr>

                <td>${item.id}</td>

                <td>${item.full_name}</td>

                <td>${item.leave_type}</td>

               <td>${item.start_date.substring(0,10)}</td>
<td>${item.end_date.substring(0,10)}</td>

                <td>${item.total_days}</td>

                <td>

                    <span class="status ${item.status.toLowerCase()}">

                        ${item.status}

                    </span>

                </td>

                <td>

    <button
        class="edit-btn"
        onclick="editLeave(${item.id})">
        Edit
    </button>

    <button
        class="delete-btn"
        onclick="deleteLeave(${item.id})">
        Delete
    </button>

    <button
        class="approve-btn"
        onclick="approveLeave(${item.id}, 'Approved')">
        Approve
    </button>

    <button
        class="reject-btn"
        onclick="approveLeave(${item.id}, 'Rejected')">
        Reject
    </button>

</td>

            </tr>

        `;

    });

}
// =========================================
// Update Dashboard Cards
// =========================================

function updateCards() {

    totalLeaves.textContent = leaveData.length;

    const pending = leaveData.filter(item =>
        item.status === "Pending"
    ).length;

    const approved = leaveData.filter(item =>
        item.status === "Approved"
    ).length;

    const rejected = leaveData.filter(item =>
        item.status === "Rejected"
    ).length;

    pendingLeaves.textContent = pending;

    approvedLeaves.textContent = approved;

    rejectedLeaves.textContent = rejected;

}
// =========================================
// Open Modal
// =========================================

addLeaveBtn.addEventListener("click", function () {

    editId = -1;

    leaveForm.reset();
document.getElementById("total_days").value = "";
    document.getElementById("modalTitle").textContent = "Apply Leave";

    leaveModal.style.display = "flex";

});

// =========================================
// Close Modal
// =========================================

closeModal.addEventListener("click", function () {

    leaveModal.style.display = "none";

});

cancelBtn.addEventListener("click", function () {

    leaveModal.style.display = "none";

});

// =========================================
// Close Modal Outside Click
// =========================================

window.addEventListener("click", function (e) {

    if (e.target === leaveModal) {

        leaveModal.style.display = "none";

    }

});
// =========================================
// Auto Calculate Total Days
// =========================================

const startDate = document.getElementById("start_date");

const endDate = document.getElementById("end_date");

const totalDays = document.getElementById("total_days");

function calculateTotalDays() {

    if (startDate.value && endDate.value) {

        const start = new Date(startDate.value);

        const end = new Date(endDate.value);

        const diff = end - start;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

        totalDays.value = days > 0 ? days : 0;

    }

}

startDate.addEventListener("change", calculateTotalDays);

endDate.addEventListener("change", calculateTotalDays);
// =========================================
// Add Leave
// =========================================

leaveForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    if (editId !== -1) return;

    const employee_id = document.getElementById("employee_id").value;

    const leave_type = document.getElementById("leave_type").value;

    const start_date = document.getElementById("start_date").value;

    const end_date = document.getElementById("end_date").value;

    const total_days = document.getElementById("total_days").value;

    const reason = document.getElementById("reason").value;

    try {

        const response = await fetch(`${API_URL}/leaves/add`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

           body: JSON.stringify({

employee_id,
leave_type,
start_date,
end_date,
total_days,
reason,
status:"Pending"

})

        });

        const result = await response.json();

        if (result.success) {

            alert(result.message);

            leaveForm.reset();

            leaveModal.style.display = "none";

            fetchLeaves();

        }

        else {

            alert(result.error);

        }

    }

    catch (error) {

        console.log("ADD LEAVE ERROR:", error);

        alert("Failed to Apply Leave");

    }

});
// =========================================
// Edit Leave
// =========================================

function editLeave(id) {

    const leave = leaveData.find(item => item.id == id);

    if (!leave) {

        alert("Leave record not found.");

        return;

    }

    editId = id;

    document.getElementById("modalTitle").textContent = "Update Leave";

    document.getElementById("employee_id").value = leave.employee_id;

    document.getElementById("leave_type").value = leave.leave_type;

    document.getElementById("start_date").value = leave.start_date;

    document.getElementById("end_date").value = leave.end_date;

    document.getElementById("total_days").value = leave.total_days;

    document.getElementById("reason").value = leave.reason;

    leaveModal.style.display = "flex";

}
// =========================================
// Update Leave
// =========================================

leaveForm.addEventListener("submit", async function (e) {

    if (editId === -1) return;

    e.preventDefault();

    const leave_type = document.getElementById("leave_type").value;

    const start_date = document.getElementById("start_date").value;

    const end_date = document.getElementById("end_date").value;

    const total_days = document.getElementById("total_days").value;

    const reason = document.getElementById("reason").value;

    try {

        const response = await fetch(`${API_URL}/leaves/update/${editId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                leave_type,
                start_date,
                end_date,
                total_days,
                reason,
                status: "Pending"

            })

        });

        const result = await response.json();

        if (result.success) {

            alert(result.message);

            leaveModal.style.display = "none";

            leaveForm.reset();

            editId = -1;

            fetchLeaves();

        }

        else {

            alert(result.error);

        }

    }

    catch (error) {

        console.log("UPDATE LEAVE ERROR:", error);

        alert("Update Failed");

    }

});
// =========================================
// Delete Leave
// =========================================

async function deleteLeave(id) {

    const confirmDelete = confirm("Are you sure you want to delete this leave?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`${API_URL}/leaves/delete/${id}`, {

            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            }

        });

        const result = await response.json();

        if (result.success) {

            alert(result.message);

            fetchLeaves();

        }

        else {

            alert(result.error);

        }

    }

    catch (error) {

        console.log("DELETE LEAVE ERROR:", error);

        alert("Delete Failed");

    }

}

// =========================================
// Search Leave
// =========================================

searchLeave.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = leaveData.filter(item =>

        item.full_name.toLowerCase().includes(keyword) ||

        item.leave_type.toLowerCase().includes(keyword) ||

        item.status.toLowerCase().includes(keyword)

    );

    leaveTableBody.innerHTML = "";

    filtered.forEach(item => {

        leaveTableBody.innerHTML += `

        <tr>

            <td>${item.id}</td>

            <td>${item.full_name}</td>

            <td>${item.leave_type}</td>

            <td>${item.start_date}</td>

            <td>${item.end_date}</td>

            <td>${item.total_days}</td>

            <td>

                <span class="status ${item.status.toLowerCase()}">

                    ${item.status}

                </span>

            </td>

            <td>

    <button
        class="edit-btn"
        onclick="editLeave(${item.id})">
        Edit
    </button>

    <button
        class="delete-btn"
        onclick="deleteLeave(${item.id})">
        Delete
    </button>

    <button
        class="approve-btn"
        onclick="approveLeave(${item.id}, 'Approved')">
        Approve
    </button>

    <button
        class="reject-btn"
        onclick="approveLeave(${item.id}, 'Rejected')">
        Reject
    </button>

</td>

        </tr>

        `;

    });

});

// =========================================
// Initialize
// =========================================

window.addEventListener("DOMContentLoaded", () => {

    loadEmployees();

    fetchLeaves();

});
// =========================================
// Export Leave Report PDF
// =========================================

exportLeaveBtn.addEventListener("click", function () {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("RicozOps - Leave Report", 14, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    let y = 35;

    doc.text("ID", 10, y);
    doc.text("Employee", 25, y);
    doc.text("Type", 75, y);
    doc.text("Days", 115, y);
    doc.text("Status", 135, y);
    doc.text("Start", 160, y);
    doc.text("End", 185, y);

    y += 8;

    doc.line(10, y - 4, 200, y - 4);

    leaveData.forEach((item) => {

        if (y > 280) {

            doc.addPage();

            y = 20;

        }

        doc.text(String(item.id), 10, y);

        doc.text(String(item.full_name || ""), 25, y);

        doc.text(String(item.leave_type || ""), 75, y);

        doc.text(String(item.total_days || ""), 115, y);

        doc.text(String(item.status || ""), 135, y);

        doc.text(String(item.start_date || ""), 160, y);

        doc.text(String(item.end_date || ""), 185, y);

        y += 8;

    });

    doc.save("Leave_Report.pdf");

});
// =========================================
// APPROVE / REJECT LEAVE
// =========================================

async function approveLeave(id, status) {

    try {

        const response = await fetch(`${API_URL}/leaves/approve/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

    status: status,

    approved_by: 4

})

        });

        const result = await response.json();

        if (result.success) {

            alert(result.message);

            fetchLeaves();

        } else {

            alert(result.error);

        }

    } catch (error) {

        console.log(error);

        alert("Approval Failed");

    }

}