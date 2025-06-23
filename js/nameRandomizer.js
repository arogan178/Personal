const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Animates the text of an element to reveal its original value on mouseover.
 * @param {HTMLElement} element - The DOM element to animate.
 */
function animateText(element) {
  const originalValue = element.dataset.value;
  if (!originalValue) {
    console.error(
      "Element must have a data-value attribute for animation.",
      element
    );
    return;
  }

  let iterations = 0;
  const interval = setInterval(() => {
    element.innerText = originalValue
      .split("")
      .map((_, index) => {
        if (index < iterations) {
          return originalValue[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iterations >= originalValue.length) {
      clearInterval(interval);
    }

    iterations += 1 / 3;
  }, 30);
}

/**
 * Initializes the name randomizer effect on a specific element.
 * @param {string} selector - The CSS selector for the element to attach the effect to.
 */
function initializeNameRandomizer(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener("mouseover", () => animateText(element));
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
