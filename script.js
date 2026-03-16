const images = ["img/caroff.png", "img/caron.png"];

let index = 0;
const slider = document.getElementById("slider");

setInterval(() => {
  slider.style.opacity = 0;

  setTimeout(() => {
    index = (index + 1) % images.length;
    slider.src = images[index];
    slider.style.opacity = 1;

    // Headlight glow logic
    if (index === 1) {
      slider.classList.add("headlights-on");
    } else {
      slider.classList.remove("headlights-on");
    }

    // engine vibration
    slider.classList.remove("engine-start");
    void slider.offsetWidth;
    slider.classList.add("engine-start");

    // bounce after ignition
    setTimeout(() => {
      slider.classList.remove("bounce");
      void slider.offsetWidth;
      slider.classList.add("bounce");
    }, 400);
  }, 500);
}, 4000);

// ── SMART HEADER: hide on scroll down, show on scroll up ──
let lastScrollTop = 0;
const header = document.querySelector("header");
const delta = 5; // min scroll amount to trigger
const headerHeight = header.offsetHeight;

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Add scrolled class for styling after passing header height
  if (currentScroll > headerHeight) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (Math.abs(lastScrollTop - currentScroll) <= delta) return;

  if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
    // Scroll DOWN → hide
    header.classList.remove("visible");
    header.classList.add("hidden");
  } else {
    // Scroll UP → show
    header.classList.remove("hidden");
    header.classList.add("visible");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

const words = [
  " – Luxury Cars",
  " – Affordable Cars",
  " – Sports Cars",
  " – Electric Cars",
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

const typing = document.querySelector(".typing");

function typeEffect() {
  let currentWord = words[wordIndex];

  if (isDeleting) {
    letterIndex--;
  } else {
    letterIndex++;
  }

  typing.textContent = currentWord.substring(0, letterIndex);

  let speed = isDeleting ? 60 : 120;

  if (!isDeleting && letterIndex === currentWord.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex++;

    if (wordIndex === words.length) {
      wordIndex = 0;
    }

    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

const swiper = new Swiper(".carSwiper", {
  effect: "coverflow",

  grabCursor: true,

  centeredSlides: true,

  slidesPerView: "auto",

  loop: true,

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },

  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },

  slideToClickedSlide: true,
});

const dot = document.querySelector(".cursor-dot");
const circle = document.querySelector(".cursor-circle");

let mouseX = 0;
let mouseY = 0;
let circleX = 0;
let circleY = 0;

let timeoutId = null;

// Instant follow for the small dot
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";

  // Reset timer when moving
  clearTimeout(timeoutId);
  timeoutId = setTimeout(centerDot, 400); // after 400ms of no movement
});

// Smooth follow for the circle (trailing effect)
function animate() {
  // easing factor — lower = more lag/smooth
  const easing = 0.12;

  circleX += (mouseX - circleX) * easing;
  circleY += (mouseY - circleY) * easing;

  circle.style.left = circleX + "px";
  circle.style.top = circleY + "px";

  requestAnimationFrame(animate);
}

// When mouse is stable → smoothly center dot inside circle
function centerDot() {
  dot.style.transition = "all 0.4s ease-out";
  dot.style.left = circleX + "px";
  dot.style.top = circleY + "px";

  // Remove transition after animation (so next move is instant again)
  setTimeout(() => {
    dot.style.transition = "none";
  }, 400);
}

animate(); // start the smooth circle loop

// Add near the bottom of your script.js
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    circle.style.borderColor = "#be9b44"; // or '' etc.
    // circle.style.boxShadow = '0 0 15px #00ffea';
  });

  link.addEventListener("mouseleave", () => {
    circle.style.borderColor = "rgba(255, 255, 255, 0.5)";
    // circle.style.boxShadow = 'none';
  });
});

function validateEmail() {
  event.preventDefault(); // prevent page reload

  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg");

  // Regex:
  // - Must start with a letter [a-zA-Z]
  // - Can contain letters, numbers, dot, underscore
  // - Must be gmail.com, yahoo.com, or outlook.com
  // - Blocks ".com@" inside username
  const regex =
    /^(?!.*\.com@)[a-zA-Z][a-zA-Z0-9._]*@(gmail\.com|yahoo\.com|outlook\.com)$/i;

  if (!email) {
    msg.textContent = "⚠️ Please enter an email address.";
    msg.style.color = "red";
  } else if (!/^[a-zA-Z]/.test(email)) {
    msg.textContent = "⚠️ Please Email must start with an alphabet.";
    msg.style.color = "red";
  } else if (!regex.test(email)) {
    msg.textContent =
      "⚠️ Please only Gmail, Yahoo, or Outlook allowed. Username can be alphanumeric, and check if it ends with'.com'.";
    msg.style.color = "red";
  } else {
    msg.textContent = "✅ Thank you for subscribing!";
    msg.style.color = "#ffffff";
    document.getElementById("email").value = "";
  }
}

// HAMBURGER

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("show");
  hamburger.innerHTML = isOpen ? "&times;" : "&#9776;";
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
    // Optional: remove from DOM after fade
    setTimeout(() => preloader.remove(), 800);
  }, 2000); // or longer if you want it to show more
});
