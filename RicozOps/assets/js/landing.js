const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
});
// FAQ

document.querySelectorAll(".faq-question").forEach(question => {

    question.addEventListener("click", () => {

        const item = question.parentElement;

        item.classList.toggle("active");

    });

});