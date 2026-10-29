console.log("LOGIN JS LOADED");

const API_URL = "https://ricozops-1.onrender.com/api/auth";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter Email and Password");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);
        alert("Server Connection Failed");

    }

});
const registerForm = document.getElementById("registerForm");

document.getElementById("showRegister").addEventListener("click", function (e) {
    e.preventDefault();

    loginForm.style.display = "none";
    registerForm.style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", function (e) {
    e.preventDefault();

    registerForm.style.display = "none";
    loginForm.style.display = "block";
});
const forgotLink = document.getElementById("forgotPasswordLink");

if (forgotLink) {
    forgotLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "forgot-password.html";
    });
}
// ==========================
// Register User
// ==========================

registerForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const full_name = document.getElementById("full_name").value.trim();
const email = document.getElementById("reg_email").value.trim();
const mobile = document.getElementById("mobile").value.trim();
const password = document.getElementById("reg_password").value.trim();

    if (!full_name || !email || !mobile || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                full_name,
                email,
                mobile,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Registration Successful");

            registerForm.reset();

            registerForm.style.display = "none";
            loginForm.style.display = "block";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);

        alert("Server Connection Failed");

    }

});
