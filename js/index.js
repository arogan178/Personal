// Optimized script with better performance and error handling
(function () {
  "use strict";

  // Throttle function for performance optimization
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Toggles navigation open/close and manages body overflow.
  function navToggle() {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelectorAll(".nav__link");

    if (!navToggle) return;

    // Toggle navigation menu
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
      const isOpen = document.body.classList.contains("nav-open");
      document.body.style.overflow = isOpen ? "hidden" : "auto";

      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        document.body.style.overflow = "auto";
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Highlights the active nav link based on scroll position.
  function activeNavHighlight() {
    const sections = document.querySelectorAll(".section[id]");
    const navLinks = document.querySelectorAll(".nav__link");
    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => link.removeAttribute("data-active"));
            const id = entry.target.getAttribute("id");
            const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
            if (activeLink) activeLink.setAttribute("data-active", "");
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Manages header bar background style based on scroll position.
  function headerBarScroll() {
    const header = document.querySelector(".header__bar");
    if (!header) return;

    // Check initial position on load
    if (window.scrollY > 50) {
      header.classList.add("is-scrolled");
    }

    const handleScroll = throttle(() => {
      if (window.scrollY > 50) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  // Manages visibility of sections based on viewport intersection.
  function sectionVisibility() {
    const sections = document.querySelectorAll(".section:not(.intro)");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      section.classList.remove("is-visible", "reveal");
      observer.observe(section);
    });
  }

  // Manages staggered entrance of skill groups inside the skills section.
  function skillGroupVisibility() {
    const groups = document.querySelectorAll(".skill-group");
    if (groups.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -5% 0px",
        threshold: 0.2,
      }
    );

    groups.forEach((group) => {
      group.classList.remove("is-visible");
      observer.observe(group);
    });
  }

  // Preloads the resume PDF when hovering the download link.
  function preloadResumeOnHover() {
    const link = document.querySelector('a[href$=".pdf"]');
    if (!link) return;

    link.addEventListener("mouseenter", () => {
      const preload = document.createElement("link");
      preload.rel = "prefetch";
      preload.href = link.getAttribute("href");
      preload.as = "document";
      document.head.appendChild(preload);
    }, { once: true });
  }

  // Initialize all functions when DOM is ready
  function init() {
    try {
      headerBarScroll();
      navToggle();
      sectionVisibility();
      skillGroupVisibility();
      activeNavHighlight();
      preloadResumeOnHover();
    } catch (error) {
      console.error("Error initializing website features:", error);
    }
  }

  // Event listeners with better performance
  window.addEventListener("load", init);

  // Use passive event listeners for better scroll performance
  window.addEventListener(
    "scroll",
    throttle(() => {
      headerBarScroll();
    }, 16),
    { passive: true }
  ); // ~60fps throttling
})();
