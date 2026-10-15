// ======================================================
// ATTENDANCE MODULE - PART 1
// RicozOps Business Operations Management Platform
// ======================================================

// ------------------------------
// API URL
// ------------------------------
const token = localStorage.getItem("token");
const API_URL = "http://localhost:5000/api";

// ------------------------------
// Global Variables
// ------------------------------

let attendanceData = [];

let editId = null;

// ------------------------------
// DOM Elements
// ------------------------------

const attendanceTableBody = document.getElementById("attendanceTableBody");

const attendanceForm = document.getElementById("attendanceForm");

const attendanceModal = document.getElementById("attendanceModal");

const employeeSelect = document.getElementById("employee_id");

const closeBtn = document.getElementById("closeModal");

const cancelBtn = document.getElementById("cancelBtn");

const modalTitle = document.getElementById("modalTitle");

// ======================================================
// LOAD EMPLOYEES
// ======================================================

async function fetchEmployees() {

    try {

        const response = await fetch(`${API_URL}/employees`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

        const data = await response.json();

        employeeSelect.innerHTML =
            `<option value="">Select Employee</option>`;

        data.employees.forEach(emp => {

            employeeSelect.innerHTML += `
                <option value="${emp.id}">
                    ${emp.full_name}
                </option>
            `;

        });

    } catch (error) {

        console.log("Employee Load Error");

        console.log(error);

    }

}

// ======================================================
// LOAD ATTENDANCE
// ======================================================

async function fetchAttendance() {

    try {

        const response = await fetch(`${API_URL}/attendance`, {

    headers: {

        "Authorization": `Bearer ${token}`

    }

});

        const data = await response.json();

        attendanceData = data.attendance;

        loadAttendance();

    } catch (error) {

        console.log("Attendance Load Error");

        console.log(error);

    }

}

// ======================================================
// LOAD TABLE
// ======================================================

function loadAttendance() {

    attendanceTableBody.innerHTML = "";

    attendanceData.forEach(item => {
console.log(item);
        attendanceTableBody.innerHTML += `

        <tr>
            <td>${item.id}</td>
            <td>${item.full_name}</td>

            <td>${new Date(item.attendance_date).toLocaleDateString("en-GB")}</td>

            <td>${item.check_in ? item.check_in.substring(0,5) : "-"}</td>

            <td>${item.check_out ? item.check_out.substring(0,5) : "-"}</td>

            <td>

                <span class="status ${item.status.toLowerCase()}">

                    ${item.status}

                </span>

            </td>

            <td>${item.remarks ?? ""}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editAttendance(${item.id})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteAttendance(${item.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================================
// INITIAL LOAD
// ======================================================

fetchEmployees();

fetchAttendance();
// ======================================================
// OPEN ADD MODAL
// ======================================================

document.getElementById("addAttendanceBtn").addEventListener("click", () => {

    editId = null;

    attendanceForm.reset();

    modalTitle.innerText = "Add Attendance";

    attendanceModal.style.display = "flex";

});

// ======================================================
// CLOSE MODAL
// ======================================================

closeBtn.addEventListener("click", () => {

    attendanceModal.style.display = "none";

});

cancelBtn.addEventListener("click", () => {

    attendanceModal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === attendanceModal) {

        attendanceModal.style.display = "none";

    }

});

// ======================================================
// SAVE ATTENDANCE
// ======================================================

attendanceForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const attendance = {

        employee_id: employeeSelect.value,

        attendance_date:
            document.getElementById("attendance_date").value,

        check_in:
            document.getElementById("check_in").value,

        check_out:
            document.getElementById("check_out").value,

        status:
            document.getElementById("status").value,

        remarks:
            document.getElementById("remarks").value

    };

    try {

        let url = `${API_URL}/attendance/add`;

        let method = "POST";

        if (editId !== null) {

            url = `${API_URL}/attendance/update/${editId}`;

            method = "PUT";

        }

        const response = await fetch(url, {

            method: method,

            headers:{
   "Content-Type":"application/json",
   Authorization:`Bearer ${token}`
},

            body: JSON.stringify(attendance)

        });

        const result = await response.json();

        if (result.success) {

           alert(result.message);

            attendanceModal.style.display = "none";

            attendanceForm.reset();

            editId = null;

            fetchAttendance();

        }

        else {

            showToast(result.error,"error");

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

});
// ======================================================
// EDIT ATTENDANCE
// ======================================================

async function editAttendance(id) {

    try {

        // Find selected record
        const item = attendanceData.find(att => att.id == id);

        if (!item) {

            alert("Attendance record not found.");

            return;

        }

        // Save edit id
        editId = id;

        // Change modal title
        modalTitle.innerText = "Edit Attendance";

        // Fill form
        employeeSelect.value = item.employee_id;

        document.getElementById("attendance_date").value =
            item.attendance_date;

        document.getElementById("check_in").value =
            item.check_in
                ? item.check_in.substring(0, 5)
                : "";

        document.getElementById("check_out").value =
            item.check_out
                ? item.check_out.substring(0, 5)
                : "";

        document.getElementById("status").value =
            item.status;

        document.getElementById("remarks").value =
            item.remarks || "";

        // Open Modal
        attendanceModal.style.display = "flex";

    }

    catch (error) {

        console.log(error);

        alert("Unable to load attendance.");

    }

}
// ======================================================
// DELETE ATTENDANCE
// ======================================================

async function deleteAttendance(id) {
console.log("Delete Clicked", id);
    const confirmDelete = confirm("Are you sure you want to delete this attendance?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`${API_URL}/attendance/delete/${id}`, {

            method: "DELETE",

          headers:{
    Authorization:`Bearer ${token}`
}

        });

        const result = await response.json();

        if (result.success) {

            alert(result.message);

            fetchAttendance();

        } else {

            alert(result.error);

        }

    }

    catch (error) {

        console.log(error);

        alert("Delete Failed");

    }

}

// ======================================================
// SEARCH ATTENDANCE
// ======================================================

const searchInput = document.getElementById("searchAttendance");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const filtered = attendanceData.filter(item => {

            return (

                item.full_name.toLowerCase().includes(keyword) ||

                item.status.toLowerCase().includes(keyword) ||

                (item.remarks || "").toLowerCase().includes(keyword)

            );

        });

        loadFilteredAttendance(filtered);

    });

}

// ======================================================
// LOAD FILTERED TABLE
// ======================================================

function loadFilteredAttendance(data) {

    attendanceTableBody.innerHTML = "";

    data.forEach(item => {

        attendanceTableBody.innerHTML += `

        <tr>
            <td>${item.id}</td>
            <td>${item.full_name}</td>

            <td>${item.attendance_date}</td>

            <td>${item.check_in}</td>

            <td>${item.check_out}</td>

            <td>

                <span class="status ${item.status.toLowerCase()}">

                    ${item.status}

                </span>

            </td>

            <td>${item.remarks || ""}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editAttendance(${item.id})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteAttendance(${item.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================================
// UPDATE DASHBOARD CARDS
// ======================================================

function updateCards() {

    const total = attendanceData.length;

    let present = 0;
    let absent = 0;
    let late = 0;

    attendanceData.forEach(item => {

        const status = item.status.trim().toLowerCase();

        if (status === "present") {
            present++;
        }
        else if (status === "absent") {
            absent++;
        }
        else if (status === "late") {
            late++;
        }

    });

    document.getElementById("totalAttendance").innerText = total;
    document.getElementById("presentCount").innerText = present;
    document.getElementById("absentCount").innerText = absent;
    document.getElementById("lateCount").innerText = late;

}
// ======================================================
// UPDATE CARDS AFTER TABLE LOAD
// ======================================================

const oldLoadAttendance = loadAttendance;

loadAttendance = function () {

    oldLoadAttendance();

    updateCards();

};
// ======================================================
// EXPORT PDF
// ======================================================

async function exportAttendancePDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Attendance Report", 14, 20);

    let y = 35;

    doc.setFontSize(11);

    attendanceData.forEach((item, index) => {

        doc.text(
            `${index + 1}. ${item.full_name} | ${item.attendance_date} | ${item.status}`,
            10,
            y
        );

        y += 8;

        if (y > 280) {

            doc.addPage();

            y = 20;

        }

    });

    doc.save("Attendance_Report.pdf");

}

// ======================================================
// EXPORT BUTTON
// ======================================================

const exportBtn =
document.getElementById("exportPdfBtn");

if (exportBtn) {

    exportBtn.addEventListener("click", exportAttendancePDF);

}

// ======================================================
// RESET FORM
// ======================================================

function resetAttendanceForm() {

    editId = null;

    attendanceForm.reset();

}
function showToast(message, type) {

    alert(message);

}