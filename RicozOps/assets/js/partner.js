console.log("✅ partner.js loaded");
const form = document.getElementById("partnerForm");
console.log("Form Found:", form);
if (form) {

    form.addEventListener("submit", async (e) => {
        console.log("Submit Clicked");

    
    e.preventDefault();

    const data = {
        full_name: document.getElementById("fullName").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        occupation: document.getElementById("occupation").value,
        investment: document.getElementById("investment").value,
        message: document.getElementById("message").value
    };

    try {
        const response = await fetch("http://localhost:5000/api/partners", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {

            alert("✅ Application Submitted Successfully!");

            form.reset();

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);

        alert("❌ Server Error");

    }
});
}