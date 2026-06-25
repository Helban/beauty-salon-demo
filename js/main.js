// Luméa demo — interactions: mobile nav, hero slider, gallery lightbox, form validation.
// Vanilla JS, no dependencies. Loaded with `defer`.

(() => {
  "use strict";

  const SLIDE_INTERVAL_MS = 6000;
  const MIN_NAME_LENGTH = 2;
  const MIN_MESSAGE_LENGTH = 10;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (navToggle && navList) {
    const closeNav = () => {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  /* ---------- Hero slider ---------- */
  const slider = document.querySelector("[data-slider]");

  if (slider) {
    const slides = Array.from(slider.querySelectorAll("[data-slide]"));
    const dots = Array.from(document.querySelectorAll("[data-dot]"));
    const slideCount = slides.length;
    let activeIndex = 0;
    let autoTimer = null;

    const goToSlide = (nextIndex) => {
      activeIndex = (nextIndex + slideCount) % slideCount;
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });
      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
      });
    };

    const startAutoplay = () => {
      if (prefersReducedMotion || slideCount < 2) return;
      stopAutoplay();
      autoTimer = window.setInterval(() => goToSlide(activeIndex + 1), SLIDE_INTERVAL_MS);
    };

    const stopAutoplay = () => {
      if (autoTimer !== null) {
        window.clearInterval(autoTimer);
        autoTimer = null;
      }
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
        startAutoplay();
      });
    });

    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);

    startAutoplay();
  }

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.querySelector("[data-lightbox]");

  if (lightbox) {
    const lightboxImage = lightbox.querySelector("[data-lightbox-img]");
    const closeButton = lightbox.querySelector("[data-lightbox-close]");
    let lastFocused = null;

    const openLightbox = (fullSource, altText) => {
      lightboxImage.src = fullSource;
      lightboxImage.alt = altText;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      closeButton.focus();
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImage.src = "";
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    document.querySelectorAll("[data-gallery] .gallery-item").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const fullSource = trigger.getAttribute("data-full");
        const thumbnail = trigger.querySelector("img");
        lastFocused = trigger;
        openLightbox(fullSource, thumbnail ? thumbnail.alt : "Powiększone zdjęcie");
      });
    });

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  /* ---------- Contact form validation ---------- */
  const contactForm = document.querySelector("[data-form]");

  if (contactForm) {
    const statusBox = contactForm.querySelector("[data-form-status]");

    const validators = {
      name: (raw) => (raw.trim().length >= MIN_NAME_LENGTH ? "" : "Podaj imię i nazwisko."),
      email: (raw) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim()) ? "" : "Podaj poprawny adres e-mail."),
      message: (raw) => (raw.trim().length >= MIN_MESSAGE_LENGTH ? "" : "Napisz kilka słów, czego dotyczy wizyta."),
    };

    const showFieldError = (fieldName, errorText) => {
      const input = contactForm.querySelector(`#${fieldName}`);
      const errorBox = contactForm.querySelector(`[data-error-for="${fieldName}"]`);
      if (!input || !errorBox) return Boolean(errorText);
      const field = input.closest(".field");
      if (errorText) {
        field.classList.add("has-error");
        input.setAttribute("aria-invalid", "true");
        errorBox.textContent = errorText;
        errorBox.hidden = false;
      } else {
        field.classList.remove("has-error");
        input.removeAttribute("aria-invalid");
        errorBox.textContent = "";
        errorBox.hidden = true;
      }
      return Boolean(errorText);
    };

    Object.keys(validators).forEach((fieldName) => {
      const input = contactForm.querySelector(`#${fieldName}`);
      if (!input) return;
      input.addEventListener("blur", () => {
        showFieldError(fieldName, validators[fieldName](input.value));
      });
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let firstInvalid = null;

      Object.keys(validators).forEach((fieldName) => {
        const input = contactForm.querySelector(`#${fieldName}`);
        const errorText = validators[fieldName](input.value);
        if (showFieldError(fieldName, errorText) && !firstInvalid) {
          firstInvalid = input;
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // Demo only: no backend. In production this posts to an email/CRM endpoint.
      contactForm.reset();
      statusBox.textContent = "Dziękujemy. Zgłoszenie zostało zapisane, odezwiemy się tego samego dnia roboczego.";
      statusBox.classList.add("is-success");
      statusBox.hidden = false;
    });
  }
})();
