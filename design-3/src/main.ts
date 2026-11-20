const year = document.querySelector<HTMLElement>("#year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
const navigation = document.querySelector<HTMLElement>("#primary-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    });
  });
}

const contactForm = document.querySelector<HTMLFormElement>(".contact-form");
const formNote = document.querySelector<HTMLElement>(".form-note");
const contactRecipient = "wolexto@gmail.com";

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  if (formNote) {
    formNote.textContent = "Your email app should open with the message ready to send.";
  }

  window.location.href = `mailto:${contactRecipient}?subject=${subject}&body=${body}`;
});

const revealTargets = document.querySelectorAll<HTMLElement>(
  ".section-heading, .project, .about-content, .about-bottom, .service-grid, .contact-heading, .contact-form"
);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => element.classList.add("visible"));
} else {
  revealTargets.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => observer.observe(element));
}
