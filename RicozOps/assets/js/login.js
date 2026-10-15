console.log("LOGIN JS LOADED");

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please enter Email and Password");
        return;
    }

    // Dummy Login
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("user", JSON.stringify({
        name: "Admin",
        email: email
    }));

    alert("Login Successful");

    window.location.href = "dashboard.html";
});

const forgotLink = document.getElementById("forgotPasswordLink");

if (forgotLink) {
    forgotLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "forgot-password.html";
    });
}