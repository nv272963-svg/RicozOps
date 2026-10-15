console.log("LOGIN JS LOADED");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
console.log("FORM SUBMITTED");
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        console.log("EMAIL:", email);
console.log("PASSWORD:", password);
console.log("FETCH URL:", "http://localhost:5000/api/auth/login");
console.log("BEFORE FETCH");
        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });
        console.log("AFTER FETCH");
console.log("STATUS:", response.status);
console.log("RESPONSE:", response);
        const data = await response.json();

        if (data.success) {

            // JWT Token Save
            localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));
            alert("Login Successful");

            // Dashboard Open
            window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);
        alert("Server Error");

    }

});
document.getElementById("forgotPasswordLink").addEventListener("click", function(e){

    e.preventDefault();

    window.location.href="forgot-password.html";

});