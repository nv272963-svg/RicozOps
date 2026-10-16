console.log("LOGIN JS LOADED");

const API_URL = "https://ricozops.onrender.com/api/auth";

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

const forgotLink = document.getElementById("forgotPasswordLink");

if (forgotLink) {
    forgotLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "forgot-password.html";
    });
}