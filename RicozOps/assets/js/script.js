// ================= Smooth Scrolling =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// ================= Active Navbar =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// ================= Counter Animation =================
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target = Number(counter.dataset.target);

    let count = 0;

    const speed = target / 100;

    function updateCounter() {

        count += speed;

        if (count < target) {

            counter.innerText = Math.floor(count).toLocaleString();

            requestAnimationFrame(updateCounter);

        } else {

            if (target >= 1000) {
                counter.innerText = target.toLocaleString();
            } else {
                counter.innerText = target;
            }

        }

    }

    updateCounter();

});


// ================= Percent Counter =================
const percentCounters = document.querySelectorAll(".counter-percent");

percentCounters.forEach(counter => {

    const target = parseFloat(counter.dataset.target);

    let count = 0;

    function updatePercent() {

        count += 0.5;

        if (count < target) {

            counter.innerText = count.toFixed(1) + "%";

            requestAnimationFrame(updatePercent);

        } else {

            counter.innerText = target + "%";

        }

    }

    updatePercent();

});

// ================= Scroll To Top =================

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        scrollBtn.style.display = "flex";
        scrollBtn.style.alignItems = "center";
        scrollBtn.style.justifyContent = "center";

    }else{

        scrollBtn.style.display = "none";

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
console.log("script loaded");