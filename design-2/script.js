document.getElementById("year").textContent = new Date().getFullYear();

const targets = document.querySelectorAll(
  ".section-title, .project, .portrait, .about-copy, .tool-grid, .contact"
);

targets.forEach((element) => element.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

targets.forEach((element) => observer.observe(element));
