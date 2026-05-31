(function () {
  "use strict";

  // --- Utility Functions ---

  // Throttle function for performance optimization (used for scroll events)
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

  // --- Theme Management ---

  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const PREFERRED_THEME_KEY = "preferred-theme";
  const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

  const toggleBtn = document.getElementById("theme-toggle");
  let currentTheme = LIGHT_THEME;

  const COLOR_SCHEMES = {
    [LIGHT_THEME]: {
      "--background-color": "var(--clr-light)",
      "--font-color": "var(--clr-dark)",
      "--font-muted": "rgba(0, 0, 0, 0.7)",
      "--toggle-color": "var(--clr-dark)",
      "--clr-border": "rgba(0, 0, 0, 0.08)",
      "--clr-scrollbar": "rgba(0, 0, 0, 0.2)",
      "--clr-card-start": "#ffffff",
      "--clr-card-end": "#f3f3f3",
      "--clr-header-bg": "rgba(250, 250, 250, 0.85)", 
      "--clr-nav-bg": "rgba(250, 250, 250, 0.95)", 
      "--bs-card": "0 8px 30px rgba(0, 0, 0, 0.04), 0 4px 10px rgba(0, 0, 0, 0.02)",
      "--bs-card-hover": "0 14px 40px rgba(0, 0, 0, 0.08), 0 6px 15px rgba(0, 0, 0, 0.04)",
    },
    [DARK_THEME]: {
      "--background-color": "var(--clr-dark)",
      "--font-color": "var(--clr-light)",
      "--font-muted": "rgba(255, 255, 255, 0.7)",
      "--toggle-color": "var(--clr-light)",
      "--clr-border": "rgba(255, 255, 255, 0.08)",
      "--clr-scrollbar": "rgba(255, 255, 255, 0.2)",
      "--clr-card-start": "#1a1a1a",
      "--clr-card-end": "#111111",
      "--clr-header-bg": "rgba(10, 10, 10, 0.85)", 
      "--clr-nav-bg": "rgba(10, 10, 10, 0.95)", 
      "--bs-card": "0 8px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      "--bs-card-hover": "0 14px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    },
  };

  function setTheme(theme, persist = false) {
    currentTheme = theme;
    const colorScheme = COLOR_SCHEMES[theme];
    const rootStyle = document.documentElement.style;

    for (let property in colorScheme) {
      rootStyle.setProperty(property, colorScheme[property]);
    }
    
    if (theme === DARK_THEME) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (persist) {
      localStorage.setItem(PREFERRED_THEME_KEY, theme);
    }
  }

  function updateUI(theme) {
    if (toggleBtn) {
      if (theme === DARK_THEME) {
        toggleBtn.classList.add("dark-mode");
      } else {
        toggleBtn.classList.remove("dark-mode");
      }
    }
  }

  function handleThemeToggle() {
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    setTheme(newTheme, true);
    updateUI(newTheme);
  }

  function initializeTheme() {
    const osPreference = window.matchMedia(DARK_SCHEME_QUERY).matches ? DARK_THEME : LIGHT_THEME;
    const preferredTheme = localStorage.getItem(PREFERRED_THEME_KEY) || osPreference;
    setTheme(preferredTheme, false);
    updateUI(preferredTheme);
    
    if (toggleBtn) {
      toggleBtn.addEventListener("click", handleThemeToggle);
    }
  }

  // --- Navigation & Scroll Features ---

  function navToggle() {
    const navToggleBtn = document.querySelector(".nav-toggle");
    const navLinks = document.querySelectorAll(".nav__link");

    if (!navToggleBtn) return;

    navToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
      const isOpen = document.body.classList.contains("nav-open");
      document.body.style.overflow = isOpen ? "hidden" : "auto";
      const isExpanded = navToggleBtn.getAttribute("aria-expanded") === "true";
      navToggleBtn.setAttribute("aria-expanded", !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        document.body.style.overflow = "auto";
        navToggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

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
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function headerBarScroll() {
    const header = document.querySelector(".header__bar");
    if (!header) return;

    if (window.scrollY > 50) header.classList.add("is-scrolled");

    const handleScroll = throttle(() => {
      if (window.scrollY > 50) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

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
      { rootMargin: "0px 0px -20% 0px", threshold: 0 }
    );

    sections.forEach((section) => {
      section.classList.remove("is-visible", "reveal");
      observer.observe(section);
    });
  }

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
      { rootMargin: "0px 0px -5% 0px", threshold: 0.2 }
    );

    groups.forEach((group) => {
      group.classList.remove("is-visible");
      observer.observe(group);
    });
  }

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

  function createBackToTopButton() {
    const backToTopBtn = document.querySelector("#back-to-top");
    if (!backToTopBtn) return;

    const throttledScrollHandler = throttle(() => {
      const shouldShow = window.scrollY > 400;
      backToTopBtn.classList.toggle("btn-show", shouldShow);
      backToTopBtn.classList.toggle("btn-hide", !shouldShow);
    }, 100);

    window.addEventListener("scroll", throttledScrollHandler, { passive: true });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function updateScrollProgress() {
    const scrollProgress = document.querySelector(".scroll-progress");
    if (!scrollProgress) return;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize state
    handleScroll();
  }

  // --- Name Randomizer Effect ---

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  const UNDERLINE_DURATION = 1200;

  function animateText(element) {
    const originalValue = element.dataset.value;
    if (!originalValue) return;

    let iterations = 0;
    const totalLength = originalValue.length;
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / UNDERLINE_DURATION, 1);

      const eased = 1 - Math.pow(1 - progress, 1.5);
      iterations = eased * totalLength;

      element.innerText = originalValue
        .split("")
        .map((char, index) => {
          if (index < Math.floor(iterations)) {
            return originalValue[index];
          }
          // Optimized: return random char immediately instead of a loop
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iterations >= totalLength) {
        clearInterval(interval);
        element.innerText = originalValue;
      }
    }, 30);
  }

  function animateUnderline(element) {
    element.classList.remove("retracting", "animating");
    void element.offsetWidth; // Force reflow
    element.classList.add("animating");

    setTimeout(() => {
      element.classList.remove("animating");
      element.classList.add("retracting");
    }, UNDERLINE_DURATION);

    setTimeout(() => {
      element.classList.remove("retracting");
    }, UNDERLINE_DURATION * 2);
  }

  function initializeNameRandomizer(selector) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    // Attach hover effect
    element.addEventListener("mouseover", () => {
      animateText(element);
      animateUnderline(element);
    });

    // Auto-trigger once on load (delayed slightly to sync with page fade-in)
    setTimeout(() => {
      animateText(element);
      animateUnderline(element);
    }, 400);
  }

  // --- Initialization ---

  function init() {
    try {
      initializeTheme();
      headerBarScroll();
      navToggle();
      sectionVisibility();
      skillGroupVisibility();
      activeNavHighlight();
      preloadResumeOnHover();
      createBackToTopButton();
      updateScrollProgress();
      initializeNameRandomizer("#Name");
    } catch (error) {
      console.error("Error initializing website features:", error);
    }
  }

  // Early theme initialization prevents flash, but full features wait for DOM
  initializeTheme();
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();