// Toggles navigation open/close and manages body overflow.
function navToggle() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav__link");

  navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
    if (document.body.classList.contains("nav-open")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      document.body.style.overflow = "auto";
    });
  });
}

// Manages header bar opacity based on scroll position. 
function headerBarOpacity() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (window.scrollY > 450) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  });

  const header = document.querySelector(".header__bar");

  observer.observe(header);
}

// Manages visibility of sections based on viewport intersection.
function sectionVisibility() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.65) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  });

  const sections = document.querySelectorAll(".section");

  sections.forEach(section => observer.observe(section));
}

// Creates back to top button and manages its visibility.
function createBackToTopButton() {
  const backToTopBtn = document.querySelector("#back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("btn-show");
      backToTopBtn.classList.remove("btn-hide");
    } else {
      backToTopBtn.classList.remove("btn-show");
      backToTopBtn.classList.add("btn-hide");
    }
  });

  // Scrolls to top of page when button is clicked.
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Event listeners.
window.addEventListener('scroll', function () {
  headerBarOpacity();
  sectionVisibility();
});

window.addEventListener('load', function () {
  headerBarOpacity();
  navToggle();
  createBackToTopButton();
  horizontalScroll();
});

function horizontalScroll() {
  const experiences = document.querySelector(".experiences");

  experiences.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    experiences.scrollLeft += evt.deltaY * 6;
  });
}
