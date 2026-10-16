/* ==========================================================
   RicozOps ERP
   Settings Module
   Version : 5.0 Final
========================================================== */

const API_URL = "https://ricozops-production.up.railway.app/api/settings";

/* ==========================================================
   GLOBAL VARIABLES
========================================================== */

let settingsData = {};

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.clear();

    console.log("====================================");
    console.log(" RicozOps Settings Module ");
    console.log("====================================");

    initializeApplication();

});

/* ==========================================================
   INITIALIZE APPLICATION
========================================================== */

function initializeApplication() {

    initializeTheme();

    initializeForms();

    initializeButtons();

    loadSettings();

}

/* ==========================================================
   LOAD SETTINGS
========================================================== */

async function loadSettings() {
console.log("loadSettings Started");
    showLoader();

    try {
console.log("Before Fetch");
        const response = await fetch(API_URL);
console.log("After Fetch", response.status);
        const result = await response.json();
console.log(result);
        if (!result.success) {

            showToast("Unable to load settings", "error");
            return;

        }

        settingsData = result.settings;

        fillProfileForm();

        fillCompanyForm();
fillAppearanceForm();
        showToast("Settings Loaded", "success");

    }

    catch (error) {

        console.error(error);

        showToast("Server Connection Failed", "error");

    }

}

/* ==========================================================
   FILL PROFILE FORM
========================================================== */

function fillProfileForm() {

    const profileForm = document.getElementById("profileForm");

    if (!profileForm) return;

    profileForm.querySelector("[name='full_name']").value =
        settingsData.full_name || "";

    profileForm.querySelector("[name='email']").value =
        settingsData.email || "";

    profileForm.querySelector("[name='phone']").value =
        settingsData.phone || "";

    profileForm.querySelector("[name='designation']").value =
        settingsData.designation || "";

}

/* ==========================================================
   FILL COMPANY FORM
========================================================== */

function fillCompanyForm() {
console.log("settingsData =", settingsData);
    const companyForm = document.getElementById("companyForm");

    if (!companyForm) return;

    companyForm.querySelector("[name='company_name']").value =
        settingsData.company_name || "";

    companyForm.querySelector("[name='website']").value =
        settingsData.website || "";

    companyForm.querySelector("[name='support_email']").value =
        settingsData.support_email || "";

    companyForm.querySelector("[name='address']").value =
        settingsData.address || "";

}

/* ==========================================================
   FILL APPEARANCE FORM
========================================================== */

function fillAppearanceForm() {

    const appearanceForm = document.getElementById("appearanceForm");

    if (!appearanceForm) return;

    document.getElementById("theme").value =
        settingsData.theme || "Light";

    document.getElementById("primaryColor").value =
        settingsData.primary_color || "#2563EB";

    document.getElementById("fontSize").value =
        settingsData.font_size || "Medium";

}
/* ==========================================================
   LOADER
========================================================== */

function showLoader() {

    console.log("Loading Settings...");

}

/* ==========================================================
   TOAST MESSAGE
========================================================== */

