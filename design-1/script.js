document.getElementById("year").textContent = new Date().getFullYear();

const ticker = document.querySelector(".ticker-track");
const tickerTemplate = ticker?.querySelector(".ticker-group");

if (ticker && tickerTemplate) {
  const buildTickerLoop = () => {
    ticker.classList.remove("is-ready");
    ticker.querySelectorAll("[data-ticker-clone]").forEach((clone) => clone.remove());

    const groupWidth = tickerTemplate.getBoundingClientRect().width;
    const viewportWidth = ticker.parentElement.getBoundingClientRect().width;

    if (groupWidth === 0 || viewportWidth === 0) return;

    const groupCount = Math.ceil(viewportWidth / groupWidth) + 1;
    for (let index = 1; index < groupCount; index += 1) {
      const clone = tickerTemplate.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.dataset.tickerClone = "true";
      ticker.append(clone);
    }

    ticker.style.setProperty("--ticker-shift", `-${groupWidth}px`);
    ticker.style.setProperty("--ticker-duration", `${groupWidth / 40}s`);
    requestAnimationFrame(() => ticker.classList.add("is-ready"));
  };

  document.fonts.ready.then(buildTickerLoop);

  let resizeTimeout;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(buildTickerLoop, 120);
  });
}

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealTargets = document.querySelectorAll(
  ".about-grid, .project-card, .tool-grid div, .contact-inner"
);

revealTargets.forEach((element) => element.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((element) => observer.observe(element));
