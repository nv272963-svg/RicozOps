/* ==========================================
   RicozOps Employee Management v3.0
   Author : Nitin Varma
========================================== */

// API URL
const API = "https://ricozops-1.onrender.com/api/employees";

// DOM Elements
const employeeTableBody = document.getElementById("employeeTableBody");
const employeeForm = document.getElementById("employeeForm");
const modal = document.getElementById("employeeModal");
const addBtn = document.getElementById("addEmployeeBtn");
const closeBtn = document.getElementById("closeModal");
const searchInput = document.getElementById("employeeSearch");
const themeBtn = document.getElementById("themeToggle");

// Toast
function showToast(message){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerText=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.remove();

    },3000);

}

// Page Loaded
document.addEventListener("DOMContentLoaded",()=>{

    console.log("Employees Module Loaded");

    loadEmployees();

});

// ================= DARK MODE =================

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

    if(themeBtn){

        themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

    }

}

if(themeBtn){

    themeBtn.onclick=function(){

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

            this.innerHTML='<i class="fa-solid fa-sun"></i>';

        }else{

            localStorage.setItem("theme","light");

            this.innerHTML='<i class="fa-solid fa-moon"></i>';

        }

    };

}

// ================= SEARCH =================

if(searchInput){

    searchInput.addEventListener("keyup",function(){

        let value=this.value.toLowerCase();

        document.querySelectorAll("#employeeTableBody tr").forEach(row=>{

            row.style.display=row.innerText.toLowerCase().includes(value)
            ?"":"none";

        });

    });

}
/* ==========================================
        LOAD EMPLOYEES
========================================== */

async function loadEmployees() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(API, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        console.log(data);

        if (!data.success) {

            showToast("Employees load failed");

            return;

        }

        employeeTableBody.innerHTML = "";

        data.employees.forEach(emp => {

            employeeTableBody.innerHTML += `

<tr>

<td>
<img src="assets/images/user1.png" class="emp-photo">
</td>

<td>${emp.employee_id}</td>

<td>${emp.full_name}</td>

<td>${emp.department_name || emp.department || "-"}</td>

<td>${emp.designation}</td>

<td>${emp.email}</td>

<td>${emp.phone}</td>

<td>₹${Number(emp.salary).toLocaleString("en-IN")}</td>

<td>${new Date(emp.joining_date).toLocaleDateString("en-GB")}</td>

<td>
<span class="status active">
${emp.status}
</span>
</td>

<td>

<button class="action-btn view" data-id="${emp.id}">
👁
</button>

<button class="action-btn edit" data-id="${emp.id}">
✏️
</button>

<button class="action-btn delete" data-id="${emp.id}">
🗑
</button>

</td>

</tr>

`;

        });

        attachEmployeeEvents();

    }

    catch (err) {

        console.log(err);

        showToast("Server Error");

    }

}
/* ==========================================
        ATTACH EVENTS
========================================== */

