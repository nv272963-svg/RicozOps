/* ==========================================
        RicozOps Reports Module v2.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

/* ==========================================
        REVENUE CHART
========================================== */

const revenueChart = document.getElementById("revenueChart");

if (revenueChart) {

new Chart(revenueChart, {

type: "bar",

data: {

labels: [

"Jan","Feb","Mar","Apr","May","Jun",
"Jul","Aug","Sep","Oct","Nov","Dec"

],

datasets: [{

label: "Revenue (₹ Lakhs)",

data: [

1.2,1.5,1.8,2.1,2.3,2.6,
2.9,3.2,3.5,3.8,4.0,4.4

],

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
        PROJECT STATUS CHART
========================================== */

const projectChart = document.getElementById("projectChart");

if (projectChart) {

new Chart(projectChart, {

type: "doughnut",

data: {

labels: [

"Completed",

"In Progress",

"Pending"

],

datasets: [{

data: [

62,

25,

13

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
        DEPARTMENT PERFORMANCE
========================================== */

const departmentChart = document.getElementById("departmentChart");

if (departmentChart) {

new Chart(departmentChart, {

type: "radar",

data: {

labels: [

"Development",

"HR",

"Testing",

"Support",

"Sales"

],

datasets: [{

label: "Performance",

data: [

96,

90,

88,

84,

91

],

backgroundColor: "rgba(37,99,235,.2)",

borderColor: "#2563EB",

pointBackgroundColor: "#2563EB"

}]

},

options: {

responsive: true,

plugins: {

legend: {

display: false

}

}

}

});

}

/* ==========================================
        ATTENDANCE CHART
========================================== */

const attendanceChart = document.getElementById("attendanceChart");

if (attendanceChart) {

new Chart(attendanceChart, {

type: "line",

data: {

labels: [

"Week1",

"Week2",

"Week3",

"Week4"

],

datasets: [{

label: "Attendance %",

data: [

92,

95,

94,

97

],

borderColor: "#22C55E",

backgroundColor: "rgba(34,197,94,.2)",

fill: true,

tension: .4

}]

},

options: {

responsive: true

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

localStorage.setItem("theme","dark");

themeBtn.innerHTML =
'<i class="fa-solid fa-sun"></i>';

} else {

localStorage.setItem("theme","light");

themeBtn.innerHTML =
'<i class="fa-solid fa-moon"></i>';

}

});

}

});
/* ==========================================
        LIVE SEARCH
========================================== */

const reportSearch = document.querySelector("#reportSearch");

if (reportSearch) {

    reportSearch.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".report-table tbody tr").forEach(row => {

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(value) ? "" : "none";

        });

    });

}

/* ==========================================
        REPORT TYPE FILTER
========================================== */

const reportType = document.querySelector("#reportType");

if (reportType) {

    reportType.addEventListener("change", function () {

        showToast(
            "Filter Applied : " + this.options[this.selectedIndex].text,
            "info"
        );

    });

}

/* ==========================================
        DATE FILTER
========================================== */

const filterBtn = document.querySelector(".filter-btn");

if (filterBtn) {

    filterBtn.addEventListener("click", () => {

        const start = document.querySelector("#startDate").value;

        const end = document.querySelector("#endDate").value;

        if (!start || !end) {

            showToast("Please select both dates", "error");

            return;

        }

        showToast("Date Filter Applied", "success");

    });

}

/* ==========================================
        RESET FILTER
========================================== */

const resetBtn = document.querySelector(".reset-btn");

if (resetBtn) {

    resetBtn.addEventListener("click", () => {

        document.querySelector("#startDate").value = "";

        document.querySelector("#endDate").value = "";

        document.querySelector("#reportType").selectedIndex = 0;

        showToast("Filters Reset Successfully", "info");

    });

}

/* ==========================================
        EXPORT PDF
========================================== */

const pdfBtn = document.querySelector(".pdf-btn");

if (pdfBtn) {

    pdfBtn.addEventListener("click", () => {

        showToast("Generating PDF Report...", "success");

        console.log("PDF Export");

    });

}

/* ==========================================
        EXPORT EXCEL
========================================== */

const excelBtn = document.querySelector(".excel-btn");

if (excelBtn) {

    excelBtn.addEventListener("click", () => {

        showToast("Generating Excel Report...", "success");

        console.log("Excel Export");

    });

}

/* ==========================================
        PRINT REPORT
========================================== */

const printBtn = document.querySelector(".print-btn");

if (printBtn) {

    printBtn.addEventListener("click", () => {

        showToast("Opening Print Window...", "info");

        setTimeout(() => {

            window.print();

        }, 700);

    });

}

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
        SUMMARY CARD ANIMATION
========================================== */

const summaryCards = document.querySelectorAll(".summary-card h2");

summaryCards.forEach(card => {

    const original = card.innerText;

    const number = parseFloat(original.replace(/[^\d.]/g, ""));

    if (!isNaN(number)) {

        let count = 0;

        const step = number / 50;

        const interval = setInterval(() => {

            count += step;

            if (count >= number) {

                card.innerText = original;

                clearInterval(interval);

            } else {

                if (original.includes("₹")) {

                    card.innerText = "₹" + count.toFixed(2) + " Lakh";

                } else if (original.includes("%")) {

                    card.innerText = Math.floor(count) + "%";

                } else {

                    card.innerText = Math.floor(count);

                }

            }

        }, 20);

    }

});

/* ==========================================
        RIPPLE BUTTON EFFECT
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
        DOWNLOAD BUTTONS
========================================== */

document.querySelectorAll(".download-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        showToast("Download Started...", "success");

    });

});

/* ==========================================
        QUICK ACTION BUTTONS
========================================== */

document.querySelectorAll(".action-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        showToast(btn.innerText.trim(), "info");

    });

});

/* ==========================================
        AUTO REFRESH SIMULATION
========================================== */

setInterval(() => {

    console.log("Reports refreshed at " + new Date().toLocaleTimeString());

}, 60000);

/* ==========================================
        WELCOME MESSAGE
========================================== */

setTimeout(() => {

    showToast("Welcome to RicozOps Reports Dashboard", "success");

}, 800);

/* ==========================================
        PAGE FADE-IN
========================================== */

document.body.style.opacity = "0";

window.addEventListener("load", () => {

    document.body.style.transition = "opacity .5s ease";

    document.body.style.opacity = "1";

});

/* ==========================================
        LOGOUT BUTTON
========================================== */

const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        if (confirm("Are you sure you want to logout?")) {

            window.location.href = "login.html";

        }

    });

}

