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

    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
      const isOpen = document.body.classList.contains("nav-open");
      document.body.style.overflow = isOpen ? "hidden" : "auto";

      // Update ARIA label for accessibility
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        document.body.style.overflow = "auto";
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Manages header bar opacity based on scroll position.
  function headerBarOpacity() {
    const header = document.querySelector(".header__bar");
    if (!header) return;

    const handleScroll = throttle(() => {
      if (window.scrollY > 450 && !header.classList.contains("is-visible")) {
        header.classList.add("is-visible");
      }
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  // Manages visibility of sections based on viewport intersection.
  function sectionVisibility() {
    const sections = document.querySelectorAll(".section");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.65) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.65,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Enhanced horizontal scroll with better performance
  function horizontalScroll() {
    const experiences = document.querySelector(".experiences");
    if (!experiences) return;

    let isScrollingHorizontally = false;

    experiences.addEventListener(
      "wheel",
      (evt) => {
        if (isScrollingHorizontally) return;

        const scrollAmount = evt.deltaY * 10;
        const maxScrollLeft = experiences.scrollWidth - experiences.clientWidth;

        const canScrollLeft = scrollAmount < 0 && experiences.scrollLeft > 0;
        const canScrollRight =
          scrollAmount > 0 && experiences.scrollLeft < maxScrollLeft;

        if (canScrollLeft || canScrollRight) {
          evt.preventDefault();
          experiences.scrollLeft += scrollAmount;
          isScrollingHorizontally = true;

          setTimeout(() => {
            isScrollingHorizontally = false;
          }, 300); // Reduced delay for better responsiveness
        }
      },
      { passive: false }
    );
  }

  // Initialize all functions when DOM is ready
  function init() {
    try {
      headerBarOpacity();
      navToggle();
      sectionVisibility();
      horizontalScroll();
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
      headerBarOpacity();
      sectionVisibility();
    }, 16),
    { passive: true }
  ); // ~60fps throttling
})();
