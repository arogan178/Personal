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

  // Creates back to top button and manages its visibility.
  function createBackToTopButton() {
    const backToTopBtn = document.querySelector("#back-to-top");
    if (!backToTopBtn) return;

    const throttledScrollHandler = throttle(() => {
      const shouldShow = window.scrollY > 400;
      backToTopBtn.classList.toggle("btn-show", shouldShow);
      backToTopBtn.classList.toggle("btn-hide", !shouldShow);
    }, 100);

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });

    // Scrolls to top of page when button is clicked.
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    createBackToTopButton();
  } else {
    document.addEventListener("DOMContentLoaded", createBackToTopButton);
  }
})();