function attachEmployeeEvents() {

    // ================= VIEW =================

    document.querySelectorAll(".view").forEach(button => {

        button.onclick = function () {

            const row = this.closest("tr");

            alert(
`Employee Details

ID : ${row.cells[1].innerText}
Name : ${row.cells[2].innerText}
Department : ${row.cells[3].innerText}
Designation : ${row.cells[4].innerText}
Email : ${row.cells[5].innerText}
Phone : ${row.cells[6].innerText}`
            );

        };

    });


    // ================= EDIT =================

    document.querySelectorAll(".edit").forEach(button => {

        button.onclick = function () {

            const row = this.closest("tr");

            document.getElementById("employee_db_id").value =
                this.dataset.id;

            document.getElementById("employee_id").value =
                row.cells[1].innerText;

            document.getElementById("full_name").value =
                row.cells[2].innerText;

            document.getElementById("department").value =
                row.cells[3].innerText;

            document.getElementById("designation").value =
                row.cells[4].innerText;

            document.getElementById("email").value =
                row.cells[5].innerText;

            document.getElementById("phone").value =
                row.cells[6].innerText;

            document.getElementById("salary").value =
                row.cells[7].innerText
                    .replace("₹", "")
                    .replace(/,/g, "");

            const d = row.cells[8].innerText.split("/");

            document.getElementById("joining_date").value =
                `${d[2]}-${d[1]}-${d[0]}`;

            document.getElementById("status").value =
                row.cells[9].innerText.trim();

            document.getElementById("modalTitle").innerText =
                "Edit Employee";

            document.getElementById("saveEmployeeBtn").innerText =
                "Update Employee";

            modal.classList.add("active");

        };

    });


    // ================= DELETE =================

    document.querySelectorAll(".delete").forEach(button => {

        button.onclick = async function () {

            if (!confirm("Delete this employee?")) return;

            const token = localStorage.getItem("token");

            const id = this.dataset.id;

            try {

                const response = await fetch(

                    `${API}/delete/${id}`,

                    {

                        method: "DELETE",

                        headers: {

                            "Authorization": "Bearer " + token

                        }

                    }

                );

                const data = await response.json();

                if (data.success) {

                    showToast("Employee Deleted");

                    loadEmployees();

                } else {

                    alert(data.message);

                }

            }

            catch (err) {

                console.log(err);

                alert("Delete Failed");

            }

        };

    });

}
/* ==========================================
        ADD EMPLOYEE MODAL
========================================== */

// Open Modal
if (addBtn) {

    addBtn.addEventListener("click", () => {

        // Form Reset
        employeeForm.reset();

        document.getElementById("employee_db_id").value = "";

        document.getElementById("modalTitle").innerText = "Add Employee";

        document.getElementById("saveEmployeeBtn").innerText = "Save Employee";

        // Default Status
        document.getElementById("status").value = "Active";

        // Show Modal
        modal.classList.add("active");

    });

}

// Close Button
if (closeBtn) {

    closeBtn.addEventListener("click", () => {

        modal.classList.remove("active");

    });

}

// Outside Click Close
window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

});

// ESC Key Close
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        modal.classList.remove("active");

    }

});
/* ==========================================
        SAVE / UPDATE EMPLOYEE
========================================== */

if (employeeForm) {

    employeeForm.addEventListener("submit", async function (e) {

        e.preventDefault();
console.log("SAVE BUTTON CLICKED");

    alert("Submit Event Working");
        const token = localStorage.getItem("token");

        const id = document.getElementById("employee_db_id").value;

        const isEdit = id !== "";

        const employee = {

            employee_id: document.getElementById("employee_id").value.trim(),

            full_name: document.getElementById("full_name").value.trim(),

            email: document.getElementById("email").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            department: document.getElementById("department").value.trim(),

            designation: document.getElementById("designation").value.trim(),

            salary: document.getElementById("salary").value,

            joining_date: document.getElementById("joining_date").value,

            status: document.getElementById("status").value

        };

        try {

            const url = isEdit
                ? `${API}/update/${id}`
                : `${API}/add`;

            const response = await fetch(url, {

                method: isEdit ? "PUT" : "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify(employee)

            });

            const data = await response.json();

            console.log(data);

            if (data.success) {

                showToast(
                    isEdit
                        ? "Employee Updated Successfully"
                        : "Employee Added Successfully"
                );

                employeeForm.reset();

                document.getElementById("employee_db_id").value = "";

                document.getElementById("modalTitle").innerText = "Add Employee";

                document.getElementById("saveEmployeeBtn").innerText = "Save Employee";

                modal.classList.remove("active");

                loadEmployees();

            } else {

                alert(data.message || "Operation Failed");

            }

        }

       catch (err) {

    console.log("FULL ERROR:", err);

    console.error(err);

    alert("Operation Failed");

}

    });

}