function showToast(message, type = "success") {

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
/* ==========================================================
   INITIALIZE FORMS
========================================================== */

function initializeForms() {

    const profileForm = document.getElementById("profileForm");

    if (profileForm) {

        profileForm.addEventListener("submit", saveProfile);

    }

    const companyForm = document.getElementById("companyForm");

    if (companyForm) {

        companyForm.addEventListener("submit", saveCompany);

    }

}
const securityForm = document.getElementById("securityForm");

if (securityForm) {

    securityForm.addEventListener("submit", saveSecurity);

}
const appearanceForm = document.getElementById("appearanceForm");

if (appearanceForm) {

    appearanceForm.addEventListener("submit", saveAppearance);

}
/* ==========================================================
   SAVE PROFILE
========================================================== */

async function saveProfile(e) {

    e.preventDefault();

    const form = e.target;

    const data = {

        full_name: form.full_name.value.trim(),

        email: form.email.value.trim(),

        phone: form.phone.value.trim(),

        designation: form.designation.value.trim()

    };

    if (
        data.full_name === "" ||
        data.email === "" ||
        data.phone === "" ||
        data.designation === ""
    ) {

        showToast("Please fill all profile fields", "error");

        return;

    }

    try {

        const response = await fetch(`${API_URL}/profile`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        const result = await response.json();
console.log(result);
        if (result.success) {

            showToast(result.message, "success");

            loadSettings();

        } else {

            showToast(result.message, "error");

        }

    }

    catch (error) {

        console.error(error);

        showToast("Profile Update Failed", "error");

    }

}

/* ==========================================================
   SAVE COMPANY
========================================================== */

async function saveCompany(e) {

    e.preventDefault();

    const form = e.target;

    const data = {

        company_name: form.company_name.value.trim(),

        website: form.website.value.trim(),

        support_email: form.support_email.value.trim(),

        address: form.address.value.trim()

    };

    if (
        data.company_name === "" ||
        data.website === "" ||
        data.support_email === "" ||
        data.address === ""
    ) {

        showToast("Please fill all company fields", "error");

        return;

    }

    try {

        const response = await fetch(`${API_URL}/company`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (result.success) {

            showToast(result.message, "success");

            loadSettings();

        } else {

            showToast(result.message, "error");

        }

    }

    catch (error) {

        console.error(error);

        showToast("Company Update Failed", "error");

    }

}
/* ==========================================================
   SAVE SECURITY
========================================================== */

async function saveSecurity(e) {

    e.preventDefault();

    const current_password =
        document.getElementById("currentPassword").value;

    const new_password =
        document.getElementById("newPassword").value;

    const confirm_password =
        document.getElementById("confirmPassword").value;

    if (new_password !== confirm_password) {

        showToast("Passwords do not match", "error");
        return;

    }

    try {

        const response = await fetch(
            `${API_URL}/security`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    current_password,
                    new_password

                })
            }
        );

        const result = await response.json();

        if (result.success) {

            showToast(result.message, "success");

            document.getElementById("securityForm").reset();

        } else {

            showToast(result.message, "error");

        }

    } catch (error) {

        console.error(error);

        showToast("Server Error", "error");

    }

}
/* ==========================================================
   SAVE APPEARANCE
========================================================== */

async function saveAppearance(e) {

    e.preventDefault();

    const theme =
        document.getElementById("theme").value;

    const primary_color =
        document.getElementById("primaryColor").value;

    const font_size =
        document.getElementById("fontSize").value;

    try {

        const response = await fetch(
            `${API_URL}/appearance`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    theme,
                    primary_color,
                    font_size

                })
            }
        );

        const result = await response.json();

        if (result.success) {

            showToast(result.message, "success");

        } else {

            showToast(result.message, "error");

        }

    }

    catch (error) {

        console.error(error);

        showToast("Server Error", "error");

    }

}
/* ==========================================================
   INITIALIZE BUTTONS
========================================================== */

function initializeButtons() {

    // Logout Button
    const logoutBtn = document.querySelector(".logout-btn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            if (confirm("Are you sure you want to logout?")) {

                localStorage.removeItem("token");

                window.location.href = "login.html";

            }

        });

    }

    // Contact Support Button
    document.querySelectorAll(".support-box .save-btn").forEach(button => {

        button.addEventListener("click", (e) => {

            e.preventDefault();

            showToast("Opening Support...", "info");

        });

    });

    // Copy API Keys
    document.querySelectorAll(".settings-card .save-btn").forEach(button => {

        if (button.textContent.includes("Copy API")) {

            button.addEventListener("click", (e) => {

                e.preventDefault();

                const publicKey =
                    document.querySelector("input[readonly]").value;

                navigator.clipboard.writeText(publicKey);

                showToast("Public API Key Copied", "success");

            });

        }

    });

}

/* ==========================================================
   DARK MODE
========================================================== */

function initializeTheme() {

    const button = document.querySelector(".theme-btn");

    if (!button) return;

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

        button.innerHTML = `<i class="fa-solid fa-sun"></i>`;

    }

    button.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            button.innerHTML =
                `<i class="fa-solid fa-sun"></i>`;

            showToast("Dark Mode Enabled", "info");

        }

        else {

            localStorage.setItem("theme", "light");

            button.innerHTML =
                `<i class="fa-solid fa-moon"></i>`;

            showToast("Light Mode Enabled", "success");

        }

    });

}

/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

window.addEventListener("error", (e) => {

    console.error("Settings Error :", e.message);

});

/* ==========================================================
   MODULE READY
========================================================== */

console.log("====================================");
console.log("RicozOps Settings Ready");
console.log("Version : 5.0 Final");
console.log("====================================");