console.log("RicozOps Reports Module Loaded Successfully");
/* ==========================================
   EXPORT PDF
========================================== */

const exportPdfBtn = document.getElementById("exportPdfBtn");

if (exportPdfBtn) {

    exportPdfBtn.addEventListener("click", () => {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("RicozOps ERP", 20, 20);

        doc.setFontSize(14);
        doc.text("Business Operations Report", 20, 35);

        doc.setFontSize(12);
        doc.text("Generated On: " + new Date().toLocaleString(), 20, 50);

        doc.line(20, 55, 190, 55);

        doc.text("This is a sample report generated from RicozOps ERP.", 20, 70);

        doc.save("RicozOps_Report.pdf");

    });

}
/* ==========================================
   EXPORT EXCEL
========================================== */

const exportExcelBtn = document.getElementById("exportExcelBtn");

if (exportExcelBtn) {

    exportExcelBtn.addEventListener("click", () => {

        const reportData = [
            ["RicozOps ERP Report"],
            [],
            ["Generated On", new Date().toLocaleString()],
            [],
            ["Department", "Value"],
            ["Total Employees", 25],
            ["Running Projects", 8],
            ["Completed Projects", 18],
            ["Pending Tasks", 12],
            ["Revenue (Lakhs)", 44]
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(reportData);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        XLSX.writeFile(workbook, "RicozOps_Report.xlsx");

    });

}