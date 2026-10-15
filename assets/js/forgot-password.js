document.getElementById("forgotForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (email === "") {
        alert("Please Enter Email");
        return;
    }

    // Demo Message
    alert("Password reset link has been sent to " + email);

    document.getElementById("forgotForm").reset();

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);

});