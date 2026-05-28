const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const UNDERLINE_DURATION = 1200;

/**
 * Animates the text of an element to reveal its original value on mouseover.
 * Characters pop in with a brief cycling effect before settling.
 * @param {HTMLElement} element - The DOM element to animate.
 */
function animateText(element) {
  const originalValue = element.dataset.value;
  if (!originalValue) return;

  let iterations = 0;
  const totalLength = originalValue.length;
  const startTime = performance.now();

  const interval = setInterval(() => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / UNDERLINE_DURATION, 1);

    // Eased iterations: fast start, slow end
    const eased = 1 - Math.pow(1 - progress, 1.5);
    iterations = eased * totalLength;

    element.innerText = originalValue
      .split("")
      .map((char, index) => {
        if (index < Math.floor(iterations)) {
          return originalValue[index];
        }
        // Each unresolved position cycles through multiple random chars per frame
        let result = "";
        for (let i = 0; i < 3; i++) {
          result = chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
      })
      .join("");

    if (iterations >= totalLength) {
      clearInterval(interval);
      element.innerText = originalValue;
    }
  }, 30);
}

/**
 * Animates the underline on the name element.
 * Grows left-to-right, then retracts left-to-right after the scramble finishes.
 * @param {HTMLElement} element
 */
function animateUnderline(element) {
  element.classList.remove("retracting", "animating");

  // Force reflow to ensure the removal takes effect before re-adding
  void element.offsetWidth;

  element.classList.add("animating");

  setTimeout(() => {
    element.classList.remove("animating");
    element.classList.add("retracting");
  }, UNDERLINE_DURATION);

  setTimeout(() => {
    element.classList.remove("retracting");
  }, UNDERLINE_DURATION * 2);
}

/**
 * Initializes the name randomizer effect on a specific element.
 * @param {string} selector - The CSS selector for the element to attach the effect to.
 */
function initializeNameRandomizer(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener("mouseover", () => {
      animateText(element);
      animateUnderline(element);
    });
  } else {
    console.warn(
      `Name randomizer could not find element with selector: ${selector}`
    );
  }
}

// Initialize the effect on the #Name element once the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
  initializeNameRandomizer("#Name");
});
