// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
    // Close mobile menu after clicking a link
    const nav = document.querySelector(".main-nav");
    const hamburger = document.querySelector(".hamburger");
    nav.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".main-nav");
hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  const isExpanded = nav.classList.contains("active");
  hamburger.setAttribute("aria-expanded", isExpanded);
  hamburger.innerHTML = isExpanded
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Add 'active' class to navigation link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".main-nav a");

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === entry.target.id) {
          link.classList.add("active");
        }
      });
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

// Sticky header behavior
const header = document.querySelector(".main-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.style.background = "rgba(10, 10, 10, 0.95)";
  } else {
    header.style.background = "rgba(10, 10, 10, 0.8)";
  }
});

// Scroll-reveal animation for sections
const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.1,
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Animated gradient background
class AnimatedGradientBackground {
  constructor() {
    this.gradientInner = document.getElementById("gradientInner");
    this.startingGap = 120;
    this.breathing = true;
    this.gradientColors = ["#0A0A0A", "#2979FF", "#FF80AB"];
    this.gradientStops = [40, 60, 80];
    this.animationSpeed = 0.008;
    this.breathingRange = 2;
    this.topOffset = 0;
    this.width = this.startingGap;
    this.directionWidth = 1;
    this.animationFrame = null;
    this.init();
  }

  init() {
    if (this.gradientInner) {
      this.animate();
    }
  }

  animate() {
    if (this.width >= this.startingGap + this.breathingRange) {
      this.directionWidth = -1;
    }
    if (this.width <= this.startingGap - this.breathingRange) {
      this.directionWidth = 1;
    }
    if (!this.breathing) {
      this.directionWidth = 0;
    }
    this.width += this.directionWidth * this.animationSpeed;
    const gradientStopsString = this.gradientStops
      .map((stop, index) => `${this.gradientColors[index]} ${stop}%`)
      .join(", ");
    const gradient = `radial-gradient(${this.width}% ${
      this.width + this.topOffset
    }% at 50% 20%, ${gradientStopsString})`;
    this.gradientInner.style.background = gradient;
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}

let gradientBackground;
window.addEventListener("load", () => {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gradientBackground = new AnimatedGradientBackground();
  }
});
window.addEventListener("beforeunload", () => {
  if (gradientBackground) {
    gradientBackground.destroy();
  }
});
